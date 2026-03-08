import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post-item',
  imports: [],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css'
})
export class PostItemComponent {
  @Input({ required: true }) post!: Post;
}
