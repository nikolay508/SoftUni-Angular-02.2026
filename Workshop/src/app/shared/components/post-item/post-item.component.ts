import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';
import { TitleSclicePipe } from '../../pipes/title-sclice.pipe';
import { TimeAgoPostedPipe } from '../../pipes/time-ago-posted.pipe';

@Component({
  selector: 'app-post-item',
  imports: [TitleSclicePipe, TimeAgoPostedPipe],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css'
})
export class PostItemComponent {
  @Input({ required: true }) post!: Post;
}
