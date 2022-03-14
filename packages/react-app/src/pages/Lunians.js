import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import { Image } from "./../components/index";
//import NFTVisualizer from "./../components/NFTVisualizer";
import MediumCard from "./../components/flipCard";
import { StyledCollection, Heading, Content, Paragraph } from 
"./../components/collectionPagesComponents";

import banner from "./../img/SpaceBackground200.png";
import lunia from "./../img/Lunia.gif";
import lunianseedpod from "./../img/LunianSeedpod.png";
import animatedlunianseedpod from "./../img/AnimatedLunianSeedpod.gif";
import blackhole from "./../img/BlackHole.jpg";

let toolTipCredits = "Planet and background created using Deep-Fold's <br/> Planet and Space generators";
let abstract1 = "\"A riveting tale about forces of cosmic proportions\".";
let abstract2 = "\"A planet full of mysteries and strange creatures\".";
let link1 = "https://medium.com/@mycutepixel-nft/origins-2ff7364458aa";
let link2 = "https://medium.com/@mycutepixel-nft/lunia-fca028acc38a";

const Lunians = () => {
    return (
        <StyledCollection>
            <Heading>Lunians</Heading>
            <Content>
                <SpaceBackground data-tip data-for="registerTipCredits" data-html="true">
                    <Image src={lunia} alt="lunia-planet" style={{"alignSelf":"center", 
                    "marginTop":"2rem", "marginBottom":"4rem", "paddingTop":"1.25%"}} />
                </SpaceBackground>

                <ReactTooltip id="registerTipCredits" place="top" effect="solid">
                    {toolTipCredits}
                </ReactTooltip>

                <Paragraph>
                    Welcome to Lunia.
                </Paragraph>

                <Paragraph>
                    The land of the Lunians, formed when a primordial black hole collapsed in on itself.
                    Little by little, this planet seems to be revealing some of its many secrets...
                </Paragraph>

                <div style={{"width":"100%", "position":"relative", "textAlign":"center", "marginTop":"2rem", 
                    "marginBottom":"2rem", "borderStyle":"groove", "borderColor":"rgb(179, 227, 227)",
                    "display":"flex", "justifyContent":"center", "flexDirection":"column", "alignItems":"center"}}>
                    <div style={{"marginTop":"-1.3rem", "background":"#3f396b", "width":"fit-content",
                        "padding":"0 0.8rem 0 0.8rem", "fontFamily":"Tiny BoxBitA10, sans-serif"}}>
                        DISCOVER MORE
                    </div>
                    <Grid style={{"margin":"1rem 2rem 0.5rem 2rem", "columnGap":"10px",
                        "justifyItems":"stretch"}}>
                        <MediumCard frontImage={blackhole} frontTitle="Origins" backText={abstract1} link={link1} />
                        <MediumCard frontImage={lunia} frontTitle="Lunia" backText={abstract2} link={link2}/>
                        <MediumCard />
                        <MediumCard />
                    </Grid>
                </div>

                <Image src={lunianseedpod} alt="lunian-seedpod" style={{"alignSelf":"center", 
                    "marginBottom":"2rem"}} />

                <Coming>More coming soon!</Coming>
            </Content>
        </StyledCollection>
    )
}

export default Lunians

const SpaceBackground = styled.div`
    background-image:url(${banner}); 
    background-repeat: repeat; 
    background-size: 100%;
    background-position: center;
    width: 105.3%;
    margin: 0.5rem 0 0 -2.7%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: justify;
`;

const Coming = styled.div`
    text-align: center;
    width: 100%;
    color: rgb(179, 227, 227);
    font-family: 'Tiny BoxBitA10', sans-serif;
    font-size: clamp(1.25rem, 2vw, 3vw);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
  justify-items: center;

  @media(max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media(max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media(max-width: 715px) {
    grid-template-columns: 1fr;
  }
`;