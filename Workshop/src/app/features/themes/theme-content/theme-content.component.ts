import { Component, inject, OnInit, computed } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { ApiService } from "../../../core/services/api.service";
import { Theme } from "../../../shared/interfaces/themes-interfaces/theme";
import { Post } from "../../../shared/interfaces/post";

@Component({
  selector: "app-theme-content",
  imports: [FormsModule],
  templateUrl: "./theme-content.component.html",
  styleUrl: "./theme-content.component.css",
})
export class ThemeContentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  theme: Theme | null = null;
  posts: Post[] = [];
  commentText = "";
  themeId = "";

  currentUsername = computed(() => this.authService.currentUser()?.username ?? 'Anonymous');

  ngOnInit(): void {
    this.themeId = this.route.snapshot.params["themeId"];
    this.loadThemeData();
  }

  loadThemeData(): void {
    this.apiService.getThemes().subscribe((themes) => {
      this.theme = themes.find((t) => t._id == this.themeId) || null;
    });

    this.apiService.getLatestPosts().subscribe((posts) => {
      this.posts = posts.filter((p: any) => p.themeId?._id === this.themeId);
    });
  }

  onPostComment(): void {
    console.log("Posting comment", this.commentText);
    this.commentText = "";
  }
}
