import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { RxjsDemoComponent } from './components/rxjs-demo/rxjs-demo.component';
import { PostsComponent } from './components/posts/posts.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent, RxjsDemoComponent, PostsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
