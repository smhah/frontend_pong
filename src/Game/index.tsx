import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Waiting from "./components/waiting";
import { GameState } from "./utils/models";
import Play from "./components/playing";
import { useSearchParams } from "react-router-dom";

const Game = () => {
    const socket = useRef(null as null | Socket);
    const gameState = useRef(null as null | GameState);
    const [state, setState] = useState("waiting");
    const [searchParams] = useSearchParams();

    const spect = searchParams.get("spect");
    console.log("spect is ==== " + spect);
    useEffect(()=> {
        socket.current = io("http://localhost:6001").on("connect", () => {
            if(spect)
            {
                //socket.current?.emit("spectJoined", {gameId : spect});
                socket.current?.emit("spectJoined", {input: spect});
            }
            else
            {
                console.log("player " + socket.current?.id + " trying to play");
                socket.current?.emit("playerJoined");
            }
        socket.current?.on("gameState", (data: GameState) => {
            if (state == "waiting")
            {
                setState("play");
            }
            gameState.current = data;
        });
        
        return () => {
            socket.current?.removeAllListeners();
            socket.current?.close();
        }
    });
    }, []);
    let page;
    if(state == "play")
    // if(false)
    {
        page = <div>
            <p>GAME IS UNDER</p>
                <Play
                socket = {socket} 
                gameState = {gameState}
                />
        </div> 
    }
    else
    {
        page = <>WaitinG</>
    }
    // if(state == "waiting")
    // {
    //     page = (<Waiting
    //         setState={setState} />
    //     );
    // }
    // else if (state == "playing")
    // {

    // }
    // else if (state == "canceled") {

    // }
    return <>{page}</>
};

export default Game;