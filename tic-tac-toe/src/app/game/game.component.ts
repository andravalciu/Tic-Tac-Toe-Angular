import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic],
})
export class GameComponent implements OnInit {
  information: any;
  constructor(public game: Gamelogic) {}
  ngOnInit(): void {}
  startGame(): void {
    this.game.gameStart();
    const currentPlayer = 'Current turn: Player ' + this.game.currentTurn;
    this.information = document.querySelector('.curent-status');
    this.information.innerHTML = currentPlayer;
  }
  async clickSubfield(subfield: any): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');
      console.log(position);

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      await this.game.checkGameEndsWinner().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          this.information.innerHTML =
            'The winner is player nr. ' + this.game.currentTurn;
        }
      });

      await this.game.checkGameEndFull().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          this.information.innerHTML = 'No winner, draw';
        }
      });

      this.game.changePlayer();
      if (this.game.gameStatus === 1) {
        const currentPlayer = 'Current turn: Player ' + this.game.currentTurn;
        this.information.innerHTML = currentPlayer;
      }
    }

    return Promise.resolve();
  }
}
