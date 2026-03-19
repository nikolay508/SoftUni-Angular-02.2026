import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-command-center',
  imports: [],
  templateUrl: './command-center.component.html',
  styleUrl: './command-center.component.css'
})
export class CommandCenterComponent {
  constructor(private authService: AuthService, private router: Router){}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
