import {Component, EventEmitter, inject, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgxMaskDirective} from 'ngx-mask';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmployeeService} from '../../../services/employee-service/employee.service';
import {AlertService} from '../../../services/alert-service/alert.service';
import {AuthService} from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgClass,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatIconButton,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit{
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  private dialog = inject(MatDialog);
  private form = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private alert = inject(AlertService);
  private router = inject(Router);
  private authService = inject(AuthService);

  userData:any;
  isOpen = true;
  isDropdownOpen = false;
  @Output() sidebarToggle = new EventEmitter<boolean>();
  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sidebarToggle.emit(this.isOpen);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData();
  }

  public passwordForm = this.form.group({
    old_password: ['', Validators.required],
    new_password1: ['', Validators.required],
    new_password2: ['', Validators.required],
  })



  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(this.dialogTemplate, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
    this.passwordForm.reset();
  }

  onSave() {
    if (this.passwordForm.invalid) {
      this.alert.warn('Форма содержит ошибки');
      return;
    }
    const formData = { ...this.passwordForm.value };

    this.employeeService.changePassword(formData).subscribe(
      (response) => {
        if (response.success) {
          this.alert.success('Данные успешно сохранены');
          this.authService.clearToken();
          this.router.navigate(['/admin-login']);
          this.passwordForm.reset();
          this.closeDialog();
        }
      },
      (error) => {
        if (error.status === 409) {
          this.alert.warn('Пользователь с таким номером телефона уже существует');
        } else {
          this.alert.error('Ошибка сохранения данных');
        }
      }
    );
  }

  logout() {

    this.employeeService.logout().subscribe(
      (response) => {
        if (response.success) {
          this.alert.success('Успешно вышли из системы');
          this.authService.clearToken();
          this.router.navigate(['/admin-login']);
          this.passwordForm.reset();
          this.closeDialog();
        }
      },
      (error) => {
        if (error.status === 409) {
          this.alert.warn('Пользователь с таким номером телефона уже существует');
        } else {
          this.alert.error('Ошибка сохранения данных');
        }
      }
    );
  }


}
