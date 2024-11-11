import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgxMaskDirective} from 'ngx-mask';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert-service/alert.service';
import {EmployeeService} from '../../../services/employee-service/employee.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  private form = inject(FormBuilder);
  private alert = inject(AlertService);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  public adminForm = this.form.group({
    phone_number: ['', [ Validators.required,Validators.pattern(/^7\d{9}$/)]],
    password: ['', [ Validators.required,]]
  })


  onSubmit() {
    if (this.adminForm.valid) {

      let phone = this.adminForm.get('phone_number')?.value;


      if (phone) {
        phone = phone.replace(/\D/g, '');
        phone = `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)} ${phone.slice(6, 8)} ${phone.slice(8, 10)}`;
      }

      const formData = {
        phone_number: phone,
        password: this.adminForm.value.password
      };

      this.employeeService.adminLogin(formData).subscribe({
        next: (response) => {
          if(response.logged_in){
            this.alert.success('Успешно авторизованы');
            this.adminForm.reset();
            this.router.navigate(['admin/application'])
          }else{
            this.alert.error('У вас нет доступа')
          }
        },
        error: (error) => {
          this.alert.error('Ошибка при входе')
        }
      });
    } else {
      this.alert.warn('Форма невалидна')

    }
  }

  goHome(){
    this.router.navigate([''])
  }
}
