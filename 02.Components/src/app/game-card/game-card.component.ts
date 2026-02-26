import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  @Input() game!: Game;
  @Output() addToCart = new EventEmitter<Game>();

  onBuyClick(){
    this.addToCart.emit(this.game);
  }
}
