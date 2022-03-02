import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import { Image, Link } from "./../components/index";
//import NFTVisualizer from "./../components/NFTVisualizer";
import { StyledCollection, Heading, Content, OpenSea, DivTextImage, DivImage, NavigateMsg, Paragraph, 
         Item, InsideItem, EnumItem } from "./../components/collectionPagesComponents";

import banner from "./../img/SpaceBackground200.png";
import lunia from "./../img/Lunia.gif";
import lunianseedpod from "./../img/LunianSeedpod.png";

let toolTipCredits = "Planet and background created using Deep-Fold's <br/> Planet and Space generators";

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
                    The information gathered about this planet so far is scarce, but it is believed 
                    Lunia was formed when a primordial black hole collapsed in on itself.
                </Paragraph>

                <Image src={lunianseedpod} alt="lunian-seedpod" style={{"alignSelf":"center", 
                    "marginTop":"2rem", "marginBottom":"2rem"}} />

                <Coming>Coming soon!</Coming>
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