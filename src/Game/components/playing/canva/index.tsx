import { FunctionComponent, useEffect, useState } from "react";
import { GameState } from "../../../utils/models";
import p5Types from "p5"
import Sketch from "react-p5";

type Props = {
    socket : any;
    gameState: any;
    width: any;
    height: any;
};

const Canva: FunctionComponent<Props> = (props) => {

  const [P5, setP5] = useState<p5Types | null>(null);
  const getGameState = (): GameState => props.gameState.current;
  
  let aspectRatio: number = getGameState().aspectRatio;

  let absoluteWidth: number = getGameState().width;
  let relativeWidth: number = props.width / 3.1;

  let absoluteHeight: number = absoluteWidth / aspectRatio; //
  let relativeHeight: number = relativeWidth / aspectRatio; // if any of these overflowas section dimensions, we scale based on the one that over flows

  let scalingRatio: number = relativeWidth / absoluteWidth;
  if (relativeHeight > props.height) {
    absoluteHeight = getGameState().height;
    relativeHeight = props.height;
    absoluteWidth = absoluteHeight * aspectRatio; //
    relativeWidth = relativeHeight * aspectRatio; // if any of these overflowas section dimensions, we scale based on the one that over flows
    scalingRatio = relativeHeight / absoluteHeight;
  }
    
  // SETUP
  let canvas: p5Types.Renderer;
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    setP5(p5);
    // if(relativeWidth<getGameStateData().width)
    canvas = p5
      .createCanvas(props.width / 3, relativeHeight)
      .parent(canvasParentRef);
  };

  const onResize = (p5: p5Types) => {
    absoluteWidth = getGameState().width;
    relativeWidth = props.width / 3.5;
    absoluteHeight = absoluteWidth / aspectRatio;
    relativeHeight = relativeWidth / aspectRatio;
    scalingRatio = relativeWidth / absoluteWidth;
    if (relativeHeight > props.height) {
      absoluteHeight = getGameState().height;
      relativeHeight = props.height / 3;
      absoluteWidth = absoluteHeight * aspectRatio; //
      relativeWidth = relativeHeight * aspectRatio; // if any of these overflowas section dimensions, we scale based on the one that over flows
      scalingRatio = relativeHeight / absoluteHeight;
    }
    if (p5) p5.resizeCanvas(props.width / 3, relativeHeight);
  };

    const drawBall = (p5 : p5Types) => {
        p5.circle(
            getGameState().ballX * scalingRatio,
            getGameState().ballY * scalingRatio,
            getGameState().ballRadius * scalingRatio);
    }

    const drawPaddleOne = (p5: p5Types) => {
        p5.rect(
            getGameState().paddleOneX * scalingRatio,
            getGameState().paddleOneY * scalingRatio,
            getGameState().paddleWidth * scalingRatio,
            getGameState().paddleHeight * scalingRatio);
    }

    const drawPaddleTwo = (p5: p5Types) => {
        p5.rect(
            getGameState().paddleTwoX * scalingRatio,
            getGameState().paddleTwoY * scalingRatio,
            getGameState().paddleWidth * scalingRatio,
            getGameState().paddleHeight * scalingRatio);
    }

    const initCanva = (p5: p5Types) => {
        p5.clear();
        //p5.frameRate(60);
    }

    const handlePlayerOneInput = (p5: p5Types) => {
      if(p5.keyIsDown(32) && props.socket.current.id !== getGameState().lastscored)
      {
        props.socket.current.emit("playerInput", {input: "SPACE"});
      }
      if(p5.keyIsDown(p5.UP_ARROW))
      {
        props.socket.current.emit("playerInput", { input: "UP" });
      }

      if(p5.keyIsDown(p5.DOWN_ARROW))
      {
        props.socket.current.emit("playerInput", { input: "DOWN" });
      }
    }

    const handlePlayerTwoInput = (p5: p5Types) => {
        if(p5.keyIsDown(32) && props.socket.current.id !== getGameState().lastscored)
        {
          props.socket.current.emit("playerInput", {input: "SPACE"});
        }
        if(p5.keyIsDown(p5.UP_ARROW))
        {
          props.socket.current.emit("playerInput", { input: "UP" });
        }
        if(p5.keyIsDown(p5.DOWN_ARROW))
        {
          props.socket.current.emit("playerInput", { input: "DOWN" });
        }
    }

    const drawClickToStartText = (p5: p5Types) => {
      if (getGameState().state === "scored") {
        //p5.text("HAHAHAHAHAHHAHAHA", props.width / 3 / 2, props.height / 2);
        console.log("enter");
        p5.fill(0);
        //p5.textSize((relativeWidth * 5) / 100);
        p5.textSize(((relativeWidth / 3 * 5) / 30 ));
        p5.textAlign(p5.CENTER);
        const scores = getGameState().scores;
        const scoresSum = scores[0] + scores[1];
        //p5.text("HAHAHAHAHAHHAHAHA", props.width / 3 / 2, props.height / 2);
        p5.text(
          props.socket.current.id === getGameState().lastscored
            ? "Waiting for oponent to start the game"
            : "Click space to start the game ",
          (props.width) / 3 / 2, // relativeWidth / 2
          props.height / 8 // 5 * (relativeHeight / 8)
        );
      }
    };

    const draw = (p5: p5Types) => {

        initCanva(p5);
    
        drawClickToStartText(p5);
  
        drawBall(p5);

        drawPaddleOne(p5);

        drawPaddleTwo(p5);

        //handle input
        if (getGameState().players.indexOf(props.socket.current.id) === 0)
        handlePlayerOneInput(p5);
        if (getGameState().players.indexOf(props.socket.current.id) === 1)
        handlePlayerTwoInput(p5);
    }
    return (
        <div>//
        <p>SKETCH IS UNDER</p>
        <Sketch setup={setup} draw={draw} windowResized={onResize}/>
        </div>
    )
}

export default Canva;