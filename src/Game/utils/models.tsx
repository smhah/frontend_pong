import { type } from "@testing-library/user-event/dist/type";

interface GameState {
    // Game variables
    ballX: number;
    ballY: number;
    ballDirX: number;
    ballDirY: number;
  
    paddleOneX: number;
    paddleOneY: number;
  
    paddleTwoX: number;
    paddleTwoY: number;
  
    state: 0 | 1 | 2;
    players : Array<string>;
}

export type {GameState};