import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Partners } from '../../../../@core/models/partners.model';
import { PartnerService } from '../../../../@core/services/partner.service';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.scss'],
})
export class PartnerEditComponent extends AbstractBaseComponent implements OnInit {
  constructor(injector: Injector, protected readonly bsModalRef: BsModalRef, private readonly partnerService: PartnerService) {
    super(injector);
    this.initForm();
  }

  form: FormGroup;
  partner: Partners;

  ngOnInit(): void {
    this.initDataForm();
  }

  initForm() {
    this.form = this.createForms({
      name: new FormControl(null, Validators.compose([Validators.required])),
      description: new FormControl(null, Validators.compose([Validators.required])),
      status: new FormControl(false, Validators.compose([Validators.required])),
    });
  }
  initDataForm() {
    if (this.partner !== undefined && this.partner !== null) {
      this.form.patchValue({
        name: this.partner.name,
        description: this.partner.description,
        status: this.partner.status,
      });
    } else {
      this.resetFormData();
    }
  }
  resetFormData() {
    this.form.patchValue({
      name: null,
      description: null,
      status: false,
    });
  }
  get Name() {
    return this.form.get('name');
  }
  get Description() {
    return this.form.get('description');
  }
  get Status() {
    return this.form.get('status');
  }

  getData() {
    if (this.partner === null || this.partner === undefined) {
      this.partner = new Partners();
    }
    this.partner.name = this.Name.value;
    this.partner.description = this.Description.value;
    this.partner.status = this.Status.value;
  }
  onSubmit() {
    this.getData();
    if (this.partner.id !== undefined && this.partner.id !== null) {
      this.partnerService.updatePartner(this.partner).subscribe((res) => {
        this.showToarst(res, 'edit', 'body.function.partner.translate');
        this.onClose('YES');
      });
    } else {
      this.partnerService.createPartner(this.partner).subscribe((res) => {
        this.showToarst(res, 'add', 'body.function.partner.translate');
        this.onClose('YES');
      });
    }
  }
  onClose(reason: string) {
    this.bsModalService.setDismissReason(reason);
    this.bsModalRef.hide();
  }
}
