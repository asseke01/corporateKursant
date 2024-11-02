import { Component } from '@angular/core';
import {AdminSidebarComponent} from './admin-sidebar/admin-sidebar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin-pages',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    RouterOutlet
  ],
  templateUrl: './admin-pages.component.html',
  styleUrl: './admin-pages.component.css'
})
export class AdminPagesComponent {
  isSidebarOpen = true;

  onSidebarToggle(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
}
