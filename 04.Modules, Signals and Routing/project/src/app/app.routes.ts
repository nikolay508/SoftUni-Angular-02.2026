import { Routes } from '@angular/router';
import { MissionsComponent } from './features/missions/missions.component';
import { CountdownComponent } from './features/countdown/countdown.component';
import { LoginComponent } from './features/login/login.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { MissionDetailsComponent } from './features/mission-details/mission-details.component';
import { missionResolver } from './guards/mission.resolver';
import { CommandCenterComponent } from './features/command-center/command-center.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'missions', pathMatch: 'full' },
  { path: 'missions', component: MissionsComponent },
  {
    path: 'missions/:id',
    component: MissionDetailsComponent,
    resolve: { mission: missionResolver },
  },
  { path: 'countdown', component: CountdownComponent },
  {
    path: 'command-center',
    component: CommandCenterComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];
