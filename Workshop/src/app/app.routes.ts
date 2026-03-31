import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" }, // redirect to home

  {
    path: "home",
    loadComponent: () =>
      import("./features/home/home.component").then((m) => m.HomeComponent),
  },

  {
    path: "login",
    loadComponent: () =>
      import("./features/auth/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./features/auth/register/register.component").then((m) => m.RegisterComponent),
  },

  {
    path: "themes",
    loadComponent: () =>
      import("./features/themes/themes.component").then((m) => m.ThemesComponent),
  },
  {
    path: "themes/:themeId",
    loadComponent: () =>
      import("./features/themes/theme-content/theme-content.component").then((m) => m.ThemeContentComponent),
  },
  {
    path: "add-theme",
    loadComponent: () =>
      import("./features/themes/new-theme/new-theme.component").then((m) => m.NewThemeComponent),
    canActivate: [authGuard],
  },

  {
    path: "profile",
    loadComponent: () =>
      import("./features/profile/profile.component").then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: "**",
    loadComponent: () =>
      import("./features/not-found/not-found.component").then((m) => m.NotFoundComponent),
  },
];
