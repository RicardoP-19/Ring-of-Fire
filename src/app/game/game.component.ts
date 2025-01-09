import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from './../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { PlayerMobileComponent } from "../player-mobile/player-mobile.component";

const PLAYER_IMAGES = [
  './assets/img/players/player_1.jpg',
  './assets/img/players/player_2.jpg',
  './assets/img/players/player_3.jpg',
  './assets/img/players/player_4.jpg',
  './assets/img/players/player_5.jpg'
];

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    GameInfoComponent,
    GameInfoComponent, PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game?: Game;
  isHidden = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
    this.isHidden = false;
  }

  newGame() {
    this.game = new Game();
  }

  takeCard(){
    if (!this.pickCardAnimation) {
      this.currentCard = this.game?.stack.pop() ?? '';
      this.pickCardAnimation = true;
      if (this.game && this.game.currentPlayer !== undefined) {
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }
    }
    setTimeout(() => {
      this.pickCardAnimation = false;
      this.game?.playerCards.push(this.currentCard);
    }, 1200);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0 && this.game?.players && this.game?.players.length < 5) {
        const randomImage = this.getRandomImage();
        this.game?.players.push({ name, image: randomImage });
      } if (this.game?.players.length == 5) {
       this.isHidden = true; 
      }
    });
  }

  private getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * PLAYER_IMAGES.length);
    const selectedImage = PLAYER_IMAGES[randomIndex];
    PLAYER_IMAGES.splice(randomIndex, 1);
    return selectedImage;
  }
}
