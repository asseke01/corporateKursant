import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth-service/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient)
  private userUrl = 'http://127.0.0.1:8000/api/news/';
  private authService = inject(AuthService);
  constructor() { }

  getSchool(): Observable<any> {
    return this.http.get(`${this.userUrl}get_schools/`);
  }
  getNews(schoolId: number): Observable<any> {

    const params = { school_id: schoolId.toString() };
    return this.http.get(`${this.userUrl}get_posts/`, { params });
  }

  getNewsById(id: number | undefined) {
    if (id === undefined) {
      throw new Error("Invalid learnerId: 'undefined' is not allowed.");
    }
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.userUrl}get_post/`, { params });
  }

  saveData(data: FormData): Observable<any> {
    return this.http.post(`${this.userUrl}save_post/`, data);
  }

}
