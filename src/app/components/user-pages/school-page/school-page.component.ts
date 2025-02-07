import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {UserNavbarComponent} from '../user-navbar/user-navbar.component';
import {ActivatedRoute} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {NewsService} from '../../../services/news-service/news.service';
import {News} from '../../../../assets/news.interface';
import {NgxMaskDirective} from 'ngx-mask';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrderService} from '../../../services/order-service/order.service';
import {AlertService} from '../../../services/alert-service/alert.service';
import {TrustBoxService} from '../../../services/trust-box/trust-box.service';

@Component({
  selector: 'app-school-page',
  standalone: true,
  imports: [
    UserNavbarComponent,
    FooterComponent,
    NgForOf,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgIf,
    NgStyle
  ],
  templateUrl: './school-page.component.html',
  styleUrl: '../main-page/main-page.component.css'
})
export class SchoolPageComponent implements OnInit {

  public schoolName: string | null = null;
  public schoolId: number | null = null;
  private orderService = inject(OrderService);
  private alertService = inject(AlertService);
  private trustBoxService = inject(TrustBoxService);
  private form = inject(FormBuilder);
  tagColors: string[] = ['#FFB37E', '#A4D3EE', '#98FB98'];
  schoolData: any = {};

  public otinimForm = this.form.group({
    phone_number: ['', [Validators.required, Validators.pattern(/^7\d{9}$/)]],
  })

  public trustBoxForm = this.form.group({
    text: ['', Validators.required],
  });
  public selectedImageUrl!: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadSchoolData();
    console.log(this.schoolName);

  }

  loadSchoolData() {
    const path = window.location.pathname; // Получаем текущий путь
    if (path.includes('alma')) {
      this.schoolData = {
        name: 'Оралбек Тоқтарбек',
        title: '“Kursant Alma” Мектеп директоры',
        text: '“Оқушылар тұлға болып қалыптасудың соңғы қадамында жүргендіктен оларға тек білім беріп қоймай, сол түйгенін\n' +
          'дұрыс пайдалануға, жақсы университетке түсуге, дұрыс мамандық таңдауға, өмірінде дұрыс шешім шығаруға үйрету —\n' +
          'мақсатымыз.”',
        image: 'assets/img/alma-director.svg',
        location: 'Алмалыбақ, Достық көшесі, №10',
        schoolName: 'КурсАнт Алмалыбақ мектебі',
        schoolImage: 'assets/img/almalybaq/almalybaq-school.jpg',
        school_images: ['assets/img/almalybaq/1.jpg', 'assets/img/almalybaq/2.jpg', 'assets/img/almalybaq/3.jpg', "assets/img/almalybaq/4.jpg",
          'assets/img/almalybaq/5.jpg', 'assets/img/almalybaq/6.jpg', 'assets/img/almalybaq/7.jpg', "assets/img/almalybaq/8.jpg",
          'assets/img/almalybaq/9.jpg', 'assets/img/almalybaq/10.jpg', 'assets/img/almalybaq/11.jpg', "assets/img/almalybaq/13.jpg"]
      };
    } else if (path.includes('kask')) {
      this.schoolData = {
        name: 'Оралбек Тоқтарбек',
        title: '“Kursant Kaskelen” Мектеп директоры',
        text: '“Оқушылар тұлға болып қалыптасудың соңғы қадамында жүргендіктен оларға тек білім беріп қоймай, сол түйгенін\n' +
          'дұрыс пайдалануға, жақсы университетке түсуге, дұрыс мамандық таңдауға, өмірінде дұрыс шешім шығаруға үйрету —\n' +
          'мақсатымыз.”',
        image: 'assets/img/kask-director.svg',
        location: 'Қаскелең, Қонаев к., №123',
        schoolName: 'КурсАнт Қаскелең мектебі',
        schoolImage: 'assets/img/kaskelen/kaskelen-school.jpg',
        school_images: ['assets/img/kaskelen/1.jpg', 'assets/img/kaskelen/2.jpg', 'assets/img/kaskelen/3.jpg', "assets/img/kaskelen/4.jpg",
          'assets/img/kaskelen/5.jpg', 'assets/img/kaskelen/6.jpg', 'assets/img/kaskelen/7.jpg', "assets/img/kaskelen/8.jpg"]
      };
    }
  }

  public teacherCards: any = [
    {
      name: 'Оралбек Тоқтарбек',
      title: '“Kursant Kaskelen” Мектеп директоры',
      text: '“Оқушылар тұлға болып қалыптасудың соңғы қадамында жүргендіктен оларға тек білім беріп қоймай, сол түйгенін\n' +
        '        дұрыс пайдалануға, жақсы университетке түсуге, дұрыс мамандық таңдауға, өмірінде дұрыс шешім шығаруға үйрету —\n' +
        '        мақсатымыз.”',
      image: 'assets/img/.svg',
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
      image: 'assets/img/.svg',
    },
  ]


  private newsService = inject(NewsService);

  public news: News[] = []
  public showAllNews: boolean = false;

  public getNews(id: number) {
    this.newsService.getNews(id).subscribe(data => {
      this.news = data.map((news: News) => ({
        ...news,
        poster: `https://kursant-edu.kz${news.poster}`
      }));
    })
  }

  public toggleShowAllNews() {
    this.showAllNews = !this.showAllNews;
  }

  public scrollToSectionFive(): void {
    const sectionFiveElement = document.getElementById('section_five');
    if (sectionFiveElement) {
      const yOffset = -180;
      const y = sectionFiveElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  public makeOrder(): void {
    if (this.otinimForm.valid) {
      let phone = this.otinimForm.get('phone_number')?.value;

      if (phone) {
        phone = phone.replace(/\D/g, '');
        phone = `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)} ${phone.slice(6, 8)} ${phone.slice(8, 10)}`;
      }

      const formData = {phone_number: phone};

      this.orderService.makeOrder(formData).subscribe({
        next: () => {
          this.alertService.success('Өтінім сәтті жіберілді!');
          this.otinimForm.reset();
        },
        error: () => {
          this.alertService.error('Өтінімді жіберу кезінде қате орын алды. Қайталап көріңіз.');
        }
      });
    } else {
      this.alertService.warn('Телефон нөмірін енгізіңіз.');
    }
  }

  public makeMessage(): void {
    if (this.trustBoxForm.valid) {
      const message = this.trustBoxForm.get('text')?.value;

      this.trustBoxService.makeMessage({text: message}).subscribe({
        next: () => {
          this.alertService.success('Хабарлама сәтті жіберілді!');
          this.trustBoxForm.reset();
        },
        error: () => {
          this.alertService.error('Хабарламаны жіберу кезінде қате орын алды. Қайталап көріңіз.');
        }
      });
    } else {
      this.alertService.warn('Хабарламаны жазыңыз.');
    }
  }

  public open_image(i:number) {
    this.selectedImageUrl = i;
    document.body.style.overflow = 'hidden';
  }

  public closePreview() {
    this.selectedImageUrl = null;
    document.body.style.overflow = 'auto';
  }

  public go_left() {
    this.selectedImageUrl -= 1

    if (this.selectedImageUrl < 0) {
      this.selectedImageUrl = this.schoolData.school_images.length - 1
    }
  }

  public go_right() {
    this.selectedImageUrl += 1

    if (this.selectedImageUrl == this.schoolData.school_images.length) {
      this.selectedImageUrl = 0
    }
  }
  getTagColorByIndex(index: number): string {
    return this.tagColors[index % this.tagColors.length];
  }

  protected readonly encodeURI = encodeURI;
}
