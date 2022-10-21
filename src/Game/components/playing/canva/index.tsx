import { FunctionComponent, useState } from "react";
import { GameState } from "../../../utils/models";
import p5Types from "p5"

type Props = {
    socket : any;
    gameState: any;
    width: any;
    height: any;
};

const Canva: FunctionComponent<Props> = (props) => {
    // useEffect(() => {
        
    // })
    const [P5, setP5] = useState<p5Types | null>(null);
    const getGameState = (): GameState => props.gameState.current;
    
    const drawBall = (p5 : p5Types) => {
        p5.circle(
            getGameState().ballX,
            getGameState().ballY,
            10);
    }

    const drawPaddleOne = (p5: p5Types) => {
        p5.rect(
            getGameState().paddleOneX,
            getGameState().paddleOneY,
            10,
            100);
    }

    const drawPaddleTwo = (p5: p5Types) => {
        p5.rect(
            getGameState().paddleTwoX,
            getGameState().paddleTwoY,
            10,
            100);
    }

    
    return (
        <div>
            
        </div>
    )
}

export default Canva;