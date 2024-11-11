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
  isDropdownOpen = false;
  isSchoolDropdownOpen = false;
  isSidebarDropdownOpen = false;
  isSidebarSchoolDropdownOpen = false;
  public isMenuOpen = false;

  public scrollToSectionFive() {
    this.scrollToSection.emit();
  }

  public toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isSchoolDropdownOpen=false;
  }

  toggleSchoolDropdown() {
    this.isSchoolDropdownOpen= !this.isSchoolDropdownOpen;
    this.isDropdownOpen=false;
  }

  toggleSidebarDropdown() {
    this.isSidebarDropdownOpen = !this.isSidebarDropdownOpen;
    this.isSidebarSchoolDropdownOpen = false;
  }

  toggleSidebarSchoolDropdown() {
    this.isSidebarSchoolDropdownOpen = !this.isSidebarSchoolDropdownOpen;
    this.isSidebarDropdownOpen = false;
  }

  public onProjectChange(school: string): void {
    const project = school;
    this.closeMenu();

    setTimeout(() => {
      if (project === 'testant') {
        window.open('https://testant.kz/', '_blank');
      } else if (project === 'kursant') {
        window.open('https://www.kursant.kz/', '_blank');
      }
    }, 100);
  }

  public onSchoolChange(name:string): void {
    this.router.navigate(['/school', name]).then(() => {
      window.scrollTo(0, 0);
    });
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    this.closeMenu();

  }

  public backToMain() {
    if (this.router.url === '/') {
      window.scrollTo(0, 0);
      window.location.reload();
    } else {
      this.router.navigate(['']);
    }
  }


  public closeMenu() {
    console.log('Closing menu');
    this.isMenuOpen = false;
    this.isSidebarSchoolDropdownOpen = false
    this.isSidebarDropdownOpen = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (!target.closest('.dropdown')) {
      this.isDropdownOpen = false;
      this.isSchoolDropdownOpen = false;
    }
  }
}
