import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ApplicationService} from '../../../services/application-service/application.service';
import {NgForOf, NgIf} from '@angular/common';
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgxMaskDirective} from 'ngx-mask';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AlertService} from '../../../services/alert-service/alert.service';

@Component({
  selector: 'app-admin-applications',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatDialogTitle,
    MatIcon,
    MatDialogContent,
    MatDialogActions,
    MatIconButton,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  templateUrl: './admin-applications.component.html',
  styleUrl: './admin-applications.component.css'
})
export class AdminApplicationsComponent implements OnInit{
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  private dialog = inject(MatDialog);
  private applicationService = inject(ApplicationService);
  private form = inject(FormBuilder);
  private alert = inject(AlertService)

  status:string='';
  applications:any[]=[];
  ngOnInit(): void {
    this.loadApplications()
  }

  loadApplications(){
    this.applicationService.getApplications(this.status).subscribe(data=>
    this.applications = data
    )
  }


  changeType(newStatus: string) {
    this.status = newStatus;
    this.loadApplications();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:number): void {

    this.dialog.open(this.dialogTemplate, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    console.log(id);

    this.applicantForm.patchValue({
      id:id
    })
  }

  closeDialog(): void {
    this.dialog.closeAll();
    this.applicantForm.reset();
  }


  public applicantForm = this.form.group({
    id: [null as number | null],
    fullname: ['', Validators.required],

  })


  onSave(){

    if (this.applicantForm.invalid) {
      this.alert.warn('Форма содержит ошибки');
      return;
    }

    const formData = { ...this.applicantForm.value };

    this.applicationService.saveData(formData).subscribe(
      (response) => {
        if (response.success) {
          this.alert.success('Данные успешно сохранены');
          this.applicantForm.reset();
          this.loadApplications();
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
