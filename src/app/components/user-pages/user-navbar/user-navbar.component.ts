import {Component} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

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


  public selectedProject: string | undefined;
  public selectedSchool: string | undefined;
  public schools = ['Алмалыбақ', 'Қаскелең'];

  onProjectChange(event: any): void {
    const project = event.value;
    if (project === 'Тестант') {
      window.open('https://testant.kz/', '_blank');
    } else if (project === 'Курсант') {
      window.open('https://www.kursant.kz/', '_blank');
    }
  }

}
