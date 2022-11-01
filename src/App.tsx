import logo from './logo.svg';
import './App.css';
import React, { StrictMode, useEffect, useRef, useState } from "react"
import Sketch from "react-p5"
import io, {Socket} from "socket.io-client"
import MessageInput from './tsxFiles/MessageInput'
import MessageInput2 from './tsxFiles/createRoom';
import MessageInput3 from './tsxFiles/joinRoom';
import Messages from "./tsxFiles/Messages"
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import Game from "./Game/index"
let width = 500
let height = 400
let x = width / 15
let y = height / 20
let rs = 10;
let speed = 5
let rectOnex = width / 25;
let rectOney = height / 3;
let rectTwox = width * (14 / 15);
let rectTwoy = height / 3;
let rectW = 10;
let rectH = 100;
let speedRect = 5;
let speedx = speed;
let speedy = speed;
let paused = 0;
let victory = 1;
let pause = 5;
let count = 0;
let scoreOne: any = '0';
let scoreTwo: any = '0';
let direction = 1;
let enter = 0;
let youcanpress = true;
let winner: string;
let up = false;
let down = false;

function App() {

  // const socket = useRef(null as null | Socket);
  // useEffect(()=> {

  //   socket.current = io("http://localhost:6001").on("connect", () => {
  //       console.log("player " + socket.current?.id + " trying to play");
  //       //socket.current?.off;
  //       //socket.current?.on;
  //       socket.current?.emit("playerJoined");
  // });
  // })
  
  // const [socket, setSocket] = useState<Socket>()
  // const [messages, setMessages] = useState<string[]>([])

  // const send = (value: string) => {
  //   socket?.emit("msgToServer", value)
  // }

  // const createRoom = () => {
  //   socket?.emit("createRoom")
  // }

  // const joinRoom = () => {
  //   socket?.emit("joinRoom")
  // }

  // // const sendSocket = (value: string) => {
  // //   socket?.emit("msgToServer")
  // // }

  // useEffect(() => {
  //   const newSocket = io("http://localhost:6001")
  //   setSocket(newSocket)
  // }, [setSocket])



  // const messageListener = (message:string) => {
  //   setMessages([...messages, message]);
  //   console.log("message sent");
  // }

  // useEffect(() => {
  //   socket?.on("msgToClient", messageListener)
  //   socket?.on("msgToClient", (socket) => {
  //     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  //   })
  //   return () => {
  //     socket?.off("msgToClient", messageListener)
  //   }
  // }, [messageListener])

  // const setUp = () =>
  // {
  //   up = true
  //   console.log("up is " + up);
  //   console.log("down is " + down);
  // };

  // const setDown = () =>
  // {
  //   down = true;
  //   console.log("up is " + up);
  //   console.log("down is " + down);
  // }

  // useEffect(() => {
  //   socket?.on("msgToClientUp", setUp)
  //   return () => {
  //     socket?.off("msgToClientUp", setUp)
  //   }
  // }, [setUp])
  
  // useEffect(() => {
  //   socket?.on("msgToClientDown", setDown)
  //   return () => {
  //     socket?.off("msgToClientDown", setDown)
  //   }
  // }, [setDown])


  // const setup = (p5: any, canvasParentRef: any) => {
  //   let cnv = p5.createCanvas(width, height).parent(canvasParentRef)
  //   cnv.mousePressed((event: any) => {
  //     if(victory === 1){
  //       x = width / 15
  //       y = height / 20
  //       victory = 0;
  //     }
  //   })
  //   p5.frameRate(60)
  // }
  
  // const draw = (p5: any) => {
  //   down = false;
  //   up = false;
  //   p5.background("#00FFFF")
  //   p5.textStyle(p5.BOLDITALIC);
  //   p5.textSize(60)
  //   p5.text( scoreOne + ' - ' + scoreTwo, width * (6/14) , 90);
  //   p5.fill(255)
  //   p5.rect(rectOnex, rectOney, rectW, rectH)
  //   p5.rect(rectTwox, rectTwoy, rectW, rectH)
  //   p5.circle(x, y, 10)
  //   if(x < 0){
  //     x = width / 15;
  //     y = height / 20;
  //     enter = 1;
  //     speedx *= (-1)
  //     if(speedy < 0)
  //       speedy *= (-1)
  //     scoreTwo++;
  //   }
  //   else  if(x > width){
  //     x = width * 13/ 15;
  //     y = height / 20;
  //     enter = 1;
  //     speedx *= (-1)
  //     if(speedy < 0)
  //       speedy *= (-1)
  //     scoreOne++;
  //   }
  //   if((p5.keyIsDown(80) && paused === 0) || enter === 1){
  //     pause *= (-1);
  //     paused = 1;
  //     count++;
  //     if(enter === 1)
  //       enter = 0;
  //     youcanpress = false;
  //   }
  //   else if (!p5.keyIsDown(80))
  //   {
  //     paused = 0;
  //     youcanpress = true;
  //   }
  //   if(p5.keyIsPressed){
  //     if(!p5.keyIsDown(p5.UP_ARROW) && !p5.keyIsDown(p5.DOWN_ARROW) && !p5.keyIsDown(87) && !p5.keyIsDown(83))
  //     {
  //       if(count % 2 === 1 && paused === 0)
  //       {
  //         pause *= -1;
  //         paused = 1;
  //         count++;
  //       }
  //     }
  //   }
  //   if(pause > 0)
  //   {
  //     if(p5.keyIsDown(p5.UP_ARROW))
  //     {
  //       rectTwoy -= speedRect;
  //       // socket?.emit("msgToServerUp");
  //     }
  //     if(p5.keyIsDown(p5.DOWN_ARROW))
  //     {
  //       rectTwoy += speedRect;
  //       // socket?.emit("msgToServerDown")
  //     }
  //     if(up)
  //       rectOney -= speedRect;
  //     if(down)
  //       rectOney += speedRect;
  //     // if(p5.keyIsDown(87))
  //     //   rectOney -= speedRect;
  //     // if(p5.keyIsDown(83))
  //     //   rectOney += speedRect;
  //   }
  //   if(y > height || y < 0)
  //   {
  //     speedy *= (-1)
  //     y += speedy
  //   }
  //   let hit1 = circRect(p5, x, y, rs, rectOnex, rectOney, rectW, rectH)
  //   let hit2 = circRect(p5, x, y, rs, rectTwox, rectTwoy, rectW, rectH)
  //   if(x > width || hit1 || hit2)
  //   {
  //     speedx *= (-1)
  //     x += speedx
  //   }
  //   if(scoreOne === 2)
  //     winner = "One";
  //   if(scoreTwo === 2)
  //     winner = "Two";
  //   if(victory === 1 || winner === "One" || winner === "Two")
  //   {
  //     victory = 1;
  //     p5.background("#d1af84");
  //     p5.fill(0)
  //     p5.textSize(60)
  //     p5.text("Player " + winner + " Win", width / 2 - width / 10,height / 3, 15, 300)
  //     winner = "noOne"
  //   }
  //   else{
  //     if(pause > 0)
  //     {
  //       // x += speedx;
  //       // y += speedy;
  //     }
  //   }
  //   if(p5.keyIsPressed && victory === 1 && !p5.keyIsDown(p5.UP_ARROW) && !p5.keyIsDown(p5.DOWN_ARROW) && !p5.keyIsDown(87) && !p5.keyIsDown(83)){
  //     if(p5.keyCode){
  //       console.log("start")
  //       x = width / 15
  //       y = height / 20
  //       scoreOne = 0;
  //       scoreTwo = 0;
  //       victory = 0;
  //       if(speedx < 0)
  //         speedx *= (-1)
  //       if(speedy < 0)
  //         speedy *= (-1)
  //     }
  //   }
  // }
  // function circRect(p5: any, cx: number, cy: number, rad: number, rx:number, ry:number, rw:number, rh:number) {
  //   let testX = cx;
  //    let testY = cy;
     
  //    if (cx < rx)         testX = rx;      // test left edge
  //    else if (cx > rx+rw) testX = rx+rw;   // right edge
  //    if (cy < ry)         testY = ry;      // top edge
  //    else if (cy > ry+rh) testY = ry+rh;   // bottom edge
     
  //    let d = p5.dist(cx, cy, testX, testY);
     
  //      if (d <= rad) {
  //      return true;
  //    }
  //    return false;
   
  //  }

  // // return <Sketch setup={setup} draw={draw} />
  // return (
  //   <>
  //   <div>
  //   <Sketch setup={setup} draw={draw} />
  //   </div>

  //   </>
  // )
  return (
    // <>nothing</>
    // <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/game' element={<Game/>} />
        </Routes>
      </BrowserRouter>
    // </StrictMode>
  )
}

export default App;
