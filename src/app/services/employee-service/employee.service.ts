import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth-service/auth.service';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient)
  private userUrl = 'http://127.0.0.1:8000/api/employee/';
  private authService = inject(AuthService);

  constructor() { }

  adminLogin(data: { phone_number: string | null | undefined,password: string | null | undefined;  }): Observable<any> {
    return this.http.post<any>(`${this.userUrl}login/`, data).pipe(
      tap(response => {
        if (response && response.token) {
          this.authService.setToken(response.token);
        }
      })
    );
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${this.userUrl}change_password/`, data, );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.userUrl}logout/`, {});
  }

  verifyToken(token: string): Observable<{ verified: boolean; user_data: any | null }> {
    const params = new HttpParams().set('token', token);
    return this.http.get<{ verified: boolean; user_data: any | null }>(`${this.userUrl}verify/`, { params });
  }
}
