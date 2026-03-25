import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MissionsService } from '../../services/missions.service';
import { Mission } from '../../interfaces/mission.interface';
import { HighlightDirective } from '../../directives/highlght.directive';
import { StatusStyleDirective } from '../../directives/status-style.directive';
import { MissionStatusPipe } from '../../pipes/mission-status.pipe';
import { TimeUntilPipe } from '../../pipes/time-until.pipe';

@Component({
  selector: 'app-missions',
  imports: [RouterLink, HighlightDirective, MissionStatusPipe, TimeUntilPipe],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css'
})
export class MissionsComponent {
  missions: Mission[] = [];

  constructor(private missionService: MissionsService){
    this.missions = this.missionService.getAllMissions();
  }
}
