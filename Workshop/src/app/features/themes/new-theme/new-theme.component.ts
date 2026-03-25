import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InputErrorDirective } from '../../../shared/directives/input-error.directive';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-new-theme',
  imports: [FormsModule, InputErrorDirective],
  templateUrl: './new-theme.component.html',
  styleUrl: './new-theme.component.css'
})
export class NewThemeComponent {
  @ViewChild('themeForm') themeForm!: NgForm;
  
  themeName = '';
  postText = '';
  isLoading = false;
  errorMessage = '';

  private router = inject(Router);
  private apiService = inject(ApiService);

  onSubmit(): void {
    if (this.themeForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.createTheme({
      themeName: this.themeName,
      postText: this.postText
    }).subscribe({
      next: (theme) => {
        this.isLoading = false;
        this.router.navigate(['/themes', theme._id]);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to create theme. Please try again.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/themes']);
  }
}
