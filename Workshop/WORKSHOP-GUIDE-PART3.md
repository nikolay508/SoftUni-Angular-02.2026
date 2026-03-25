# SoftUni Forum Workshop – Part 3: Directives & Forms

> Step-by-step checklist. No fluff, no code – just what to do and when.

---

## Phase 1 – Shared Infrastructure (do this first)

1. **Create** `src/app/shared/validators/email.validator.ts`
   - Custom `ValidatorFn` that enforces: 6+ chars before `@`, domain = `gmail`, TLD = `bg` or `com`

2. **Create** `src/app/shared/directives/input-error.directive.ts`
   - Standalone attribute directive
   - Uses `@HostBinding('class.input-error')` + injects `NgControl`
   - Automatically adds/removes the red-border class based on `invalid && touched`

3. **Create** `src/app/shared/directives/email-validator.directive.ts`
   - Standalone attribute directive
   - Implements `Validator` interface + registers via `NG_VALIDATORS`
   - Same email logic as above but for template-driven forms

---

## Phase 2 – Login (Reactive Form)

4. **Update** `login.component.ts`
   - Switch from `FormsModule` to `ReactiveFormsModule`
   - Build a `FormGroup` with `email` and `password` controls
   - Add the custom `emailValidator` and `minLength(5)` for password
   - Import and add `InputErrorDirective` to `imports[]`
   - Make `onLogin()` call the API and handle the observable response

5. **Update** `login.component.html`
   - Replace `[(ngModel)]` with `formControlName`
   - Add `appInputError` directive on each input
   - Add `@if` error messages below each field
   - Add form-level "can't continue" message
   - Bind `[disabled]` on the submit button

---

## Phase 3 – Register (Reactive Form)

6. **Update** `register.component.ts`
   - Switch to `ReactiveFormsModule`
   - Build a `FormGroup` with `username`, `email`, `tel`, and a nested `passwords` group
   - Add a cross-field `passwordsMatchValidator` function (defined above the class)
   - Import `InputErrorDirective` into `imports[]`
   - Make `onRegister()` call the API

7. **Update** `register.component.html`
   - Replace all `[(ngModel)]` with `formControlName`
   - Wrap password fields in `<ng-container formGroupName="passwords">`
   - Add `appInputError` on each input
   - Add specific `@if` error messages per field and per error type
   - Add form-level message + disabled button

---

## Phase 4 – New Theme (Template-driven Form)

8. **Update** `new-theme.component.ts`
   - Add `@ViewChild('themeForm') themeForm!: NgForm`
   - Import `InputErrorDirective` into `imports[]`
   - Change `onSubmit()` to call the API and navigate to the created theme

9. **Update** `new-theme.component.html`
   - Add `#themeForm="ngForm"` on the `<form>`
   - Add `required` + `minlength` validators and template refs on each input
   - Add `appInputError` + `[class.input-error]` on each input
   - Add `@if` error messages below each field
   - Bind `[disabled]` on the Post button

---

## Phase 5 – Profile Edit (Template-driven Form)

10. **Update** `profile.component.ts`
    - Add `@ViewChild('profileForm')`, `isEditMode` signal, and edit field properties
    - Add `toggleEditMode()`, `onCancel()`, and `onSave()` methods
    - `onSave()` calls the API to update profile
    - Import `FormsModule`, `InputErrorDirective`, `EmailValidatorDirective`

11. **Update** `profile.component.html`
    - Use `@if (!isEditMode())` for the view block and `@else` for the edit form
    - Edit form uses `#profileForm="ngForm"` with `[(ngModel)]` bindings
    - Add `appInputError` + `appEmailValidator` on inputs
    - Add `@if` error messages
    - Cancel button reverts, Save button is disabled when form is invalid

12. **Update** `profile.component.css`
    - Add styles for `.edit-error`, `.phone-input`, `.button-group`, and disabled state

---

## Phase 6 – Backend API Integration

13. **Update** `src/app/shared/interfaces/user.ts`
    - Replace `UserWithCredentials` with `UserForAuth`, `LoginCredentials`, `ProfileUpdateData`

14. **Update** `auth.service.ts`
    - Replace all in-memory logic with `HttpClient` calls
    - `login()`, `register()`, `logout()`, `getProfile()`, `updateProfile()` — all return `Observable`
    - Use `withCredentials: true` on every request (cookie auth)
    - Keep the `signal` for current user, updated via `tap()`

15. **Update** `user.service.ts`
    - Remove all in-memory arrays
    - Keep only `getProfile()` and `updateProfile()` as thin HTTP wrappers (or delete and move fully into `AuthService`)

16. **Update** `api.service.ts`
    - Add `createTheme()` — POST with `withCredentials: true`
    - Add `subscribeToTheme()` — PUT with `withCredentials: true`
    - Convert `constructor` injection to `inject()`

17. **Update** `header.component.ts`
    - `onLogout()` now subscribes to the observable and navigates after completion

---

## Phase 7 – Custom Directives (bonus / discussion point) // whatever

> This is the teaching moment — ask students: *"What logic repeats across all forms?"*

- The `appInputError` directive is the answer: instead of manually writing `[class.input-error]="ctrl.invalid && ctrl.touched"` on every single input, one directive handles it everywhere.
- The `appEmailValidator` directive is the answer for template-driven forms: reusable validation without repeating the regex.

---

## Quick File Reference

| File | Action |
|------|--------|
| `shared/validators/email.validator.ts` | CREATE |
| `shared/validators/passwords-match.validator.ts` | CREATE |
| `shared/directives/input-error.directive.ts` | CREATE |
| `shared/directives/email-validator.directive.ts` | CREATE |
| `shared/interfaces/user.ts` | UPDATE |
| `core/services/auth.service.ts` | UPDATE |
| `core/services/user.service.ts` | UPDATE |
| `core/services/api.service.ts` | UPDATE |
| `layout/header/header.component.ts` | UPDATE |
| `features/auth/login/login.component.ts` | UPDATE |
| `features/auth/login/login.component.html` | UPDATE |
| `features/auth/register/register.component.ts` | UPDATE |
| `features/auth/register/register.component.html` | UPDATE |
| `features/themes/new-theme/new-theme.component.ts` | UPDATE |
| `features/themes/new-theme/new-theme.component.html` | UPDATE |
| `features/profile/profile.component.ts` | UPDATE |
| `features/profile/profile.component.html` | UPDATE |
| `features/profile/profile.component.css` | UPDATE |
