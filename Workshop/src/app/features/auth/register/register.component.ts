import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { emailValidator } from "../../../shared/validators/email.validator";
import { passwordsMatchValidator } from "../../../shared/validators/passwords-match.validator";
import { InputErrorDirective } from "../../../shared/directives/input-error.directive";

@Component({
  selector: "app-register",
  imports: [ReactiveFormsModule, RouterLink, InputErrorDirective],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator()]],
    tel: [''],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required]]
    }, { validators: passwordsMatchValidator })
  });

  isLoading = false;
  errorMessage = '';

  get passwordsGroup(): FormGroup {
    return this.registerForm.get('passwords') as FormGroup;
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { username, email, tel, passwords } = this.registerForm.value;

    const userData = {
      username,
      email,
      tel: tel ? "+359" + tel : undefined,
      password: passwords.password
    };

    this.authService.register(userData).subscribe({
      next: (user) => {
        this.authService.setSession(user);
        this.isLoading = false;
        this.router.navigate(['/themes']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
