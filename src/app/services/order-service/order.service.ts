import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth-service/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient)
  private userUrl = environment.apiUrl + '/api/order/';
  private authService = inject(AuthService);

  public makeOrder(data: { phone_number: string | null | undefined }): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.userUrl}make_order/`, data,);
  }
}
