import { Routes } from '@angular/router';
import {AdminPagesComponent} from './components/admin-pages/admin-pages.component';
import {AdminApplicationsComponent} from './components/admin-pages/admin-applications/admin-applications.component';
import {AdminLoginComponent} from './components/admin-pages/admin-login/admin-login.component';
import {AdminTrustBoxComponent} from './components/admin-pages/admin-trust-box/admin-trust-box.component';
import {AdminNewsComponent} from './components/admin-pages/admin-news/admin-news.component';
import {AuthGuard} from './services/auth-service/auth.guard';
import {AccessDeniedComponent} from './components/helpers/access-denied/access-denied.component';
import {MainPageComponent} from './components/user-pages/main-page/main-page.component';
import {SchoolPageComponent} from './components/user-pages/school-page/school-page.component';
import {NotFoundComponent} from './components/user-pages/not-found/not-found.component';
import {NewsPageComponent} from './components/user-pages/news-page/news-page.component';
import {NonAuthGuard} from './services/auth-service/non-auth.guard';
import {MissionPageComponent} from './components/user-pages/mission-page/mission-page.component';

export const routes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'school/alma', component: SchoolPageComponent
  },
  {
    path: 'school/kask', component: SchoolPageComponent
  },
  {
    path:'admin-login', component:AdminLoginComponent,canActivate: [NonAuthGuard]
  },
  {
    path:'mission', component:MissionPageComponent
  },
  {
    path:'access-denied', component:AccessDeniedComponent
  },
  {
    path:'news/:id', component:NewsPageComponent
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
  },

  { path: '**', component: NotFoundComponent },

];
