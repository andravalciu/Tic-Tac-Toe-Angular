import { ThisReceiver } from '@angular/compiler';
import { Status } from './gamestatus';
export class Gamelogic {
  gameField: Array<number> = [];
  currentTurn: number;

  gameStatus: Status;

  winSituationsOne: Array<Array<number>> = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
  ];

  winSituationsTwo: Array<Array<number>> = [
    [2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 2, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 2, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 2, 0, 0, 2],
    [0, 0, 2, 0, 2, 0, 2, 0, 0],
    [2, 0, 0, 0, 2, 0, 0, 0, 2],
  ];

  public constructor() {
    this.gameStatus = Status.STOP;
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  gameStart(): void {
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentTurn = this.randomPlayerStart();
    console.log(this.currentTurn);
    this.gameStatus = Status.START;
  }
  randomPlayerStart(): number {
    const startPlayer = Math.floor(Math.random() * 2) + 1;
    return startPlayer;
  }
  setField(position: number, value: number): void {
    this.gameField[position] = value;
    console.log(this.gameField);
  }
  getPlayerColorClass(): string {
    const colorClass = this.currentTurn === 2 ? 'player-two' : 'player-one';
    return colorClass;
  }
  changePlayer(): void {
    this.currentTurn = this.currentTurn === 2 ? 1 : 2;
  }

  arrayEquals(a: Array<any>, b: Array<any>): boolean {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((value, index) => value === b[index])
    );
  }

  async checkGameEndsWinner(): Promise<boolean> {
    let isWinner = false;

    const checkarray =
      this.currentTurn === 1 ? this.winSituationsOne : this.winSituationsTwo;

    const currentarray = [];
    this.gameField.forEach((subfield, index) => {
      if (subfield !== this.currentTurn) {
        currentarray[index] = 0;
      } else {
        currentarray[index] = subfield;
      }
    });

    checkarray.forEach((checkfield, checkindex) => {
      if (this.arrayEquals(checkfield, currentarray)) {
        isWinner = true;
      }
    });
    console.log(currentarray);
    if (isWinner) {
      console.log('We have a winner!');
      this.gameEnd();
      return true;
    } else {
      return false;
    }
  }
  async checkGameEndFull(): Promise<boolean> {
    let isFull = true;
    if (this.gameField.includes(0)) {
      isFull = false;
    }
    if (isFull) {
      console.log('Field is full');
      this.gameEnd();
      return true;
    } else {
      return false;
    }
  }
  gameEnd(): void {
    this.gameStatus = Status.STOP;
  }
}
