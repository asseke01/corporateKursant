import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth-service/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private http = inject(HttpClient)
  private userUrl = 'http://127.0.0.1:8000/api/order/';
  private authService = inject(AuthService);
  constructor() { }


  getApplications(status: string | undefined): Observable<any> {
    let params: any = {};
    if (status) {
      params.status = status;
    }

    return this.http.get(`${this.userUrl}get_orders/`,{params});
  }

  saveData(data: any): Observable<any> {
    return this.http.post(`${this.userUrl}accept_order/`, data, );
  }
}
