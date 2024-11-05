import {Component, inject, OnInit} from '@angular/core';
import {UserNavbarComponent} from '../user-navbar/user-navbar.component';
import {NewsService} from '../../../services/news-service/news.service';
import {News} from '../../../../assets/news.interface';
import {NgForOf} from '@angular/common';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    UserNavbarComponent,
    NgForOf,
    FooterComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {

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

  public artykshylyktary: any = [
    {
      name: 'Ұстаздар',
      title: 'Бізде жоғарғы санатты квалификациянған ұстаздар сабақ береді.',
      image: 'assets/img/teacher-icon.svg'
    },
    {
      name: 'ҰБТ қолдау',
      title: 'Оқушы ҰБТ тапсырып шыққанға дейінгі кәсіби әрі психологилық көмек.',
      image: 'assets/img/support-icon.svg'
    },
    {
      name: 'Асхана',
      title: 'Мектептің асханаларында тек қана экологиялық таза әрі пайдалы өнімдер қолданылады.',
      image: 'assets/img/canteen-icon.svg'
    },
    {
      name: 'Жеке подход',
      title: 'Біз әр оқушыға жеке подходпен қарау тәжірибесін кең пайдаланамыз.',
      image: 'assets/img/personal-icon.svg'
    },
  ]

  private newsService = inject(NewsService);

  public news: News[] = []
  public showAllNews: boolean = false;


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

  public toggleShowAllNews() {
    this.showAllNews = !this.showAllNews;
  }
}
