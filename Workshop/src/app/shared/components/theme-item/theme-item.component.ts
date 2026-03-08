import { Component, Input } from '@angular/core';
import { Theme } from '../../interfaces/theme';

@Component({
  selector: 'app-theme-item',
  imports: [],
  templateUrl: './theme-item.component.html',
  styleUrl: './theme-item.component.css'
})
export class ThemeItemComponent {
  @Input({ required: true }) theme!: Theme;
}
