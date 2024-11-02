// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EmployeeService } from '../employee-service/employee.service';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/admin-login']);
      return of(false);
    }

    return this.employeeService.verifyToken(token).pipe(
      map(response => {
        if (response.verified) {
          this.authService.setUserData(response.user_data);
          return true;
        } else {
          this.authService.clearToken();
          this.authService.clearUserData();
          this.router.navigate(['/access-denied']);
          return false;
        }
      }),
      catchError(() => {
        this.authService.clearToken();
        this.authService.clearUserData();
        this.router.navigate(['/access-denied']);
        return of(false);
      })
    );
  }
}
