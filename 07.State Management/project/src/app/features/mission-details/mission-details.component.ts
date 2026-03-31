import { Component, OnInit } from '@angular/core';
import { Mission } from '../../interfaces/mission.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-mission-details',
  imports: [RouterLink],
  templateUrl: './mission-details.component.html',
  styleUrl: './mission-details.component.css'
})
export class MissionDetailsComponent implements OnInit{
  mission: Mission | undefined;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.mission = this.route.snapshot.data['mission'];
  }
}
