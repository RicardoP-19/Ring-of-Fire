import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from './../../models/game';
import { PlayerComponent } from "../player/player.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game?: Game;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard(){
    if (!this.pickCardAnimation) {
      this.currentCard = this.game?.stack.pop() ?? '';
      this.pickCardAnimation = true;      
    }
    setTimeout(() => {
      this.pickCardAnimation = false;
      this.game?.playerCards.push(this.currentCard);
    }, 1200);
  }
}
