import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponet } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GamesComponent } from './games/games.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponet, AboutComponent, GamesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hello there';
  currentView = 'home';

  changeView(view: string){
    this.currentView = view;
  }
}
