import { Component, Input } from '@angular/core';
import { Theme } from '../../interfaces/theme';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-theme-item',
  imports: [RouterLink],
  templateUrl: './theme-item.component.html',
  styleUrl: './theme-item.component.css'
})
export class ThemeItemComponent {
  @Input({ required: true }) theme!: Theme;
}
