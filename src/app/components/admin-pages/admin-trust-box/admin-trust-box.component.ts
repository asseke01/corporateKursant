import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {ApplicationService} from '../../../services/application-service/application.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AlertService} from '../../../services/alert-service/alert.service';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {NgxMaskDirective} from 'ngx-mask';
import {TrustBoxService} from '../../../services/trust-box/trust-box.service';

@Component({
  selector: 'app-admin-trust-box',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  templateUrl: './admin-trust-box.component.html',
  styleUrl: './admin-trust-box.component.css'
})
export class AdminTrustBoxComponent implements OnInit{
@ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
private dialog = inject(MatDialog);
private boxService = inject(TrustBoxService);
private form = inject(FormBuilder);
private alert = inject(AlertService)

  status:string='';
  box:any[]=[];
  ngOnInit(): void {
    this.loadBox()
  }

  loadBox(){
    this.boxService.getBox(this.status).subscribe(data=>
      this.box = data
    )
  }


  changeType(newStatus: string) {
    this.status = newStatus;
    this.loadBox();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:number): void {
    this.dialog.open(this.dialogTemplate, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    });
    this.boxForm.patchValue({
      message_id:id
    })
  }

  closeDialog(): void {
    this.dialog.closeAll();
    this.boxForm.reset();
  }


public boxForm = this.form.group({
    message_id: [null as number | null],
    report_text: ['', Validators.required],

  })


  onSave(){

    if (this.boxForm.invalid) {
      this.alert.warn('Форма содержит ошибки');
      return;
    }

    const formData = { ...this.boxForm.value };

    this.boxService.saveData(formData).subscribe(
      (response) => {
        if (response.success) {
          this.alert.success('Данные успешно сохранены');
          this.boxForm.reset();
          this.loadBox();
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
