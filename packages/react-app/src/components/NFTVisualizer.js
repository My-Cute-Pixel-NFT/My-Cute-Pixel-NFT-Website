import { Contract } from "@ethersproject/contracts";
import { InfuraProvider } from "@ethersproject/providers";
import { addresses, abis, puppiesTokens, moegirlsTokens } from "@project/contracts";

// import { OpenSeaPort, Network } from 'opensea-js';
import { useMoralis } from "react-moralis";

import { useState, useEffect } from "react";
import Flash from 'react-reveal/Flash';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

import { NFTCard } from './NFTCard';
import { NFTModal } from './NFTModal';

// INFURA
const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const NETWORK = process.env.REACT_APP_NETWORK;

const axios = require('axios');

function NFTVisualizer({ account, collection }) {

    let initName = "";
    if (collection === "TPCP") initName = "Pixel Crypto Puppy";
    else initName = "Moe Girl";
  
    let initialNfts =
    [
        { name: initName, symbol: collection, copies: 0, image_url: "./../img/TitleGif.gif" },
        { name: initName, symbol: collection, copies: 0, image_url: "./../img/TitleGif.gif" },
        { name: initName, symbol: collection, copies: 0, image_url: "./../img/TitleGif.gif" },
        { name: initName, symbol: collection, copies: 0, image_url: "./../img/TitleGif.gif" },
    ];
      
    const [showModal, setShowModal] = useState(false);
    const [selectedNft, setSelectedNft] = useState();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [nfts, setNfts] = useState(initialNfts);
    const [displayConnectMessage, setDisplayConnectMessage] = useState("flex");
    const [message1, setMessage1] = useState("");
    const [message2, setMessage2] = useState("");
    const [owners, setOwners] = useState([]);
    const [nonRepeteatedOwners, setNonRepeteatedOwners] = useState([]);
    const [mounted, setMounted] = useState(true);

    const { Moralis, isInitialized } = useMoralis();
    if (!isInitialized) {
        Moralis.start({
        appId: process.env.REACT_APP_MORALIS_ID,
        serverUrl: process.env.REACT_APP_MORALIS_SERVER
      });
    }

    const timer = ms => new Promise(res => setTimeout(res, ms));

    // Contract and tokens
    const provider = new InfuraProvider(NETWORK, INFURA_ID);
    let nftCollection;
    let ids;
    /*const seaport  = new OpenSeaPort(provider, {
      networkName: Network.Main//,
      //apiKey: YOUR_API_KEY
    });*/
    if (collection === "TPCP") {
      nftCollection = new Contract(addresses.puppies, abis.erc1155, provider);
      ids = puppiesTokens;
    } else if (collection === "TMG") {
      nftCollection = new Contract(addresses.moegirls, abis.erc1155, provider);
      ids = moegirlsTokens;
    }
    let numberOfNfts = ids.length;

    useEffect(() => {

      async function getNfts({ account }) {
        if (account !== "") {
            let accounts = Array(numberOfNfts).fill(account);
            let copies = await nftCollection.balanceOfBatch(accounts, ids);
        
            let tempArray = [];
            for (let i = 0; i < numberOfNfts; i++) {
              let baseURI = await nftCollection.uri(ids[i]);
              let tokenURI = baseURI;
              let metadata;
              if (!baseURI.includes("https")) { // Frozen metadata in IPFS
                tokenURI = "https://" + baseURI.replace("ipfs://", "ipfs.io/ipfs/");
                metadata = await getMetadataFromIpfs(tokenURI);
                let image_url = metadata.image_url;
                metadata.image_url = "https://" + (image_url).replace("ipfs://", "ipfs.io/ipfs/");
                await timer(25);
              } else { // Metadata stored by OpenSea
                /*var url = "https://reqbin.com/ehttps://api.opensea.io/api/v1/asset/" + 
                          "0x2953399124F0cBB46d2CbACD8A89cF0599974963" + "/" + 
                          ids[i] + "/";
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.onreadystatechange = function () {
                  if (xhr.readyState === 4) {
                    metadata = xhr.responseText;
                    const asset = {
                    tokenAddress: "0x2953399124F0cBB46d2CbACD8A89cF0599974963",
                    tokenId: ids[i]
                    };
                    metadata.copies = await seaport.getAssetBalance({
                      account,
                      asset
                    });
                  }};
                xhr.send();*/
                // Waiting for OpenSea API for Polygon assets. In the meantime, insert the data:
                metadata = {};
                metadata.image_url = "https://www.mycutepixel-nft.com/reiko.png";
                metadata.name = "Reiko-chan";
                metadata.description = "H! We are the Reiko-chan septuplets and we are Moe Girl #1. " + 
                "Our mom called us by the same name because she loves us all the same! We are calm, " +
                "peaceful (thank goodness, because if we weren't, we would have driven our mom crazy) " +
                "and we like to have tea with cookies surrounded by puppies." +
                "A heartfelt thank you to everyone who bought a Pixel Crypto Puppy and gave them a home! ♡";
                metadata.properties = [
                  {"trait_type": "Name", "value": "Buru-chan"}, 
                  {"trait_type": "Quote", "value": "Bullish"}, 
                  {"trait_type": "Personality trait #1", "value": "Bullish"}, 
                  {"trait_type": "Personality trait #2", "value": "Optimistic"}, 
                  {"trait_type": "Personality trait #3", "value": "Stingy"}, 
                  {"trait_type": "Favorite app", "value": "Stocktwits"}, 
                  {"trait_type": "Rivalry", "value": "Kuma-chan"}
                ];
              }
              metadata.copies = copies[i];
              metadata.symbol = collection;
              tempArray.push(metadata);
            }
            setNfts(tempArray);
            setDisplayConnectMessage("none");
        }
      }

      if (displayConnectMessage === "flex") {
        if (collection === "TPCP") {
          setMessage1("puppies");
          setMessage2("animated puppies");
        } else if (collection === "TMG") {
          setMessage1("girls");
          setMessage2("pixel art girls");
        }

        getNfts(account);
      }

    }, [account, collection, ids, nftCollection, numberOfNfts, displayConnectMessage]);

    useEffect(() => {

      async function getNftOwners() {
        let collectionAddr;
        let ids;
        if (collection === "TPCP") {
          collectionAddr = addresses.puppies;
          ids = puppiesTokens;
        } else if (collection === "TMG") {
          collectionAddr = addresses.moegirls;
          ids = moegirlsTokens;
        }
        const options = { 
          address: collectionAddr, 
          token_id: "", 
          chain: NETWORK };
        
        for (let i = 0; i < ids.length; i++) {
            options.token_id = ids[i];
            const tokenIdOwners = await Moralis.Web3API.token.getTokenIdOwners(options);
            const ownersNumber = tokenIdOwners.result.length;
            if (ownersNumber > 0) {
              if (ownersNumber === 1) {
                setOwners(owners => [...owners, tokenIdOwners.result[0].owner_of]);
              } else {
                setOwners(owners => [...owners, tokenIdOwners.result.map(a => a.owner_of)]);
              }
            } else {
              setOwners(owners => [...owners, ""]);
            }
            await timer(900);
        }
      }
    
      function determineNonRepeatedOwners(owners) {
        let temp = [];
        owners.forEach(nftOwners => {
          if (nftOwners instanceof Array) {
            nftOwners.forEach(owner => {
              temp.push(owner);
            });
          } else {
            temp.push(nftOwners);
          }
        });
        setNonRepeteatedOwners([...new Set(temp)]);
      }
             
      if (owners.length === 0 && mounted) {
        setMounted(false);
        getNftOwners();
      }

      determineNonRepeatedOwners(owners);

    }, [collection, ids, mounted, owners, Moralis.Web3API.token]);

    async function getMetadataFromIpfs(tokenURI) {
        let metadata = await axios.get(tokenURI);
        return metadata.data;
    }

    function toggleModal(i) {
      if (i >= 0) {
          setSelectedNft(nfts[i]);
          setSelectedIndex(i);
      }
      setShowModal(!showModal);
    }

    return (
        <Parent>
            <Container>
                <Subtitle> 
                    The cutest {message2} in the metaverse! 
                </Subtitle>
                <div style={{"width":"100%", "position":"relative"}}>
                    <Overlay display={displayConnectMessage}>
                        <Connect>
                            <Flash forever={true} duration={6000}>
                                <p style={{"textAlign":"center"}}>
                                    Connect your wallet to see the {message1}!
                                    <br />
                                    <br />
                                    If you already have, wait a few seconds till we retrieve the data.
                                </p>
                            </Flash>
                        </Connect>
                    </Overlay>
                    <Grid>
                        {
                            nfts.map((nft, i) =>
                                <NFTCard nft={nft} key={i} toggleModal={() => toggleModal(i)} />
                            )
                        }
                    </Grid>
                </div>
                <div style={{"width":"100%", "margin":"40px 12px 0 12px"}}>
                    There currently are {nonRepeteatedOwners.length} holders of this collection:
                </div>
                <Carousel style={{"width":"110%", "margin":"20px 0 0 0"}}>
                    {
                        nonRepeteatedOwners.map((nftOwners, j) =>
                            <Carousel.Item interval={1000} key={j}>
                                <InsideCarrousel style={{"marginBottom":"2.5rem"}}>
                                    {nftOwners.substring(0, 2)} <br/> {nftOwners.substring(2)} <br/>
                                </InsideCarrousel>
                            </Carousel.Item>
                        )
                    }
                </Carousel>
            </Container>
            {
                showModal &&
                <NFTModal
                    nft={selectedNft}
                    toggleModal={() => toggleModal()}
                    collection={collection}
                    owner={owners[selectedIndex]}
                    account={account}
                />
            }
        </Parent>
    );
}

const Parent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 1200px;
  margin: 40px 10px 30px 10px;
`;

const Subtitle = styled.h4`
  color: #b3e3e3;
  text-align: center;
  margin: 0 0 2.3rem 0;
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

const Overlay = styled.div`
  position: absolute;
  display: ${(props) => (props.display)};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  @media(max-width: 1200px) {
    align-items: start;
  }
`;

const Connect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.2);
  padding: 5px 10px;
  @media(max-width: 1200px) {
    margin-top: 20%;
  }
`;

const InsideCarrousel = styled.div`
  text-align: center;
  @media(max-width: 920px) {
    font-size: 15px;
  }
  @media(max-width: 620px) {
    font-size: 11px;
  }
`;

export default NFTVisualizer;
