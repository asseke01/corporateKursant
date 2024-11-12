import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth-service/auth.service';
import {Observable} from 'rxjs';
import {News} from '../../../assets/news.interface';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient)
  private userUrl = environment.apiUrl + '/api/news/';
  private authService = inject(AuthService);
  constructor() { }

  getSchool(): Observable<any> {
    return this.http.get(`${this.userUrl}get_schools/`);
  }
  getNews(schoolId: number): Observable<News[]> {

    const params = { school_id: schoolId.toString() };
    return this.http.get<News[]>(`${this.userUrl}get_posts/`, { params });
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


  deleteNews(id: number | undefined) {
    if (id === undefined) {
      throw new Error("Invalid id: 'undefined' is not allowed.");
    }
    const body = { id: id };

    return this.http.post<{ success: boolean }>(`${this.userUrl}delete_post/`, body, {
    });
  }

}
