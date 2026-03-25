import { Routes } from '@angular/router';
import { MissionsComponent } from './features/missions/missions.component';
import { CountdownComponent } from './features/countdown/countdown.component';
import { LoginComponent } from './features/login/login.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { MissionDetailsComponent } from './features/mission-details/mission-details.component';
import { missionResolver } from './guards/mission.resolver';
import { CommandCenterComponent } from './features/command-center/command-center.component';
import { authGuard } from './guards/auth.guard';
import { CrewRegisterComponent } from './features/crew-register/crew-register.component';
import { MissionFormComponent } from './features/mission-form/mission-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'missions', pathMatch: 'full' },
  { path: 'missions', component: MissionsComponent },
  {
    path: 'missions/:id',
    component: MissionDetailsComponent,
    resolve: { mission: missionResolver },
  },
  { path: 'countdown', component: CountdownComponent },

  { path: 'crew-register', component: CrewRegisterComponent },
  { path: 'new-mission', component: MissionFormComponent },

  {
    path: 'command-center',
    loadComponent: () => import('./features/command-center/command-center.component')
    .then(m => m.CommandCenterComponent),
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];
