import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Post } from '../../../shared/interfaces/post';
import { PostItemComponent } from '../../../shared/components/post-item/post-item.component';

@Component({
  selector: 'app-recent-posts',
  imports: [PostItemComponent],
  templateUrl: './recent-posts.component.html',
  styleUrl: './recent-posts.component.css'
})
export class RecentPostsComponent implements OnInit{
  posts: Post[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getLatestPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
