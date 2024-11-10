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
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
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

  public onProjectChange(school:string): void {
    const project = school;
    if (project === 'testant') {
      window.open('https://testant.kz/', '_blank');
    } else if (project === 'kursant') {
      window.open('https://www.kursant.kz/', '_blank');
    }
  }

  public onSchoolChange(name:string): void {
    this.router.navigate(['/school', name]);
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  public backToMain() {
    this.router.navigate(['']);
  }


  public closeMenu() {
    this.isMenuOpen = false;
    this.isSidebarDropdownOpen=false;
    this.isSidebarSchoolDropdownOpen=false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

}
