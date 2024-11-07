import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth-service/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient)
  private userUrl = 'http://127.0.0.1:8000/api/order/';
  private authService = inject(AuthService);

  public makeOrder(data: { phone_number: string | null | undefined }): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.userUrl}make_order/`, data,);
  }
}
