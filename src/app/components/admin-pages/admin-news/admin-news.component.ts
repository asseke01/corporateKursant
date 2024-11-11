import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AlertService} from '../../../services/alert-service/alert.service';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {NewsService} from '../../../services/news-service/news.service';
import {QuillEditorComponent} from 'ngx-quill';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-admin-news',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    QuillEditorComponent
  ],
  templateUrl: './admin-news.component.html',
  styleUrl: './admin-news.component.css'
})
export class AdminNewsComponent implements OnInit{
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  private dialog = inject(MatDialog);
  private newsService = inject(NewsService);
  private form = inject(FormBuilder);
  private alert = inject(AlertService)
  public userUrl = environment.apiUrl
  quillModules: any = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  modalType:string = '';
  posterFile: File | string | null = null;
  selectedFileName: string | null = null;
  selectedSchoolId: number | null = null;
  selectedNewsId: number | undefined = undefined;
  selectedSchoolName: string | null = null;
  status:string='';
  box:any[]=[];
  schools:any[]=[];
  ngOnInit(): void {
    this.loadSchools()
  }


  loadSchools(){
    this.newsService.getSchool().subscribe(data=>{
      this.schools = data;
    })
  }
  onSchoolChange(event: Event): void {
    const schoolId = (event.target as HTMLSelectElement).value;
    this.selectedSchoolId = +schoolId;

    const selectedSchool = this.schools.find(school => school.id === this.selectedSchoolId);
    this.selectedSchoolName = selectedSchool ? selectedSchool.name : null;

    this.loadBox();
  }

  loadBox() {
    if (this.selectedSchoolId) {
      this.newsService.getNews(this.selectedSchoolId).subscribe(data => {
        this.box = data;
      });
    }
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,type:string, id?:number): void {
    this.modalType = type;
    this.selectedNewsId = id;
    if(this.modalType == 'create'){
      this.dialog.open(this.dialogTemplate, {
        width: '800px',
        maxWidth: '70vw',
        height: '50vw',
        maxHeight: '50vw',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }else {
      this.newsService.getNewsById(this.selectedNewsId).subscribe((data) => {
        this.populateForm(data);

        this.dialog.open(this.dialogTemplate, {
          width: '800px',
          maxWidth: '30vw',
          height: '50vw',
          maxHeight: '50vw',
          enterAnimationDuration,
          exitAnimationDuration,
        });
      });
    }


  }

  closeDialog(): void {
    this.dialog.closeAll();
    this.newsForm.reset();
  }


  public newsForm = this.form.group({
    id: [null as number | null],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    index: [null],
    poster: [null as File | string | null],
    description: [''],
    tags: this.form.array([]),
    schools: [null, Validators.required]
  });


  get tags(): FormArray {
    return this.newsForm.get('tags') as FormArray;
  }
  addTag(tag: string = ''): void {

    if (tag.trim()) {
      (this.newsForm.get('tags') as FormArray).push(this.form.control(tag.trim()));
    } else {
      this.alert.warn('Тег не может быть пустым');
    }
  }


  removeTag(index: number): void {
    (this.newsForm.get('tags') as FormArray).removeAt(index);
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement | null;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files.item(0);
      if (file) {
        this.selectedFileName = file.name;
        this.posterFile = file;
        this.newsForm.patchValue({ poster: this.posterFile });
      }
    }
  }


  private clearTags(): void {
    (this.newsForm.get('tags') as FormArray).clear();
  }

  public populateForm(data: any): void {
    const post = data.post;

    this.newsForm.patchValue({
      id: post.id,
      name: post.name,
      index: post.index,
      description: post.description,
      schools: post.school_ids ? post.school_ids[0] : null
    });

    this.selectedFileName = post.poster ? post.poster.split('/').pop() : "Файл не выбран";
    this.newsForm.get('poster')?.setValue(post.poster);

    this.tags.clear();
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        this.tags.push(this.form.control(tag));
      });
    }
  }




  onSubmit(): void {
    if (this.newsForm.valid) {
      const formData = new FormData();

      const id = this.newsForm.get('id')?.value as number | null;
      if (id) {
        formData.append('id', id.toString());
      }


      formData.append('name', this.newsForm.get('name')?.value ?? '');
      formData.append('index', this.newsForm.get('index')?.value ?? '');
      formData.append('description', this.newsForm.get('description')?.value ?? '');

      const schoolId = Number(this.newsForm.get('schools')?.value);
      if (!isNaN(schoolId)) {
        formData.append('schools', JSON.stringify([schoolId]));
      }

      const posterValue = this.newsForm.get('poster')?.value;

      if (this.posterFile instanceof File) {
        formData.append('photo', this.posterFile, this.posterFile.name);
        formData.append('poster', 'photo');
      } else if (typeof posterValue === 'string') {
        formData.append('poster', posterValue);
      }

      const tags = this.newsForm.get('tags')?.value as string[];
      if (tags && Array.isArray(tags)) {
        formData.append('tags', JSON.stringify(tags));
      }

      this.newsService.saveData(formData).subscribe({
        next: (response) => {
          if (response.success) {
            this.closeDialog();
            this.alert.success('Успешно сохранена');
          }
        },
        error: (error) => {
          console.error('Error saving post', error);
          this.alert.error('Ошибка при сохранении. Попробуйте еще раз.');
        }
      });
    } else {
      this.alert.warn('Заполните все обязательные поля.');
    }
  }


}
