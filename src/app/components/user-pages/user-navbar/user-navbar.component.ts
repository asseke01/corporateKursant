import {Component, EventEmitter, HostListener, inject, Output} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    NgForOf,
    MatButton,
    MatLabel,
    MatSelectTrigger,
    NgIf
  ],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {

  @Output() scrollToSection = new EventEmitter<void>();

  private router = inject(Router);

  public selectedProject: string | undefined;
  public selectedSchool: string | undefined;
  public schools = ['Алмалыбақ', 'Қаскелең'];
  public isMenuOpen = false;

  public scrollToSectionFive() {
    this.scrollToSection.emit();
  }

  public toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public onProjectChange(event: any): void {
    const project = event.value;
    if (project === 'Тестант') {
      window.open('https://testant.kz/', '_blank');
    } else if (project === 'Курсант') {
      window.open('https://www.kursant.kz/', '_blank');
    }
  }

  public onSchoolChange(event: any): void {
    const school = event.value;
    this.router.navigate(['/school', school]); // Navigate to school route with school name as parameter
  }

  public backToMain() {
    this.router.navigate(['']);
  }

  @HostListener('document:click', ['$event'])
  public onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (this.isMenuOpen && !target.closest('.sidebar') && !target.closest('.burger-menu')) {
      this.closeMenu();
    }
  }

  public closeMenu() {
    this.isMenuOpen = false;
  }

}
