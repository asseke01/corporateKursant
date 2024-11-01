import { Routes } from '@angular/router';
import {AdminPagesComponent} from './components/admin-pages/admin-pages.component';
import {AdminApplicationsComponent} from './components/admin-pages/admin-applications/admin-applications.component';

export const routes: Routes = [
  {
    path:'admin', component:AdminPagesComponent,
    children:[
      {
        path:'application', component:AdminApplicationsComponent
      }
    ]
  }
];
