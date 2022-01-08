import React, { useState } from "react";
import styled from 'styled-components';

import { RiArrowDownSFill } from "react-icons/ri";
import { BsFillPaletteFill } from "react-icons/bs";
import { BiPaint, BiCodeAlt } from "react-icons/bi";
import { MdCollections } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { SiResearchgate, SiLinkedin } from "react-icons/si";

import Fade from 'react-reveal/Fade';
import Flash from 'react-reveal/Flash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './../tabs.css';

import { Image, Link } from "./../components/index";

import banner from "./../img/welcomeBanner.png";
import nanae from "./../img/nanae.png";
import ravenink from "./../img/ravenink.png";
import work from "./../img/pencil.png";
import glasses from "./../img/glasses.png";
import paw from "./../img/paw.png";

const Home = () => {
    const [socialBut1Color, setSocialBut1Color] = useState("#e8f8f8");
    const [socialBut2Color, setSocialBut2Color] = useState("#e8f8f8");

    const socialBut1Style={
        color:`${socialBut1Color}`,
        "display":"flex",
        "alignItems":"center"
      };
      const socialBut2Style={
        color:`${socialBut2Color}`,
        "display":"flex",
        "alignItems":"center"
      };

      const handleSoc1ColorEnter = () => {
        setSocialBut1Color("#ffbbc2");
      };
      const handleSoc1ColorLeave = () => {
        setSocialBut1Color("#e8f8f8");
      };
  
      const handleSoc2ColorEnter = () => {
        setSocialBut2Color("#ffbbc2");
      };
      const handleSoc2ColorLeave = () => {
        setSocialBut2Color("#e8f8f8");
      };

    return (
        <StyledHome style={{"width":"95%"}} >
            <WelcomeBanner>
                <Flash forever={true} duration={4000}>
                    <Heading>Welcome!</Heading>
                </Flash>
            </WelcomeBanner>
            <Content>
                <Paragraph>
                    We thought the first thing you would like to know is not about our art {<BsFillPaletteFill />}, 
                    collections {<MdCollections />} or projects {<AiOutlineFundProjectionScreen />}, but about us!
                </Paragraph>
                <Paragraph>
                    Who is behind <span style={{"color":"#ffbbc2", "fontWeight":"bold"}}>My Cute Pixel NFT</span>? What do we do 
                    exactly? What is our vision on NFTs? What makes us unique? Get to know us a little 
                    better and you may start trusting us and the things we do, right?
                </Paragraph>
                <Paragraph style={{"alignSelf":"center"}}>
                    <RiArrowDownSFill style={{"color":"#ffbbc2"}} size={40} /> 
                    So, let's get to it!
                    <RiArrowDownSFill style={{"color":"#ffbbc2" }} size={40} />
                    <br />
                    <p style={{"display":"flex", "justifyContent":"center"}}>
                        {"( >ω< )"}
                    </p>
                </Paragraph>
                <Tabs style={{"width":"100%", "alignSelf":"center", "marginTop":"2rem"}}>
                    <TabList style={{"display":"flex", "flexDirection":"column", "alignItems":"stretch"}}>
                        <TabTitlesSize>
                            <Tab>Who we are</Tab>
                            <Tab>What we do</Tab>
                            <Tab>Our vision</Tab>
                            <Tab>Our hallmark</Tab>
                        </TabTitlesSize>
                    </TabList>

                    <TabPanel>
                        <Fade bottom cascade>
                            <div>
                                <Paragraph>We are a happy married couple who form a team not only in live but in the NFT space too!
                                She is the artist and he is the programmer.</Paragraph>
                                <Fade left>
                                    <h3 style={{"color":"#b3e3e3", "marginTop":"2rem", "fontWeight":"bold", "textAlign":"left"}}>
                                        <BiPaint/> Meet the artist
                                    </h3>
                                </Fade>
                                <DivTextImage>
                                    <DivImage>
                                        <Fade left>
                                            <Image src={nanae} alt="nanae-portrait" style={{"height":"200px", "width":"auto", "margin":"10px 20px"}} />
                                        </Fade>
                                    </DivImage>
                                    <Fade right>
                                        <Paragraph>Known as Nanae. She is joyful, dramatic and very passionate in everything she does, so, 
                                        of course, she is the heart of the team. She loves eating sweet things, especially pancakes, which she devours as there was 
                                        no tomorrow. She always felt a great passion for anime, video games, and cute things and beings, like her dog and her cat. 
                                        She has specialized now in the adorable style of pixel art.</Paragraph>
                                    </Fade>
                                </DivTextImage>
                                <Fade left>
                                    <h3 style={{"color":"#b3e3e3", "marginTop":"1rem", "fontWeight":"bold", "textAlign":"left"}}>
                                        <BiCodeAlt/> Meet the programmer
                                    </h3>
                                </Fade>
                                <DivTextImage>
                                    <DivImage>
                                        <Fade left>
                                            <Image src={ravenink} alt="ravenink-portrait" style={{"height":"200px", "width":"auto", "margin":"10px 20px"}} />
                                        </Fade>
                                        <div style={{"display":"flex", "justifyContent":"space-between", "width":"50%"}}>
                                            <a href="https://www.linkedin.com/in/luis-de-la-torre-cubillo-9610b759/" target="_blank" 
                                            rel="noreferrer" style={socialBut1Style} onMouseEnter={handleSoc1ColorEnter} 
                                            onMouseLeave={handleSoc1ColorLeave}>
                                                <SiLinkedin />
                                            </a>
                                            <a href="https://www.researchgate.net/profile/Luis-De-La-Torre-Cubillo" target="_blank" 
                                            rel="noreferrer" style={socialBut2Style} onMouseEnter={handleSoc2ColorEnter} 
                                            onMouseLeave={handleSoc2ColorLeave}>
                                                <SiResearchgate />
                                            </a>
                                        </div>
                                    </DivImage>
                                    <Fade right>
                                        <Paragraph>Known as Ravenink. He is waaaaay more boring and serious than Nanae, and was always seen 
                                        (and still is) as a computer geek and an introvert freak. He likes boasting about being a Doctor (in Computer Science), but 
                                        the truth is he is ashamed for being a Physicist reconverted into a programmer. He is specialized in boring things that suit
                                        him such as HTTP protocols, IoT and, now, blockchain.</Paragraph>
                                    </Fade>
                                </DivTextImage>
                            </div>
                        </Fade>
                    </TabPanel>
                    <TabPanel>
                        <Fade bottom cascade>
                            <div>
                                <Paragraph>Well, the name is pretty descriptive, isn't it? <span style={{"color":"#ffbbc2", "fontWeight":"bold"}}>My Cute Pixel 
                                NFT</span> focuses in, guess what? Creating NFT art and projects that follow a cute pixel art style! 
                                Not a big surprise, huh? {"〜♪"}</Paragraph>
                                <DivTextImageReverse>
                                    <Paragraph>For those who do not know, NFTs stands for Non-Fungible Tokens, and they are a form of blockchain 
                                    assets which are limited in number and are different from other NFTs. Considering their nature, NFT 
                                    projects usually need to combine the best of art and technology. We work only in <Link 
                                    href="https://polygon.technology/">Polygon</Link> to offer virtually no gas fees to users, as well 
                                    as peace of spirit for knowing their NFTs, in a blockchain based on <Link 
                                    href="https://docs.polygon.technology/docs/validate/polygon-basics/what-is-proof-of-stake/">PoS</Link> and <Link href="https://www.gemini.com/cryptopedia/polygon-crypto-matic-network-dapps-erc20-token">
                                    Level-2</Link> solutions, are environmentaly friendly. For us, this is truly important!</Paragraph>
                                    <DivImage>
                                        <Fade right>
                                            <Image src={work} alt="paw" style={{"height":"200px", "width":"auto", "margin":"10px 20px"}} />
                                        </Fade>
                                    </DivImage>
                                </DivTextImageReverse>
                                <Paragraph>👾Pixel art is a drawing style that creates images and/or animations on the pixel level, and which 
                                immediately evokes memories and aromas of the 8 and 16 bit era. Drawning you with nostalgia and
                                providing a retro look are its two most powerful weapons to reach to people's hearts.</Paragraph>
                            </div>
                        </Fade>
                    </TabPanel>
                    <TabPanel>
                        <Fade bottom cascade>
                            <div>
                                <Paragraph>We believe NFTs are fundamentally different from traditional or classic art. Not better, nor worst, 
                                but different. NFTs and blockchain technologies offer tools and possibilities that enable new features
                                and approaches to be included in this form of digital art that other forms can't achieve.</Paragraph>
                                <DivTextImage>
                                    <DivImage>
                                        <Fade left>
                                            <Image src={glasses} alt="paw" style={{"height":"200px", "width":"auto", "margin":"10px 20px"}} />
                                        </Fade>
                                    </DivImage>
                                    <Paragraph>Our vision is that NFTs that do not take advantage of these possibilities, are, somehow, incomplete.
                                    The art may be astonishing, of course, and you will always get the "sign certificate" that proves a 
                                    piece is yours (with all the huge things this implies), but still, these NFTs would be wasting or ignoring
                                    so many other exciting things they could offer.</Paragraph>
                                </DivTextImage>
                                <Paragraph>One last thing! NFT's value come from their persistance. If an NFT does not have frozen metadata (properties
                                and image, for example), the owner will always be at risk of seeing how the art changes or even dissapears!
                                Our opinion is NFTs should be immutable and persistant. Even if this increases the chances of an NFT to
                                present errors in the art or the description, this is part of the game and the charm of blockchains, isn't it? {"(ゝω・)✧"}</Paragraph>
                            </div>
                        </Fade>
                    </TabPanel>
                    <TabPanel>
                        <Fade bottom cascade> 
                            <div>
                                <Paragraph>Our take is an NFT collection should ideally offer more than the eye sees at a first glance.</Paragraph>
                                <DivTextImageReverse>
                                    <Paragraph>This special thing could be in the properties or the description, where an NFT may present all kind 
                                    of text-based information, traits, or stats. Two or more NFTs in a collection may have some kind of connection.
                                    An NFT could unlock some hidden content, or appear as a result of hatching an egg. The NFT could be interactive. 
                                    Or, maybe, it could be modular, so that it could contain, or be combined with, other NFTs.</Paragraph>
                                    <DivImage>
                                        <Fade right>
                                            <Image src={paw} alt="paw" style={{"height":"200px", "width":"auto", "margin":"10px 20px"}} />
                                        </Fade>
                                    </DivImage>
                                </DivTextImageReverse>
                                <Paragraph>Whatever this little extra is, we truly believe they make NFT art and collections much more special. Here
                                at <span style={{"color":"#ffbbc2", "fontWeight":"bold"}}>My Cute Pixel NFT</span>, we now always try to add this 
                                "something more" to our works. ♡</Paragraph>
                            </div>
                        </Fade>
                    </TabPanel>
                </Tabs>
                {/*
                <p style={{"alignSelf":"center"}}>
                    <Button onClick={() => readOnChainData(account)}>
                        Read On-Chain Balance
                    </Button>
                </p>
                */}
            </Content>
        </StyledHome>
    )
}

const WelcomeBanner = styled.div`
    background-image:url(${banner}); 
    background-repeat: no-repeat; 
    background-size: 100%;
    background-position: center;
    width: 105.3%;
    padding-top: 25.33%;
    margin: 1.4rem 0 -3rem -2.7%;
`;

const StyledHome = styled.div`
    min-height: 100vh;
    margin-bottom: 1.5rem;
`;

const Heading = styled.h1`
    font-family: 'Ice Pixel7', sans-serif;
    font-size: clamp(3rem, 6vw, 8vw);
    text-align: center;
    color: #f0a5ad;
    font-weight: 500;
    margin: -0.5rem 0 3rem 0;
    padding: 0 0 9% 0;
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
   @media screen and (max-width: 700px) {
        font-size: clamp(2.5rem, 6vw, 8vw);
   }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: justify;
    width: 100%;
    margin: 25px 0;
    color: #e8f8f8;
    font-family: 'Minecraftia', sans-serif;
    font-size: clamp(1.25rem, 1.7vw, 3vw);
    a {
        color: #ffbbc2;
        text-decoration: none;
    }
`;

const TabTitlesSize = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media screen and (max-width: 700px) {
        font-size: 16px;
    }
`;

const DivTextImage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 845px) {
        flex-direction: column;
    }
`;

const DivTextImageReverse = styled.div`
    display: flex;
    justifyContent: space-between;
    alignItems: center;
    @media screen and (max-width: 845px) {
        flex-direction: column-reverse;
    }
`;

const DivImage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
`;

const Paragraph = styled.p`
    margin: 1rem 0;
`;

export default Home