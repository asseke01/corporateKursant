import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    const token = this.authService.getToken();

    if (token) {
      this.router.navigate(['/admin/application']);
      return of(false);
    }

    localStorage.clear();
    return of(true);
  }
}
