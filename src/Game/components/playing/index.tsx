import { FunctionComponent, useEffect, useRef, useState } from "react";
import Canva from "./canva";

type Props = {
    socket : any;
    gameState: any;
};

const Play: FunctionComponent<Props> = (props) => {

    const getWindowSize = () => {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const [sectionWidth, setSectionWidth] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
        }, []);

    useEffect(() => {
        const setup = () => {
            setSectionWidth(windowSize.innerWidth);
            setSectionHeight(windowSize.innerHeight);
        };
        setup();
    }, [windowSize.innerHeight, windowSize.innerWidth])

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

export default Play;