import {Component, inject, OnInit} from '@angular/core';
import {UserNavbarComponent} from '../user-navbar/user-navbar.component';
import {NewsService} from '../../../services/news-service/news.service';
import {News} from '../../../../assets/news.interface';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    UserNavbarComponent,
    NgForOf
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {

  private newsService = inject(NewsService);

  public news: News[] = []

  ngOnInit() {
    this.getNews();
  }

  public getNews(id: number = 3) {
    this.newsService.getNews(id).subscribe(data => {
      this.news = data.map((news: News) => ({
        ...news,
        poster: `http://127.0.0.1:8000${news.poster}`
      }));
    })
  }

}
