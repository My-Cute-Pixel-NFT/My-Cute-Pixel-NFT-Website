import { React, useState} from 'react';
import ReactCardFlip from 'react-card-flip';
import styled from 'styled-components';

import { Image, Link } from "./../components/index";

function FlipCard({ frontImage, frontTitle, backText, link }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const flippedHandler = () => {
        setIsFlipped(current => !current);
    }
  
    if (!frontImage) {
        return (
            <div style={{"maxHeight":"394px", "justifyContent":"center", "borderStyle":"ridge", 
                "borderColor":"#8F48B8FF", "display": "flex", "alignItems":"center"}}>
                New chapter soon
            </div>
        );
    } else {
        return (
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                <DivTextImage onClick={flippedHandler} style={{"borderStyle":"ridge", 
                    "borderColor":"#8F48B8FF", "maxHeight":"394px"}}>
                    <div style={{"paddingBottom":"1rem", "color":"rgb(179, 227, 227)", "width":"100%",
                        "backgroundColor":"#8F48B8FF"}}>
                        {frontTitle}
                    </div>
                    <Image src={frontImage} alt="placeholder" style={{"alignSelf":"center", 
                        "marginBottom":"0"}} />
                </DivTextImage>

                <DivTextImage onClick={flippedHandler} style={{"borderStyle":"ridge", 
                    "borderColor":"#8F48B8FF", "maxHeight":"394px"}}>
                    <div style={{"fontStyle":"italic", "textAlign":"left", "width":"100%", 
                        "padding":"1rem 1rem 0 1rem","fontSize":"130%"}}>
                        {backText}
                    </div>
                    <Link href={link} style={{"margin":"1rem 0 1rem 0"}}>Read the story in Medium</Link>
                </DivTextImage>
            </ReactCardFlip>
        );
    }
  }

  const DivTextImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

  export default FlipCard;