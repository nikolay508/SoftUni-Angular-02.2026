import { Component, inject, ViewChild, signal, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { InputErrorDirective } from '../../shared/directives/input-error.directive';
import { EmailValidatorDirective } from '../../shared/directives/email-validator.directive';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, InputErrorDirective, EmailValidatorDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileForm') profileForm!: NgForm;

  private authService = inject(AuthService);
  private notifService = inject(NotificationService);

  user = this.authService.currentUser;
  isEditMode = signal(false);
  isLoading = signal(false);

  editUsername = '';
  editEmail = '';
  editTel = '';

  ngOnInit(): void {
    if (!this.user()) {
      this.authService.getProfile().subscribe({
        next: (user) => this.authService.setSession(user),
        error: () => {}
      });
    }
  }

  toggleEditMode(): void {
    const currentUser = this.user();
    if (currentUser) {
      this.editUsername = currentUser.username;
      this.editEmail = currentUser.email;
      this.editTel = currentUser.tel?.replace('+359', '') || '';
    }
    this.isEditMode.set(true);
  }

  onCancel(): void {
    this.isEditMode.set(false);
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading.set(true);

    const updateData = {
      username: this.editUsername,
      email: this.editEmail,
      tel: this.editTel ? '+359' + this.editTel : undefined
    };

    this.authService.updateProfile(updateData).subscribe({
      next: (user) => {
        this.authService.setSession(user);
        this.isLoading.set(false);
        this.isEditMode.set(false);
        this.notifService.showSuccess('Profile updated successful');
      },
      error: (err) => {
        this.isLoading.set(false);
      }
    });
  }
}
