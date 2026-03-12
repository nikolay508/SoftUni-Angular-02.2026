import { Component, inject, computed } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = this.authService.isLoggedIn;

  username = computed(() => this.authService.currentUser()?.username ?? '');

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
