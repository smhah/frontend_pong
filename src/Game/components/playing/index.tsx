import { FunctionComponent, useEffect, useState } from "react";
import Canva from "./canva";

type Props = {
    socket : any;
    gameState: any;
    width: any;
    height: any;
};

const Play: FunctionComponent<Props> = (props) => {
    const [sectionWidth, setSectionWidth] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    useEffect(() => {
        const setup = () => {
            setSectionWidth(800);
            setSectionHeight(800);
        };
        setup();
    })
    return (
        <div>
                <Canva 
                    gameState={props.gameState}
                    socket={props.socket}
                    width={sectionWidth}
                    height = {sectionHeight}
                />
       </div> 

    )
}