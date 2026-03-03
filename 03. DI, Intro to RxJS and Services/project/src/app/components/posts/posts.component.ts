import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  posts: Post[] = [];

  constructor(private postsService: PostsService){}

  ngOnInit(): void{
    this.loadPosts();
  }

  loadPosts(): void {
    this.postsService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 6);
      },

      error: (err) => {
        console.error(err);
      }
    })
  }

  deletePost(id: number): void {
    this.postsService.deletPost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(p => p.id !== id);
      },

      error: (err) => {
        console.error(err);
      }
    })
  }
}
