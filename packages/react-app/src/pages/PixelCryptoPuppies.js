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
import puppies from "./../img/allPuppies.gif";
import opensea from "./../img/opensea.png";
import roadmap from "./../img/puppyRoadmap.gif";

const PixelCryptoPuppies = (account) => {
    return (
        <StyledCollection>
            <Heading>The Pixel Crypto Puppies</Heading>
            <Content>
                <Image src={puppies} alt="react-logo" style={{"alignSelf":"center"}} />
                <Paragraph>
                    The Pixel Crypto Puppies was <span style={{"color":"#ffbbc2", "fontWeight":"bold"}}>My Cute Pixel NFT's </span>
                    first creation and collection. It is simple and humble, but also adorable and extremelly cute. 
                    Plus, these puppies are animated! Don't underestimate them, as holders of these NFTs have been
                    given rewards in the past and will receive even more in the future!
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
                                            It was <span style={{"color":"#ffbbc2", "fontWeight":"bold"}}>My Cute Pixel NFT's </span> 
                                            first collection ever
                                        </EnumItem>
                                        <EnumItem>
                                            NFTs are all animated
                                        </EnumItem>
                                        <EnumItem>
                                            Holders will get a reward from our upcoming collection
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
                                            Bad choice of the NFTs' properties/attributes
                                        </EnumItem>
                                        <EnumItem>
                                            Little to no upfront promotion of the collection
                                        </EnumItem>
                                        <EnumItem>
                                            Little differentation between the NFTs in the collection
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
                                            To create and list NFTs in OpenSea
                                        </EnumItem>
                                        <EnumItem>
                                            To freeze the metadata so it becomes immutable and persistent
                                        </EnumItem>
                                        <EnumItem>
                                            Planning and announcing price increases when milestones are 
                                            reached works fine
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
                        Wow, this collection has sold out! But don't worry, you can still buy Pixel Crypto Puppies 
                        in the secondary market. You'll find the link to OpenSea below the roadmap.
                    </p>
                </PokkoRoadmap>
                <Image src={roadmap} alt="pixel-crypto-puppies-roadmap" 
                       style={{"alignSelf":"center", "marginTop":"1rem", "width":"50%", "height":"auto", "minWidth":"355px", "maxWidth":"700px"}} />
                <DivTextImage>
                    <Link href="https://opensea.io/collection/the-pixel-crypto-puppies" style={{"display":"flex", "flexDirection":"column"}}>
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
                <NFTVisualizer account={account} collection={"TPCP"}/>
            </Content>
        </StyledCollection>
    )
}

export default PixelCryptoPuppies;
