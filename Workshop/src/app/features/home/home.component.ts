import { Component } from '@angular/core';
import { ThemesListComponent } from './themes-list/themes-list.component';
import { RecentPostsComponent } from './recent-posts/recent-posts.component';

@Component({
  selector: 'app-home',
  imports: [ThemesListComponent, RecentPostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
