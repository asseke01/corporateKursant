import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {UserNavbarComponent} from '../user-navbar/user-navbar.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-mission-page',
  standalone: true,
  imports: [
    UserNavbarComponent,
    FooterComponent
  ],
  templateUrl: './mission-page.component.html',
  styleUrl: './mission-page.component.css'
})
export class MissionPageComponent implements OnInit {
  elements: ElementRef[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.elements = Array.from(this.el.nativeElement.querySelectorAll('.fade-in-up')).map(
      (el) => new ElementRef(el)
    );
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    this.elements.forEach((element: ElementRef) => {
      const nativeElement = element.nativeElement;
      const rect = nativeElement.getBoundingClientRect();
      const offsetTop = rect.top + scrollY;

      if (scrollY + windowHeight > offsetTop + rect.height / 2) {
        nativeElement.classList.add('visible');
      }
    });
  }
}
