import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth-service/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrustBoxService {
  private http = inject(HttpClient)
  private userUrl = environment.apiUrl + '/api/trust_box/';
  private authService = inject(AuthService);

  constructor() {
  }


  getBox(status: string | undefined): Observable<any> {
    let params: any = {};
    if (status) {
      params.status = status;
    }

    return this.http.get(`${this.userUrl}get_messages/`, {params});
  }

  saveData(data: any): Observable<any> {
    return this.http.post(`${this.userUrl}process_message/`, data,);
  }

  makeMessage(data: { text: string | undefined | null }): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.userUrl}make_message/`, data,);
  }
}

