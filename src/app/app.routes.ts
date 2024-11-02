import { Routes } from '@angular/router';
import {AdminPagesComponent} from './components/admin-pages/admin-pages.component';
import {AdminApplicationsComponent} from './components/admin-pages/admin-applications/admin-applications.component';
import {AdminLoginComponent} from './components/admin-pages/admin-login/admin-login.component';
import {AdminTrustBoxComponent} from './components/admin-pages/admin-trust-box/admin-trust-box.component';
import {AdminNewsComponent} from './components/admin-pages/admin-news/admin-news.component';
import {AuthGuard} from './services/auth-service/auth.guard';
import {AccessDeniedComponent} from './components/helpers/access-denied/access-denied.component';

export const routes: Routes = [
  {
    path:'admin-login', component:AdminLoginComponent
  },
  {
    path:'access-denied', component:AccessDeniedComponent
  },
  {
    path:'admin', component:AdminPagesComponent, canActivate: [AuthGuard],
    children:[
      {
        path:'application', component:AdminApplicationsComponent
      },
      {
        path:'trust-box', component:AdminTrustBoxComponent
      },
      {
        path:'news', component:AdminNewsComponent
      }
    ]
  }
];
