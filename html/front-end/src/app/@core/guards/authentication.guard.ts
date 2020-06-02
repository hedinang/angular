import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authenticationService: AuthenticationService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return of(this.authenticationService.isLogin()).pipe(
      tap((res) => {
        if (!res) {
          console.log('No Authorization, Please Login');
          this.router.navigate(['/login'], { replaceUrl: true }).catch((err) => {
            console.log('No Authorization, Please Login');
          });
        }
      }),
    );
  }
}
