import { TranslateService } from '@ngx-translate/core';
import { OnInit, OnDestroy, Injector, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { FormBuilder, AbstractControlOptions, FormGroup, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from '../services/message.service';
import { LoadingService } from '../services/loading.service';
import { environment } from '../../../environments/environment';
import { DataLoadingState } from '../common/enum';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ToastContent } from '../models/toast.model';
import { DataShareService } from '../services/data-share.service';

export abstract class AbstractBaseComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  protected state: DataLoadingState;
  protected translateService: TranslateService;
  protected formBuilder: FormBuilder;
  protected activatedRoute: ActivatedRoute;
  protected authenticationService: AuthenticationService;
  protected messageService: MessageService;
  protected loadingService: LoadingService;
  protected router: Router;
  protected toastr: ToastrService;
  protected bsModalService: BsModalService;
  protected keepMessageOndestroy = false;
  protected bsModalRef: BsModalRef;
  protected dataShareService: DataShareService;
  enableAddButton = false;
  enableEditButton = false;

  firstIdOfPage: number;
  itemsPerPage = 10;
  currentPage = 1;
  totalItems: number;

  keySort: string = null;

  numberItemPerPages = [5, 10, 20];

  /** The common resource  */
  protected baseResourceUrl = environment.baseResourceUrl;
  /**
   * constructor
   * @param injector the injector to inject that class a class that have `@Injectable` marker
   */
  constructor(protected injector: Injector) {
    this.translateService = this.injector.get(TranslateService);
    this.formBuilder = this.injector.get(FormBuilder);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.authenticationService = this.injector.get(AuthenticationService);
    this.router = this.injector.get(Router);
    this.messageService = this.injector.get(MessageService);
    this.loadingService = this.injector.get(LoadingService);
    this.toastr = this.injector.get(ToastrService);
    this.bsModalService = this.injector.get(BsModalService);
    this.dataShareService = this.injector.get(DataShareService);
    this.loadingService.hide();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (!this.keepMessageOndestroy) {
      this.messageService.clearMessage();
    }
  }

  isDataLoaded(): boolean {
    return this.state === DataLoadingState.Loaded;
  }
  isDataLoading(): boolean {
    return this.state === DataLoadingState.Loading;
  }
  isDataLoadedError(): boolean {
    return this.state === DataLoadingState.Error;
  }
  setDataLoadingState(state: DataLoadingState) {
    this.state = state;
  }

  rxSubscribe(observable: Observable<any>, next?: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    const subscription: Subscription = observable.subscribe(next, error, complete);
    this.subscriptions.push(subscription);

    return subscription;
  }

  rxUnsubscribe(subscription: Subscription) {
    this.subscriptions = _.reject(this.subscriptions, (s: Subscription) => s === subscription);
    subscription.unsubscribe();
  }

  rxUnsubscribeAll() {
    _.each(this.subscriptions, (subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  protected createForms(
    controlsConfig: {
      [key: string]: any;
    },
    options?:
      | AbstractControlOptions
      | {
        [key: string]: any;
      }
      | null,
  ) {
    return this.formBuilder.group(controlsConfig, options);
  }

  scrollToFirstError(form: ElementRef<HTMLElement>): void {
    if (form) {
      setTimeout(() => {
        const firstElementWithError = form.nativeElement.querySelector('.has-error');
        if (firstElementWithError) {
          firstElementWithError.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  updateFormValueAndValidity(form: FormGroup) {
    if (form && form.controls) {
      Object.keys(form.controls).forEach((key) => {
        form.controls[key].updateValueAndValidity();
      });
      form.updateValueAndValidity();
    }
  }

  getChildObject(object: any, key: string, additional?: { [key: string]: any }) {
    if (typeof object === 'object') {
      return { ...object[key], ...additional };
    }

    return null;
  }

  logFormValidationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(`Key control: ${key}, keyError: ${keyError}, err value: ${controlErrors[keyError]}`);
        });
      }
    });
  }

  async navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(commands, extras);
  }

  getValueFromKeyTranslate(key: string): string {
    let value: string = null;
    this.translateService.get(key).subscribe((resp) => {
      value = resp;
    });
    return value;
  }

  getValueForToast(key: string, isSuccess: boolean, optionKey?: string): ToastContent {
    const value = this.getValueFromKeyTranslate(key);
    let optionValue = '';
    if (optionKey !== null && optionKey !== undefined) {
      optionValue = this.getValueFromKeyTranslate(optionKey);
    }
    const toast = new ToastContent();
    if (isSuccess) {
      toast.title = this.getValueFromKeyTranslate('body.toastr.complete');
      toast.messageAdd =
        this.getValueFromKeyTranslate('body.toastr.notify-add') + ' ' + value + ' ' + this.getValueFromKeyTranslate('body.toastr.success');
      toast.messageEdit =
        this.getValueFromKeyTranslate('body.toastr.notify-edit') + ' ' + value + ' ' + this.getValueFromKeyTranslate('body.toastr.success');
      toast.messageDelete =
        this.getValueFromKeyTranslate('body.toastr.notify-delete') +
        ' ' +
        value +
        ' ' +
        this.getValueFromKeyTranslate('body.toastr.success');
      toast.messageOption =
        this.getValueFromKeyTranslate('body.toastr.notify') +
        ' ' +
        optionValue + ' ' + value +
        ' ' +
        this.getValueFromKeyTranslate('body.toastr.success');
    } else {
      toast.title = this.getValueFromKeyTranslate('body.toastr.error');
      toast.messageAdd =
        this.getValueFromKeyTranslate('body.toastr.notify-add') +
        ' ' +
        value +
        ' ' +
        this.getValueFromKeyTranslate('body.toastr.unsuccess');
      toast.messageEdit =
        this.getValueFromKeyTranslate('body.toastr.notify-edit') +
        ' ' +
        value +
        ' ' +
        this.getValueFromKeyTranslate('body.toastr.unsuccess');
      toast.messageDelete =
        this.getValueFromKeyTranslate('body.toastr.notify-delete') +
        ' ' +
        key +
        ' ' +
        this.getValueFromKeyTranslate('body.toastr.unsuccess');
      toast.messageOption =
        this.getValueFromKeyTranslate('body.toastr.notify') +
        ' ' +
        optionValue + value +
        ' ' +
        this.getValueFromKeyTranslate('body.toastr.unsuccess');
    }

    return toast;
  }

  initValueAndKeySort(keyForSort: string, value: string): string {
    this.keySort = keyForSort;
    if (value === undefined || value === null || value === '') {
      this.keySort = null;
      value = null;
    }
    return value;
  }

  search(key: string) { }
  reloadList() {
    this.bsModalService.onHidden.subscribe((reason) => {
      if (reason === 'YES') {
        setTimeout(() => {
          this.search(this.keySort);
        }, 1000);
      }
    });
  }
  showToarst(res: any, action: string, key: string, keyActionOption?: string) {
    let toastContent = new ToastContent();
    if (res !== null && res !== undefined) {
      toastContent = this.getValueForToast(key, true, keyActionOption);
      switch (action) {
        case 'add':
          this.toastr.success(toastContent.messageAdd, toastContent.title);
          break;
        case 'edit':
          this.toastr.success(toastContent.messageEdit, toastContent.title);
          break;
        case 'delete':
          this.toastr.success(toastContent.messageDelete, toastContent.title);
          break;
        case 'option':
          this.toastr.success(toastContent.messageOption, toastContent.title);
          break;
      }
    } else {
      toastContent = this.getValueForToast(key, false);
      switch (action) {
        case 'add':
          this.toastr.error(toastContent.messageAdd, toastContent.title);
          break;
        case 'edit':
          this.toastr.error(toastContent.messageEdit, toastContent.title);
          break;
        case 'delete':
          this.toastr.error(toastContent.messageDelete, toastContent.title);
          break;
        case 'option':
          this.toastr.error(toastContent.messageOption, toastContent.title);
      }
    }
    this.loadingService.hide();
  }
}
