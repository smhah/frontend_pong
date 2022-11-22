import { FunctionComponent, useEffect, useRef, useState } from "react";
import Canva from "./canva";

type Props = {
    socket : any;
    gameState: any;
};

const Play: FunctionComponent<Props> = (props) => {

    const ref = useRef(null);
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
            setSectionWidth((ref.current as any).clientWidth);
            setSectionHeight((ref.current as any).clientHeight);
            console.log("width is " + sectionWidth);
            console.log("height is " + sectionHeight);
        };
        setup();
    }, [(ref.current as any)?.clientWidth])

    return (
        <div 
            ref = {ref}
        >
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