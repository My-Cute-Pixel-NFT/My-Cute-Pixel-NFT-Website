import React from 'react';

import { Image, Link } from "./../components/index";
import NFTVisualizer from "./../components/NFTVisualizer";
import { StyledCollection, Heading, Content, OpenSea, DivTextImage, DivImage, NavigateMsg, Paragraph, 
         Item, InsideItem, EnumItem, Pokko, CarrouselImage, CarrouselText, PokkoRoadmap } from "./../components/collectionPagesComponents";

import Fade from 'react-reveal/Fade';
import Carousel from 'react-bootstrap/Carousel';

import fullchibi from "./../img/fullchibi.png";
import chibi1 from "./../img/chibi1.png";
import chibi2 from "./../img/chibi2.png";
import chibi3 from "./../img/chibi3.png";
import chibi4 from "./../img/chibi4.png";
import girls from "./../img/allGirls.gif";
import opensea from "./../img/opensea.png";
import roadmap from "./../img/moeRoadmap.gif";

const TheMoeGirls = (account) => {
    return (
        <StyledCollection style={{"width":"95%"}}>
            <Heading>The Moe Girls</Heading>
            <Content>
                <Image src={girls} alt="react-logo" style={{"alignSelf":"center", "marginTop":"2rem", "marginBottom":"4rem"}} />
                <Paragraph>
                    The Moe Girls is <span style={{"color":"#ffbbc2", "fontWeight":"bold"}}>My Cute Pixel NFT's </span>
                    second and last collection... so far. Their cute style and look are complemented with interesting stories,
                    descriptions, personality traits and secrets. Plus, some Moe Girls have a connection with others! Holders 
                    of these NFTs have been given rewards in the past and will receive even more in the future!
                </Paragraph>
                <Pokko>
                    <Fade left>
                        <div>
                            Hi, I'm Pokko! Nice to meet you! I'm here to tell you more about this 
                            collection.
                        </div>
                    </Fade>
                    <Image src={fullchibi} alt="chibi-full-body" style={{"alignSelf":"center"}} />
                    <Fade right delay={1750}>
                        <div>
                            Interested? Super doopy! Then come with me and learn some fun facts!
                        </div>
                    </Fade>
                </Pokko>
                <Carousel style={{"width":"100%", "margin":"0.5rem 0 1rem 0"}}>
                    <Carousel.Item interval={4000}>
                        <Item>
                            <InsideItem>
                                <CarrouselImage src={chibi1} alt="chibi-heart" />
                                <CarrouselText>
                                    <div style={{"color":"#b3e3e3", "fontWeight":"bold", "marginBottom":"8px"}}>
                                        What makes this collection special:
                                    </div>
                                    <ul>
                                        <EnumItem>
                                            We put a lot of time and care into the descriptions and 
                                            properties / attributes
                                        </EnumItem>
                                        <EnumItem>
                                            Some NFTs have connections with others
                                        </EnumItem>
                                        <EnumItem>
                                            Portraits include a unique sentence, which differentiates 
                                            them from other collections
                                        </EnumItem>
                                    </ul>
                                </CarrouselText>
                            </InsideItem>
                        </Item>
                    </Carousel.Item>
                    <Carousel.Item interval={4000}>
                        <Item>
                            <InsideItem>
                                <CarrouselImage src={chibi2} alt="chibi-cross" />
                                <CarrouselText>
                                    <div style={{"color":"#b3e3e3", "fontWeight":"bold", "marginBottom":"8px"}}>
                                        What we did wrong:
                                    </div>
                                    <ul>
                                        <EnumItem>
                                            Not an ideal aspect ratio format
                                        </EnumItem>
                                        <EnumItem>
                                            The metadata of the NFTs we gave away to reward old buyers 
                                            was not frozen
                                        </EnumItem>
                                        <EnumItem>
                                            Anti-alising was not done using transparencies 
                                        </EnumItem>
                                    </ul>
                                </CarrouselText>
                            </InsideItem>
                        </Item>
                    </Carousel.Item>
                    <Carousel.Item interval={4000}>
                        <Item>
                            <InsideItem>
                                <CarrouselImage src={chibi3} alt="chibi-idea" />
                                <CarrouselText>
                                    <div style={{"color":"#b3e3e3", "fontWeight":"bold", "marginBottom":"8px"}}>
                                        What we learnt:
                                    </div>
                                    <ul>
                                        <EnumItem>
                                            Dropping NFTs one by one, instead of doing it all at once, 
                                            creates more expectation
                                        </EnumItem>
                                        <EnumItem>
                                            To make good use of descriptions &#38; properties to add 
                                            a whole new dimension to the art 
                                        </EnumItem>
                                        <EnumItem>
                                            That NFT standards were not yet prepared to define and reflect 
                                            interrelations between NFTs
                                        </EnumItem>
                                    </ul>
                                </CarrouselText>
                            </InsideItem>
                        </Item>
                    </Carousel.Item>
                </Carousel>
                <PokkoRoadmap>
                    <Image src={chibi4} alt="chibi-amazed" 
                           style={{"alignSelf":"center", "width":"200px", "height":"auto"}} />
                    <p style={{"textAlign":"center"}}>
                        Wow, this collection has sold out! But don't worry, you can still buy Moe Girls
                        in the secondary market. You'll find the link to OpenSea below the roadmap.
                    </p>
                </PokkoRoadmap>
                <Image src={roadmap} alt="moe-girls-roadmap" 
                style={{"alignSelf":"center", "marginTop":"1rem", "width":"50%", "height":"auto", "minWidth":"355px", "maxWidth":"700px"}} />
                <Paragraph>We accept commissions for this collection! You'll find more than 32 Moe Girls in OpenSea
                           because of this and due to the special Christmas Editions that were given to early buyers.
                           If you want your own, custom Moe Girl, based on any character you like, contact us on Twitter.
                </Paragraph>
                <DivTextImage>
                    <Link href="https://opensea.io/collection/the-moe-girls" style={{"display":"flex", "flexDirection":"column"}}>
                        <Fade right duration={3000}>
                            <NavigateMsg>
                                Navigate to OpenSea to browse the collection now!
                            </NavigateMsg>
                        </Fade>
                        <Fade left big duration={3000}>
                            <DivImage>
                                <OpenSea>
                                    <Image src={opensea} alt="opensea-logo" style={{"height":"100px", "width":"100px"}}/>
                                </OpenSea>
                            </DivImage>
                        </Fade>
                    </Link>
                </DivTextImage>
                <NFTVisualizer account={account} collection={"TMG"}/>
            </Content>
        </StyledCollection>
    )
}

export default TheMoeGirls
