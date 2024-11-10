import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {UserNavbarComponent} from '../user-navbar/user-navbar.component';
import {ActivatedRoute} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';
import {NgForOf} from '@angular/common';
import {NewsService} from '../../../services/news-service/news.service';
import {News} from '../../../../assets/news.interface';
import {NgxMaskDirective} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-school-page',
  standalone: true,
  imports: [
    UserNavbarComponent,
    FooterComponent,
    NgForOf,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  templateUrl: './school-page.component.html',
  styleUrl: './school-page.component.css'
})
export class SchoolPageComponent implements OnInit {

  public schoolName: string | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.schoolName = params.get('schoolName');
    });
    console.log(this.schoolName);

    this.getNews();
  }

  public teacherCards: any = [
    {
      name: 'Оралбек Тоқтарбек',
      title: '“Kursant Kaskelen” Мектеп директоры',
      text: '“Оқушылар тұлға болып қалыптасудың соңғы қадамында жүргендіктен оларға тек білім беріп қоймай, сол түйгенін\n' +
        '        дұрыс пайдалануға, жақсы университетке түсуге, дұрыс мамандық таңдауға, өмірінде дұрыс шешім шығаруға үйрету —\n' +
        '        мақсатымыз.”',
      image: 'assets/img/teacher.svg',
    },
    {
      name: 'Қадырбай Бексеит',
      title: '“Kursant Kaskelen” Директор орынбасары',
      text: '“Бәріміз бірге еліміздің дамуы мен халқымыздың өркендеуіне елеулі үлес қосатынымызға сеніміміз мол:”',
      image: 'assets/img/teacher2.svg',
    },
    {
      name: 'Оралбек Тоқтарбек',
      title: '“Kursant Kaskelen” Мектеп директоры',
      text: '“Оқушылар тұлға болып қалыптасудың соңғы қадамында жүргендіктен оларға тек білім беріп қоймай, сол түйгенін\n' +
        '        дұрыс пайдалануға, жақсы университетке түсуге, дұрыс мамандық таңдауға, өмірінде дұрыс шешім шығаруға үйрету —\n' +
        '        мақсатымыз.”',
      image: 'assets/img/teacher.svg',
    },
  ]


  private newsService = inject(NewsService);

  public news: News[] = []
  public showAllNews: boolean = false;

  public getNews(id: number = 3) {
    this.newsService.getNews(id).subscribe(data => {
      this.news = data.map((news: News) => ({
        ...news,
        poster: `http://127.0.0.1:8000${news.poster}`
      }));
    })
  }

  public toggleShowAllNews() {
    this.showAllNews = !this.showAllNews;
  }

  public scrollToSectionFive(): void {
    const sectionFiveElement = document.getElementById('section_five');
    if (sectionFiveElement) {
      sectionFiveElement.scrollIntoView({behavior: 'smooth'});
    }
  }
}
