import React from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import styled from 'styled-components';

import { Image } from "./../components/index";
import { Paragraph } from "./../components/collectionPagesComponents";

import header from "./../img/commissionsHeader.png";
import tier1 from "./../img/commissionTier1.png";
import tier2 from "./../img/commissionTier2.png";
import tier3 from "./../img/commissionTier3.png";
import tier4 from "./../img/commissionTier4.png";
import tier5 from "./../img/commissionTier5.png";
import tier6 from "./../img/commissionTier6.png";

const Commissions = () => {
    return (
        <StyledCommissions>
            <Heading>Commissions</Heading>
            <Content>
                <BannerTier0>
                    <Image src={header} alt="react-logo" style={{"alignSelf":"center", "marginTop":"2rem", "marginBottom":"4rem"}} />
                </BannerTier0>
                <Paragraph>
                    You are here because you love My Cute Pixel NFT's art, right? Would you like to have a special piece done especifically
                    for you, based on an original character you have, on other famous characters, or something completely new? Then, you are
                    in the right place. Here, you'll find some examples, divided into Tiers, of things you can commission us. Just choose the
                    format you prefer and contact us in Twitter!
                </Paragraph>
                <BannerTier1>
                    <Zoom>
                        <TierHeading>Tier 1</TierHeading>
                    </Zoom>
                    <TierInfo>
                        <Fade left>
                            <Image src={tier1} alt="react-logo" style={{"alignSelf":"center", "height":"200px"}} />
                        </Fade>
                        <Paragraph style={{"alignSelf":"center", "marginRight":"10px", "marginLeft":"10px", "color":"gray"}}>
                            <b>Canvas size:</b> 32px x 32px
                            <br></br>
                            <b>Price:</b> 0.01 Eth
                            <br></br>
                            <b>Note:</b> A nice format for simple, small and cute designs.
                        </Paragraph>
                    </TierInfo>
                </BannerTier1>
                <BannerTier2>
                    <Zoom>
                        <TierHeading>Tier 2</TierHeading>
                    </Zoom>
                    <TierInfo>
                        <Fade left>
                            <Image src={tier2} alt="react-logo" style={{"alignSelf":"center", "height":"200px"}} />
                        </Fade>
                        <Fade right>
                            <Paragraph style={{"alignSelf":"center", "marginRight":"10px", "marginLeft":"10px", "color":"gray"}}>
                                <b>Canvas size:</b> 45px x 45px
                                <br></br>
                                <b>Price:</b> 0.015 Eth
                                <br></br>
                                <b>Note:</b> Looking for icons and emojis? We got it!
                            </Paragraph>
                        </Fade>
                    </TierInfo>
                </BannerTier2>
                <BannerTier3>
                    <Zoom>
                        <TierHeading>Tier 3</TierHeading>
                    </Zoom>
                    <TierInfo>
                        <Fade left>
                            <Image src={tier3} alt="react-logo" style={{"alignSelf":"center", "height":"200px"}} />
                        </Fade>
                        <Fade right>
                            <Paragraph style={{"alignSelf":"center", "marginRight":"10px", "marginLeft":"10px", "color":"gray"}}>
                                <b>Canvas size:</b> 64px x 64px
                                <br></br>
                                <b>Price:</b> 0.02 Eth
                                <br></br>
                                <b>Note:</b> Half-body designs with some nice details.
                            </Paragraph>
                        </Fade>
                    </TierInfo>
                </BannerTier3>
                <BannerTier4>
                    <Zoom>
                        <TierHeading>Tier 4</TierHeading>
                    </Zoom>
                    <TierInfo>
                        <Fade left>
                            <Image src={tier4} alt="react-logo" style={{"alignSelf":"center", "height":"200px"}} />
                        </Fade>
                        <Fade right>
                            <Paragraph style={{"alignSelf":"center", "marginRight":"10px", "marginLeft":"10px", "color":"gray"}}>
                                <b>Canvas size:</b> 64px x 64px
                                <br></br>
                                <b>Price:</b> 0.03 Eth
                                <br></br>
                                <b>Note:</b> Full-body designs with some nice details.
                            </Paragraph>
                        </Fade>
                    </TierInfo>
                </BannerTier4>
                <BannerTier5>
                    <Zoom>
                        <TierHeading>Tier 5</TierHeading>
                    </Zoom>
                    <TierInfo>
                        <Fade left>
                            <Image src={tier5} alt="react-logo" style={{"alignSelf":"center", "height":"200px"}} />
                        </Fade>
                        <Fade right>
                            <Paragraph style={{"alignSelf":"center", "marginRight":"10px", "marginLeft":"10px", "color":"gray"}}>
                                <b>Canvas size:</b> 96px x 96px
                                <br></br>
                                <b>Price:</b> 0.04 Eth
                                <br></br>
                                <b>Note:</b> This tier is perfect for profile pictures.
                            </Paragraph>
                        </Fade>
                    </TierInfo>
                </BannerTier5>
                <BannerTier6>
                    <Zoom>
                        <TierHeading>Tier 6</TierHeading>
                    </Zoom>
                    <TierInfo>
                        <Fade left>
                            <Image src={tier6} alt="react-logo" style={{"alignSelf":"center", "height":"200px"}} />
                        </Fade>
                        <Fade right>
                            <Paragraph style={{"alignSelf":"center", "marginRight":"10px", "marginLeft":"10px", "color":"gray"}}>
                                <b>Canvas size:</b> 180px x 180px
                                <br></br>
                                <b>Price:</b> 0.06 Eth
                                <br></br>
                                <b>Note:</b> Our top-tier and most elaborated drawings.
                            </Paragraph>
                        </Fade>
                    </TierInfo>
                </BannerTier6>
            </Content>
        </StyledCommissions>
    )
}

const StyledCommissions = styled.div`
    min-height: 100vh;
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Heading = styled.h1`
    font-family: 'Ice Pixel7', sans-serif;
    font-size: clamp(3rem, 5vw, 6vw);
    text-align: center;
    color: #f0a5ad;
    font-weight: 500;
    margin: 2.5rem 0 1.6rem 0;
    padding: 0;
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: justify;
    width: 100%;
    margin: 20px 0;
    color: #e8f8f8;
    font-family: 'Minecraftia', sans-serif;
    font-size: clamp(1.25rem, 1.7vw, 3vw);
    a {
        color: #ffbbc2;
        text-decoration: none;
    }
`;

const BannerTier0 = styled.div`
    background-color: #c5d7e0;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const BannerTier1 = styled.div`
    background-color: #c3f6ce;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const BannerTier2 = styled.div`
    background-color: #d7b1fc;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const BannerTier3 = styled.div`
    background-color: #f7b6d1;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const BannerTier4 = styled.div`
    background-color: #b5bdde;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const BannerTier5 = styled.div`
    background-color: #c6eaff;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const BannerTier6 = styled.div`
    background-color: #fcedb2;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const TierHeading = styled.h2`
    font-family: 'Ice Pixel7', sans-serif;
    font-size: clamp(3rem, 5vw, 10vw);
    text-align: center;
    color: white;
    font-weight: 200;
    margin: 1rem 0 0 0;
    padding: 0;
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
`;

const TierInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 40px;
    justify-items: center;

    @media(max-width: 900px) {
    grid-template-columns: 1fr;
    }
`;

export default Commissions