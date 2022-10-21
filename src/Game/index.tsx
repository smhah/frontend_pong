import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Waiting from "./components/waiting";
import { GameState } from "./utils/models";

const Game = () => {
    const socket = useRef(null as null | Socket);
    const gameState = useRef(null as null | GameState);
    const [state, setState] = useState("waiting");
    useEffect(()=> {
        socket.current = io("http://localhost:6001").on("connect", () => {
            console.log("player " + socket.current?.id + " trying to play");
            socket.current?.emit("playerJoined");
    
        socket.current?.on("gameState", (data: GameState) => {
            // if (
            //     (gameState == "waiting" && || location.state?.retry) &&
            //     (location?.state?.mode.toLowerCase() === data.mode.toLowerCase() ||
            //     spectate) &&
            //     (!opponent || location.state?.retry) &&
            //     !once
            // ) {
            if (state == "waiting")
            {
                // setOpponent(
                // JSON.parse(data.playerData)[
                //     (data.players.indexOf(socket.current?.id || "") + 1) % 2
                // ]
                // );
                // setPlayers(JSON.parse(data.playerData));
    
                // once = true;
                setState("play");
                // setTimeout(
                // () => {
                //     setState("play");
                // },
                // spectate ? 0 : 2000
                // );
            }
            gameState.current = data;
        });
        
        return () => {
            socket.current?.removeAllListeners();
            socket.current?.close();
        }
    });
    })
    let page;
    if(state == "waiting")
    {
        page = (<Waiting
            setState={setState} />
        );
    }
    else if (state == "playing")
    {

    }
    else if (state == "canceled") {

    }
    return <>NOTHING</>
};

export default Game;