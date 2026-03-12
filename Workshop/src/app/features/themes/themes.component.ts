import { Component } from '@angular/core';
import { ThemesListComponent } from './themes-list/themes-list.component';
import { RecentPostsComponent } from './recent-posts/recent-posts.component';

@Component({
  selector: 'app-themes',
  imports: [ThemesListComponent, RecentPostsComponent],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.css'
})
export class ThemesComponent {

}
