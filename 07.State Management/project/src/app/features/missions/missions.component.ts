import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Mission } from '../../interfaces/mission.interface';
import { HighlightDirective } from '../../directives/highlght.directive';
import { MissionStatusPipe } from '../../pipes/mission-status.pipe';
import { TimeUntilPipe } from '../../pipes/time-until.pipe';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllMissions } from '../../store/missions/missions.selectors';
import { deleteMission } from '../../store/missions/missions.actions';

@Component({
  selector: 'app-missions',
  imports: [RouterLink, HighlightDirective, MissionStatusPipe, TimeUntilPipe, AsyncPipe],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css'
})
export class MissionsComponent {
  missions$: Observable<Mission[]>;

  constructor(private store: Store){
    this.missions$ = this.store.select(selectAllMissions);
  }

  onDelete(id: number): void {
    this.store.dispatch(deleteMission({ id }));
  }
}
