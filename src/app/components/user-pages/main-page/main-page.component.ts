import {AfterViewInit, Component, ElementRef, inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserNavbarComponent} from '../user-navbar/user-navbar.component';
import {NewsService} from '../../../services/news-service/news.service';
import {News} from '../../../../assets/news.interface';
import {NgForOf, NgStyle} from '@angular/common';
import {FooterComponent} from '../footer/footer.component';
import {NgxMaskDirective} from 'ngx-mask';
import {OrderService} from '../../../services/order-service/order.service';
import {AlertService} from '../../../services/alert-service/alert.service';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TrustBoxService} from '../../../services/trust-box/trust-box.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    UserNavbarComponent,
    NgForOf,
    FooterComponent,
    NgxMaskDirective,
    FormsModule,
    ReactiveFormsModule,
    NgStyle
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit,AfterViewInit {
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef;
  tagColors: string[] = ['#FFB37E', '#A4D3EE', '#98FB98'];
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
  private orderService = inject(OrderService);
  private alertService = inject(AlertService);
  private trustBoxService = inject(TrustBoxService);

  public news: News[] = []
  public showAllNews: boolean = false;
  public phoneNumber: string = '';
  private form = inject(FormBuilder);

  constructor(private renderer: Renderer2) {
  }

  public otinimForm = this.form.group({
    phone_number: ['', [Validators.required, Validators.pattern(/^7\d{9}$/)]],
  })

  public trustBoxForm = this.form.group({
    text: ['', Validators.required],
  });


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


  ngAfterViewInit(): void {
    setTimeout(() => {
      setInterval(() => this.partnersInfiniteScroll(), 10);
    }, 700);
  }

  private partnersInfiniteScroll(): void {
    const partnersRows = this.carouselContainer.nativeElement.querySelectorAll('.partners');
    const firstPartnersRow = this.carouselContainer.nativeElement.querySelector('.partners_row') as HTMLElement;

    partnersRows.forEach((row: HTMLElement) => {
      const firstWidth = row.scrollLeft;
      row.scrollLeft += 1;
      const lastWidth = row.scrollLeft;

      if (firstWidth === lastWidth) {
        const gap = parseFloat(window.getComputedStyle(row).getPropertyValue('gap'));
        row.scrollLeft -= (firstPartnersRow.clientWidth + gap);
      }
    });
  }

  getTagColorByIndex(index: number): string {
    return this.tagColors[index % this.tagColors.length];
  }

}
