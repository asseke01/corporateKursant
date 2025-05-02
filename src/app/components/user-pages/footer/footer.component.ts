import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private router = inject(Router);

  constructor() {
  }
  public onProjectChange(school: string): void {
    const project = school;

    setTimeout(() => {
      if (project === 'testant') {
        window.open('https://testant.kz/', '_blank');
      } else if (project === 'kursant') {
        window.open('https://kursant-online.kz/', '_blank');
      }
    }, 100);
  }

  public onSchoolChange(name:string): void {
    this.router.navigate(['/school', name]).then(() => {
      window.scrollTo(0, 0);
    });

  }
}
