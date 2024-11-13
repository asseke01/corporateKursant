import {Component, inject, OnInit} from '@angular/core';
import {UserNavbarComponent} from '../user-navbar/user-navbar.component';
import {NewsService} from '../../../services/news-service/news.service';
import {ActivatedRoute} from '@angular/router';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {environment} from '../../../../environments/environment';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [
    UserNavbarComponent,
    NgIf,
    NgForOf,
    NgStyle,
    FooterComponent
  ],
  templateUrl: './news-page.component.html',
  styleUrl: '../main-page/main-page.component.css'
})
export class NewsPageComponent implements OnInit{
  private newsService = inject(NewsService);
  private route = inject(ActivatedRoute);
  tagColors: string[] = ['#FFB37E', '#A4D3EE', '#98FB98'];
  public userUrl = environment.apiUrl


  news! :any;
  ngOnInit(): void {
    const newsId = this.route.snapshot.paramMap.get('id');

    if (newsId) {
      this.loadNews(+newsId);
    }


  }


  loadNews(number: number){
    this.newsService.getNewsById(number).subscribe(data=>{
      this.news=data;

      console.log(this.news);
    })
  }

  getTagColorByIndex(index: number): string {
    return this.tagColors[index % this.tagColors.length];
  }



  protected readonly encodeURI = encodeURI;
}
