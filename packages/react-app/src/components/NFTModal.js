import { useState } from "react";
import styled from "styled-components";
import { NftPhoto } from "./NFTCard";
import { NFTProgressBar } from "./NFTProgressBar";

import Tada from 'react-reveal/Tada';
import Fade from 'react-reveal/Fade';

const NFTModal = (props) => {
  const [closeButColor, setCloseButColor] = useState("#6c718c");
  let nft = props.nft;
  let collection = props.collection;
  let owner = props.owner;
  let account = props.account.account;

  const handleButColorEnter = () => {
    setCloseButColor("#ffbbc2");
  };
  const handleButColorLeave = () => {
    setCloseButColor("#6c718c");
  };
  const closeButStyle={
    color:`${closeButColor}`
  };

  let width;
  let height;
  if (window.innerWidth > 1050) {
    width = "400px";
    height = "325px";
  } else {
    width = "200px";
    height = "165px";
  }

  return (
    <Modal>
      <ModalContent>
        <ModalGrid>
          <div>
            <NftPhoto style={{backgroundImage: `url(${nft.image_url})`, "height":height, "width":width,
            "backgroundSize":"100%", "backgroundRepeat":"no-repeat"}} />
            <SectionText style={{"fontSize":"19px"}}> Owned by: </SectionText>
            <Owner owner={owner} account={account} />
            <Attributes nft={nft} collection={collection} target={"TMG"}/>
          </div>
          <div>
            <ModalTitle>{nft.name}</ModalTitle>
            <Tada>
              <Paragraph style={{"textDecoration":"underline"}}> {`You own ${nft.copies} copies`} </Paragraph>
            </Tada>
            <SectionText> Description </SectionText>
            <Paragraph style={{"width":"100%"}}> {nft.description} </Paragraph>
            <Attributes nft={nft} collection={collection} target={"TPCP"}/>
          </div>
        </ModalGrid>
        <CloseButton onClick={() => props.toggleModal()} onMouseEnter={handleButColorEnter} 
            onMouseLeave={handleButColorLeave} style={closeButStyle} >
          &times;
        </CloseButton>
      </ModalContent>
    </Modal>
  )
}

function Owner({owner, account}) {
  if (typeof(owner) === "Array") {
    // TODO
    return(
      <p style={{"fontSize":"16px", "color":"#c5d7e0", "textAlign":"center"}}>
        You! <span style={{"fontSize":"20px", "color":"#ffbbc2"}}>♡</span> (and {owner.length-1} others)
      </p>
    );
  } else if (owner !== "") {
    if (account.toUpperCase() === owner.toUpperCase()) {
        return(
          <p style={{"fontSize":"16px", "color":"#c5d7e0", "textAlign":"center"}}>
            You! <span style={{"fontSize":"20px", "color":"#ffbbc2"}}>♡</span>
          </p>
        );
    } else {
      let fontSize;
        if (window.innerWidth > 500) {
          fontSize = "14px";
        } else {
          fontSize = "11px";
        }
        return (
          <p style={{"fontSize":fontSize, "color":"#c5d7e0", "textAlign":"center"}}>
            {owner.substring(0, 2)} <br/> {owner.substring(3)}
          </p>
        );
    }
  } else {
        return (
        <p style={{"fontSize":"16px", "color":"#c5d7e0", "textAlign":"center"}}>
          No one ( ´•̥ω•̥` )
        </p>
        );
  }
}

function Attributes({nft, collection, target}) {
  if (collection === target) {
    return (
      <div>
        <SectionText> Attributes </SectionText>
        <Fade bottom>
          {nft.properties &&
            nft.properties.map((property, i) =>
              <div key={i} >
                <div style={{margin: "10px 0px 5px 0px", "display":"flex", "justifyContent":"space-between"}}>
                    <AttributeText> {
                        property.display_type === "boost_number" ? "Value Boost (" + property.trait_type + ")" : 
                        property.display_type === "boost_percentage" ? "% Boost (" + property.trait_type + ")" : 
                        property.trait_type }
                    </AttributeText>
                    <AttributeText style={{float: "right", "fontWeight":"100"}}> {property.value} </AttributeText>
                </div>
                  {
                    property.max_value !== undefined ?
                    <NFTProgressBar percent={property.value * 10} /> : ""
                  }
              </div>
            )
          }
        </Fade>
      </div>
    );
  } else {
    return ("");
  }
}

const AttributeText = styled.h4`
    color: #c5d7e0;
    font-size: 16px;
    margin: 0;
    display: inline;
  `

const CloseButton = styled.span`
    position: absolute;
    right: 0;
    top: 0;
    padding: 20px 25px 0 0;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
    color: #6c718c;
  `
const ModalTitle = styled.h1`
    color: #f0a5ad;
    font-size: 25px;
    margin: 0;
  `

const Paragraph = styled.p`
    color: #c5d7e0;
    font-size: 18px;
    margin: 0 0 15px 0;
  `

const SectionText = styled.h3`
    color: #ffbbc2;
    font-size: 22px;
    margin: 5px 0 5px 0;
  `

const ModalGrid = styled.div`
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
    @media(max-width: 900px) {
      grid-template-columns: 1fr;
    }
  `
const Modal = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0, 0.5);
  `

const ModalContent = styled.div`
    position: relative;
    width: 900px;
    margin: auto;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    @media(max-width: 900px) {
      width: 435px;
    }
    @media(max-width: 450px) {
      width: 350px;
    }
  `

export { NFTModal }