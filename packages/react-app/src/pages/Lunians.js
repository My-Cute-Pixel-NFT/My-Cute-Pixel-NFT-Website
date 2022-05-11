import { React, useState, useEffect, useLayoutEffect } from "react";
import ReactTooltip from 'react-tooltip';
import styled, { keyframes } from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Select from 'react-select';
import SpinStretch from "react-cssfx-loading/lib/SpinStretch";
import { FaCheck } from "react-icons/fa";

import { Contract } from "@ethersproject/contracts";
import { InfuraProvider, Web3Provider } from "@ethersproject/providers";
import "@ethersproject/bignumber";
import { addresses, abis, seedpodIds } from "@project/contracts";

import { Image } from "./../components/index";
import MediumCard from "./../components/flipCard";
import { StyledCollection, Heading, Content, Paragraph } from 
"./../components/collectionPagesComponents";

import luniansLogo from "./../img/LuniansLogo.png";
import banner from "./../img/SpaceBackground200.png";
import lunia from "./../img/Lunia.gif";
import poofpoof from "./../img/Poof-Poof.gif";
//import animatedlunianseedpod from "./../img/AnimatedLunianSeedpod.gif";
import blackhole from "./../img/BlackHole.jpg";
import lunianseedpodback from "./../img/LunianSeedpodBack.png";
import nebulaseedpodback from "./../img/NebulaSeedpod.png";
import hatchingSeedpods from "./../img/HatchingSeedpods.png";
import hatchingSeedpodsVert from "./../img/HatchingSeedpodsVert.png";
import twoseedpods from "./../img/TwoSeedpods.gif";
import questionmark from "./../img/Question.gif";
import loading from "./../img/Loading.gif";

const toolTipCredits = "Planet and background created using Deep-Fold's <br/> Planet and Space generators";
const abstract1 = "\"A riveting tale about forces of cosmic proportions\".";
const abstract2 = "\"A planet full of mysteries and strange creatures\".";
const abstract3 = "\"A wondrous device (or seed?) with a secret inside\".";
const abstract4 = "\"Creatures made of an unknown form of energy\".";
const abstract5 = "\"Seedpods with dark energy and matter attached\".";
const link1 = "https://mycutepixel-nft.medium.com/origins-2ff7364458aa";
const link2 = "https://mycutepixel-nft.medium.com/lunia-fca028acc38a";
const link3 = "https://mycutepixel-nft.medium.com/lunian-seedpod-9274a9ef2867";
const link4 = "https://mycutepixel-nft.medium.com/poof-poofs-3a663dc614b0";
const link5 = "https://mycutepixel-nft.medium.com/nebula-seedpod-a375bfcdcd35";
const initMintedLunian = questionmark;

const waitText1a = "Waking up your Lunian";
const waitText1b = "This process will take a while...";
const waitText2a = "Seedpod fully powered up";
const waitText2b = "Increasing levels of oxigen...";
const waitText3a = "Response to reanimation detected";
const waitText3b = "Depresurizing the seedpod...";
const waitText4a = "Vital signs back to normal ranges";
const waitText4b = "Opening the seedpod's hatch...";
const updateTexta = "Phase completed";
const updateTextb = "Getting status update...";
const resultText1a = "Congratulations, you got a lunian!";
const resultText1b = "Please take good care of it.";

// INFURA
const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const NETWORK = process.env.REACT_APP_NETWORK_TEST;

const stampLunian1 = {
    "position": "absolute",
    "top": "0",
    "left": "25%",
    "transform": "translate(-50%, 0)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)"
};

const stampLunian1Vert = {
    "position": "absolute",
    "top": "0",
    "left": "25%",
    "transform": "translate(-50%, 0)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)",
    "fontSize":"small"
};

const stampLunian2 = {
    "position": "absolute",
    "bottom": "0",
    "left": "25%",
    "transform": "translate(-50%, 25%)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)"
};

const stampLunian2Vert = {
    "position": "absolute",
    "top": "0",
    "right": "25%",
    "transform": "translate(50%, -15%)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)",
    "fontSize":"small"
};

const stampNebula1 = {
    "position": "absolute",
    "top": "0",
    "right": "25%",
    "transform": "translate(50%, 0)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)"
};

const stampNebula1Vert = {
    "position": "absolute",
    "bottom": "0",
    "left": "25%",
    "transform": "translate(-50%, 0)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)",
    "fontSize":"small"
};

const stampNebula2 = {
    "position": "absolute",
    "bottom": "0",
    "right": "25%",
    "transform": "translate(50%, 25%)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)"
};

const stampNebula2Vert = {
    "position": "absolute",
    "bottom": "0",
    "right": "25%",
    "transform": "translate(50%, 25%)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)",
    "fontSize":"small"
};

const Lunians = ({ account, refreshInventory, setRefreshInventory }) => {
    const initDropdownTitle = "Select seedpod";
    const initBackColor = "#f0a5ad";

    const [dropdownTitle, setDropdownTitle] = useState(initDropdownTitle);
    const [disableSeedpodSelector, setDisableSeedpodSelector] = useState(false);
    const [backColor, setBackColor] = useState(initBackColor);
    const [disableHatchButt, setDisableHatchButt] = useState(true);
    const [selectedSeedpod, setSelectedSeedpod] = useState(twoseedpods);
    const [mintedLunian, setMintedLunian] = useState(initMintedLunian);
    const [showModal, setShowModal] = useState(false);
    const [nSeedpods, setNSeedpods] = useState(0);
    const [nSeedpodsArr, setNSeedpodsArr] = useState([]);
    const [seedpodType, setSeedpodType] = useState("Lunian seedpods");
    const [visible1, setVisible1] = useState("hidden");
    const [visible2, setVisible2] = useState("hidden");
    const [seedpodsToMint, setSeedpodsToMint] = useState(null);
    const [lunianIds, setLunianIds] = useState([]);
    const [textA, setTextA] = useState(waitText1a);
    const [textB, setTextB] = useState(waitText1b);
    const [spin, setSpin] = useState("true");
    const [changeLunian, setChangeLunian] = useState("hidden");
    const [currentLunianIndex, setCurrentLunianIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [hatchingSeedpodsImg, setHatchingSeedpodsImg] = useState(hatchingSeedpods);
    const [stampLunian1CSS, setStampLunian1CSS] = useState(stampLunian1);
    const [stampLunian2CSS, setStampLunian2CSS] = useState(stampLunian2);
    const [stampNebula1CSS, setStampNebula1CSS] = useState(stampNebula1);
    const [stampNebula2CSS, setStampNebula2CSS] = useState(stampNebula2);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const provider = new InfuraProvider(NETWORK, INFURA_ID);
    let luniansCollection = new Contract(addresses.lunians, abis.lunians.abi, provider);

    function initialize() {
        setVisible1("hidden");
        setDropdownTitle("Select a seedpod");
        setDropdownTitle(initDropdownTitle);
        setBackColor(initBackColor);
        setDisableHatchButt(true);
        setNSeedpods(0);
        setChangeLunian("hidden");
        setLunianIds([]);
    }

    async function selectSeedpod(type) {
        setVisible2("hidden");
        if (account !== "") {
            let s1, s2, s3, s4, i1;
            if (type === "Lunian") {
                s1 = "Lunian seedpod";
                s2 = "#269485";
                s3 = "lunian seedpod";
                s4 = "lunian seedpods";
                i1 = 1;
            } else {
                s1 = "Nebula seedpod";
                s2 = "#8173ff";
                s3 = "nebula seedpod";
                s4 = "nebula seedpods";
                i1 = 0;
            }
            try {
                setDropdownTitle(s1);
                setBackColor(s2);
                setMintedLunian(initMintedLunian);
                let n = await luniansCollection.balanceOf(account, seedpodIds[i1]);
                n = n.toNumber();
                setNSeedpods(n);
                if (n === 1) setSeedpodType(s3);
                else setSeedpodType(s4);
                if (n > 0) {
                    setVisible1("visible");
                }
                setNSeedpodsArr([]);
                for (let i = 1; i <= n; i++) {
                    setNSeedpodsArr(nSeedpodsArr => [...nSeedpodsArr, {label:i.toString(), value:i.toString()}]);
                }
            } catch (error) {
                console.log(error);
            }
        }  else {
            setNSeedpods(-1);
            setVisible1("visible");
        }
    }

    async function hatch(_seedpodId) {
        const chainId = 80001; // 137 for Polygon mainnet
        if (typeof(window.ethereum) !== 'undefined') {
            try {
                let web3Provider = new Web3Provider(window.ethereum, chainId);
                const currentChainId = await web3Provider.getNetwork();
                if (currentChainId.chainId === chainId) {
                    setMintedLunian(loading);
                    setVisible2("visible");
                    const signer = web3Provider.getSigner();
                    let luniansCollectionWeb3 = new Contract(addresses.lunians, abis.lunians.abi, signer);
                    await luniansCollectionWeb3.mintLunian(parseInt(_seedpodId), seedpodsToMint.value);
                    luniansCollection.on("DiceRolled", (_requestId, _address) => {
                        setTimeout(function () {
                            setTextA(waitText2a);
                            setTextB(waitText2b);
                        }, 10000);
                        setTimeout(function () {
                            setTextA(updateTexta);
                            setTextB(updateTextb);
                        }, 20000);
                        setTimeout(function () {
                            setTextA(waitText3a);
                            setTextB(waitText3b);
                        }, 28000);
                        setTimeout(function () {
                            setTextA(updateTexta);
                            setTextB(updateTextb);
                        }, 38000);
                        setTimeout(function () {
                            setTextA(waitText4a);
                            setTextB(waitText4b);
                        }, 46000);
                    });
                    let counter = 0;
                    luniansCollection.on("LunianMinted", (_owner, _lunianId) => {
                        if (_owner === account) {
                            counter++;
                            setLunianIds(lunianIds => [...lunianIds, _lunianId]);
                            if (counter < 2) {
                                setMintedLunian("https://ipfs.io/ipfs/QmQfsudvCAmFWLzDfNrf4wWozPdjNvzmwpnuU11d8cpzcK/" + 
                                                _lunianId.toNumber() + ".png");
                                setDisableSeedpodSelector(false);
                                setRefreshInventory(!refreshInventory);
                                setTimeout(function () {
                                    setSpin("hidden");
                                    setTextA(resultText1a);
                                    setTextB(resultText1b);
                                }, 750);
                            } else {
                                setChangeLunian("visible");
                            }
                        }
                    });
                    setTimeout(handleShowModal, 10000);
                } else {
                    setDisableSeedpodSelector(false);
                    alert("Wrong network. Please switch to Polygon.");
                }
            } catch (e) {
                setDisableSeedpodSelector(false);
                alert("Wrong network. Please switch to Polygon.")
            }
        } else {
            setDisableSeedpodSelector(false);
            alert("You need Metamask to sign the transaction and hatch your seedpod!");
        }
    }

    function hatchSeedpod() {
        initialize();
        setDisableSeedpodSelector(true);
        let seedpodId = 0;
        if (selectedSeedpod === lunianseedpodback) seedpodId = seedpodIds[1];
        else if (selectedSeedpod === nebulaseedpodback) seedpodId = seedpodIds[0];
        hatch(seedpodId);
    }

    function previous() {
        if (currentLunianIndex > 0) {
            setCurrentLunianIndex(currentLunianIndex - 1);
        } else {
            setCurrentLunianIndex(lunianIds.length - 1);
        }
        setMounted(true);
    }

    function next() {
        if (currentLunianIndex < lunianIds.length - 1) {
            setCurrentLunianIndex(currentLunianIndex + 1);
        } else {
            setCurrentLunianIndex(0);
        }
        setMounted(true);
    }

    useEffect(() => {
        if (dropdownTitle === "Lunian seedpod") setSelectedSeedpod(lunianseedpodback);
        else if (dropdownTitle === "Nebula seedpod") setSelectedSeedpod(nebulaseedpodback);
        else setSelectedSeedpod(twoseedpods);
        if (seedpodsToMint !== null) setDisableHatchButt(false);
    }, [dropdownTitle, seedpodsToMint]);

    useEffect(() => {
        initialize();
        setVisible2("hidden");
    }, [account]);

    useEffect(() => {
        if (mounted) {
            setMintedLunian("https://ipfs.io/ipfs/QmQfsudvCAmFWLzDfNrf4wWozPdjNvzmwpnuU11d8cpzcK/" + 
                lunianIds[currentLunianIndex] + ".png");
        }
        setMounted(false);
    }, [currentLunianIndex, mounted, lunianIds]);

    useLayoutEffect(() => {
        const updateImage = () => {
          if (window.innerWidth > 700) {
              setHatchingSeedpodsImg(hatchingSeedpods);
              setStampLunian1CSS(stampLunian1);
              setStampLunian2CSS(stampLunian2);
              setStampNebula1CSS(stampNebula1);
              setStampNebula2CSS(stampNebula2);
          } else {
              setHatchingSeedpodsImg(hatchingSeedpodsVert);
              setStampLunian1CSS(stampLunian1Vert);
              setStampLunian2CSS(stampLunian2Vert);
              setStampNebula1CSS(stampNebula1Vert);
              setStampNebula2CSS(stampNebula2Vert);
          }
        };
        window.addEventListener("resize", updateImage);
        updateImage();
        return () => window.removeEventListener("resize", updateImage);
    }, []);

    return (
        <StyledCollection>
            <div style={{"display":"flex", "flexDirection":"row", "justifyContent":"space-evenly"}}>
                <Image src={luniansLogo} alt="lunians-logo" style={{"height":"20vmin", "margin":"0",
                    "alignSelf":"flex-end", "transform":"rotate(-12deg)"}} />
                <Heading>Lunians</Heading>
                <Image src={luniansLogo} alt="lunians-logo" style={{"height":"20vmin", "margin":"0",
                    "alignSelf":"flex-end", "transform":"rotate(12deg)"}} />
            </div>
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

                <Reasons>
                    <Top>
                        KEY FEATURES
                    </Top>
                    <Card>
                        <Fade bottom cascade>
                            <HoloLetters style={{"color":"rgba(133,255,243,0.6)"}}>
                                Awesome pixel art
                            </HoloLetters>
                            <HoloLetters style={{"color":"rgba(133,255,243,0.55)"}}>
                                Advanced smart contracts
                            </HoloLetters>
                            <HoloLetters style={{"color":"rgba(133,255,243,0.6)"}}>
                                Doxxed team
                            </HoloLetters>
                            <HoloLetters style={{"color":"rgba(133,255,243,0.65)"}}>
                                Innovative use of oracles
                            </HoloLetters>
                            <HoloLetters style={{"color":"rgba(133,255,243,0.7)"}}>
                                Web3 website
                            </HoloLetters>
                            <HoloLetters style={{"color":"rgba(133,255,243,0.75)"}}>
                                NFT random rarities
                            </HoloLetters>
                            <HoloLetters style={{"color":"rgba(133,255,243,0.8)"}}>
                                Great roadmap
                            </HoloLetters>
                            <HoloLetters style={{"color":"rgba(133,255,243,0.85)"}}>
                                Interesting lore
                            </HoloLetters>
                            <HoloLetters style={{"color":"rgba(133,255,243,0.9)", "fontWeight":"bold"}}>
                                More to be unveiled
                            </HoloLetters>
                        </Fade>
                    </Card>
                    <Holo className="Holo" />
                </Reasons>

                <Reasons>
                    <Top>
                        OTHER ADVANTAGES
                    </Top>
                    <Paragraph style={{"textAlign":"center", "width":"100%"}}>
                        <Fade top cascade>
                            <div>
                                <p>
                                    <FaCheck style={{"margin":"0 2% 8px 2%", "color":"rgba(133,255,243,1)"}}/> 
                                    Hatched in Polygon - Barely no gas fees
                                </p>
                            </div>
                            <div>
                                <p>
                                    <FaCheck style={{"margin":"0 2% 8px 2%", "color":"rgba(133,255,243,1)"}}/> 
                                    Holders own the image rights of their NFTs
                                </p>
                            </div>
                            <div>
                                <p>
                                    <FaCheck style={{"margin":"0 2% 8px 2%", "color":"rgba(133,255,243,1)"}}/> 
                                    Decentralized hosting of metadata through ipfs
                                </p>
                            </div>
                            <div>
                                <p>
                                    <FaCheck style={{"margin":"0 2% 8px 2%", "color":"rgba(133,255,243,1)"}}/> 
                                    Utility - Advantages, rewards and perks while holding an NFT
                                </p>
                            </div>
                            <div>
                                <p>
                                    <FaCheck style={{"margin":"0 2% 8px 2%", "color":"rgba(133,255,243,1)"}}/> 
                                    Frozen metadata - Your NFTs' linked metadata will NEVER change
                                </p>
                            </div>
                        </Fade>
                    </Paragraph>
                </Reasons>

                <Lore>
                    <div style={{"display":"flex", "justifyContent":"space-between", "width":"100%"}}>
                        <div style={{"borderTop":"groove rgb(179, 227, 227)", "flex":"0 1 35%"}}/>
                        <Top>
                            DISCOVER MORE
                        </Top>
                        <div style={{"borderTop":"groove rgb(179, 227, 227)", "flex":"0 1 35%"}}/>
                    </div>
                    <Grid>
                        <Flip left delay={250}>
                            <MediumCard frontImage={blackhole} frontTitle="Origins" backText={abstract1} link={link1} />
                        </Flip>
                        <Flip left delay={500}>
                            <MediumCard frontImage={lunia} frontTitle="Lunia" backText={abstract2} link={link2}/>
                        </Flip>
                        <Flip left delay={750}>
                            <MediumCard frontImage={lunianseedpodback} frontTitle="Lunian Seedpods" backText={abstract3} link={link3}/>
                        </Flip>
                        <Flip left delay={1000}>
                            <MediumCard frontImage={poofpoof} frontTitle="Poof-poofs" backText={abstract4} link={link4}/>
                        </Flip>
                        <Flip left delay={1250}>
                            <MediumCard frontImage={nebulaseedpodback} frontTitle="Nebula Seedpods" backText={abstract5} link={link5}/>
                        </Flip>
                    </Grid>
                </Lore>

                <Hatching>
                    <Top>
                        HATCH YOUR SEEDPODS
                    </Top>
                    <Paragraph>
                        Hatch your seedpods here when planet Lunia has unveiled "all" its mysteries, and 
                        get a fantastic and enigmatic creature with random rarities.
                    </Paragraph>
                    <Zoom top>
                        <div>
                            <Image src={hatchingSeedpodsImg} alt="Hatching Seedpods" style={imgStyleHatchingSeedpods} />
                            <div style={stampLunian1CSS}>
                                Lunian<br/>seedpods
                            </div>
                            <div style={stampLunian2CSS}>
                                Common<br/>&<br/>cheaper
                            </div>
                            <div style={stampNebula1CSS}>
                                Nebula<br/>seedpods
                            </div>
                            <div style={stampNebula2CSS}>
                                Higher rarities<br/>&<br/>limited
                            </div>
                        </div>
                    </Zoom>
                </Hatching>

                {/*<Hatching>
                    <Top style={{"fontSize":"2.5rem"}}>
                        HATCH YOUR SEEDPODS
                    </Top>
                    <Work>
                        <Seedpods>
                            <Dropdown>
                                <Dropdown.Toggle size="lg" disabled={disableSeedpodSelector} style={{"backgroundColor":backColor}}>
                                    {dropdownTitle}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item style={{"fontSize":"1.2rem"}} onClick={() => selectSeedpod('Lunian')}>
                                        Lunian seedpod
                                    </Dropdown.Item>
                                    <Dropdown.Item style={{"fontSize":"1.2rem"}} onClick={() => selectSeedpod('Nebula')}>
                                        Nebula seedpod
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Image src={selectedSeedpod} alt="Selected Seedpod" style={imgStyle} />
                            <div style={{"marginBottom":"12px", "display":"flex", "flexDirection":"column", "visibility":visible1}}>
                                <div>
                                    {account !== "" && <p>You have <span style={{"color":backColor}}>{nSeedpods}</span> {seedpodType}.</p>}
                                    {nSeedpods>0 && <p>How many do you want to hatch?</p>}
                                    {account !== "" && nSeedpods===0 && 
                                        <p>
                                            <a href="https://opensea.io/">
                                                Get one in OpenSea now!
                                            </a>
                                        </p>}
                                    {account === "" && <p>Wallet not connected.</p>}
                                    {account === "" && <p>Connect to see your seedpods.</p>}
                                </div>
                                <div style ={{"display":"flex", "justifyContent":"center", "alignItems":"stretch"}}>
                                    <Select defaultValue={seedpodsToMint} onChange={setSeedpodsToMint} options={nSeedpodsArr} styles={selectStyles} theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary: backColor,
                                                primary25: backColor
                                            },
                                    })}/>
                                    <Button disabled={disableHatchButt} onClick={hatchSeedpod} style={{"backgroundColor":backColor, "marginLeft":"10px", "fontSize":"1.25rem", "fontWeight":"bold", "zIndex":"9999"}}>
                                        Hatch!
                                    </Button>
                                </div>
                            </div>
                        </Seedpods>
                        <Minted>
                            <Dropdown style={{"visibility":"hidden"}}>
                                <Dropdown.Toggle size="lg" id="dropdown-basic-2">
                                    Empty
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item style={{"fontSize":"1.2rem"}} >
                                        Empty
                                    </Dropdown.Item>
                                    <Dropdown.Item style={{"fontSize":"1.2rem"}} >
                                        Empty
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Image src={mintedLunian} alt="Minted Lunian" style={imgStyle} />
                            <div style={{"marginBottom":"12px", "marginLeft":"-3rem", "display":"flex", "flexDirection":"row", "visibility":visible2}}>
                                <SpinStretch color="#f0a5ad" height="50%" style={{"marginRight":"0.5em", "visibility":spin}}/>
                                <div style={{"display":"flex", "flexDirection":"column"}}>
                                    <p>{textA}</p>
                                    <p>{textB}</p>
                                    <div style ={{"display":"grid", "gridTemplateColumns":"1fr 1fr", "columnGap":"10%", "justifyItems":"stretch"}}>
                                        <Button onClick={previous} style={{"visibility":changeLunian, "backgroundColor":backColor, "marginLeft":"10px", "fontSize":"1.25rem", "fontWeight":"bold", "zIndex":"9999"}}>
                                            {"<"} Previous
                                        </Button>
                                        <Button onClick={next} style={{"visibility":changeLunian, "backgroundColor":backColor, "marginLeft":"10px", "fontSize":"1.25rem", "fontWeight":"bold", "zIndex":"9999"}}>
                                            Next {">"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Minted>
                    </Work>
                </Hatching>*/}

                <Image src={questionmark} alt="seedpods-hatching" style={{"alignSelf":"center", 
                    "marginBottom":"0", "marginTop":"0"}} />

                <Coming>More coming soon!</Coming>

                <Modal show={showModal} onHide={handleCloseModal} style={{"fontFamily":
                    "'Minecraftia', sans-serif"}}>
                    <Modal.Header closeButton style={{"backgroundColor":"#f0a5ad", "color":"#e8f8f8"}}>
                        <Modal.Title>Seedpod hatching</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{"backgroundColor":"#8b6cb5", "color":"white"}}>
                        <p>
                            Seedpods have been inactive for millions of years and the Lunians inside need 
                            time to safely return from their long hybernation. 
                        </p>
                        <p>
                            Please wait while the process is completed. Once it is, you will receive your 
                            Lunian in your wallet address and you will get to see it in this page.
                        </p>
                    </Modal.Body>
                    <Modal.Footer style={{"backgroundColor":"#f0a5ad"}}>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Got it!
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Content>
        </StyledCollection>
    )
}

export default Lunians;

const SpaceBackground = styled.div`
    width: 105.3%;
    margin: 0.5rem 0 0 -2.7%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: justify;
`;

const Reasons = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 2.5rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const holo_color = "0, 252, 252";
const width = "350px";
const height = "8px";
const widthCard = "680px";

const float = keyframes`
    from {
        will-change: unset;
        transform: translateY(-10px)
    } to {
        will-change: transform;
        transform: translateY(-30px)
    }
`;

const holographic = keyframes`
    from {
        will-change: box-shadow;
        box-shadow:
        0 -100px 5px rgba(${holo_color}, .15),
        0 -1.25px 2px rgba(${holo_color}, .5),
        0 -53px 5px rgba(${holo_color}, .15),
        0 -2px 3px rgba(${holo_color}, .5),
        0 -3px 4px rgba(${holo_color}, .5),
        0 -4px 6px rgba(${holo_color}, .5),
        0 -5px 10px rgba(${holo_color}, .75),
        0 -7px 20px rgba(${holo_color}, .75),
        0 -10px 30px rgba(${holo_color}, .75),
        0 -15px 40px rgba(${holo_color}, .75),
        0 -25px 50px rgba(${holo_color}, .75),
        0 -35px 60px rgba(${holo_color}, .85),
        0 -53px 70px rgba(${holo_color}, .95),
        0 -75px 80px rgba(${holo_color}, 1),
        0 -100px 90px rgba(${holo_color}, 1);
    } to {
        will-change: unset;
        box-shadow:
        0 -1px 5px rgba(${holo_color}, .15),
        0 -1px 2px rgba(${holo_color}, .5),
        0 -1px 5px rgba(${holo_color}, .15),
        0 -2px 3px rgba(${holo_color}, .5),
        0 -3px 4px rgba(${holo_color}, .5),
        0 -4px 6px rgba(${holo_color}, .5),
        0 -5px 7px rgba(${holo_color}, .75),
        0 -7px 10px rgba(${holo_color}, .75),
        0 -10px 15px rgba(${holo_color}, .75),
        0 -15px 20px rgba(${holo_color}, .75),
        0 -25px 25px rgba(${holo_color}, .75),
        0 -35px 30px rgba(${holo_color}, .85),
        0 -53px 35px rgba(${holo_color}, .95),
        0 -75px 40px rgba(${holo_color}, 1),
        0 -100px 50px rgba(${holo_color}, 1);
    }
`;

const Card = styled.div`
    margin-top: 3rem;
    position: relative;
    width: ${widthCard};
    max-width: 100%;
    height: 88%;
    background-size: contain;
    background-repeat: no-repeat;
    animation: ${float} 1s infinite alternate;
    .Holo {
        position: absolute;
        bottom: 0;
    }
`;

const HoloLetters = styled.p`
    font-family: Holo-Jacket Title;
    font-size: 150%;
    margin: -1% 0;
`;

const Holo = styled.div`
    position: relative;
    z-index: 2;
    width: ${width};
    max-width: 80%;
    height: ${height};
    margin: 0 auto 0;
    background-color: rgba(${holo_color}, .35);
    border-radius: 100%;
    filter: blur(2.5px);
    transform: perspective(100px) rotateX(-30deg);
    transform-style: preserve-3d;
    animation: ${holographic} 1.5s infinite alternate;
    backface-visibility: hidden;
    
    &:after {
        position: absolute;
        left: -10px;
        right: -10px;
        content: "";
        height: 10px;
        background-color: rgba(${holo_color}, .5);
        border-radius: 100%;
        filter: blur(2.5px);
    }
    
    + .Holo {
        animation-duration: .75s;
        opacity: .5;
    }
`;

const Lore = styled.div`
    width: 100%;
    position: relative;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-style: groove;
    border-color: rgb(179, 227, 227);
    border-top: transparent;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const Top = styled.div`
    margin-top: -1.3rem;
    width: fit-content;
    padding: 0 0.8rem 0 0.8rem;
    font-family: Tiny BoxBitA10, sans-serif;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 20px;
    column-gap: 10px;
    justify-items: stretch;
    padding: 1rem 2rem 0.5rem 2rem;

    @media(max-width: 1475px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media(max-width: 1120px) {
        grid-template-columns: 1fr 1fr;
        padding: 1rem 1rem 0.5rem 1rem;
    }
    @media(max-width: 770px) {
        grid-template-columns: 1fr;
        padding: 1rem 0.5rem 0.5rem 0.5rem;
    }
`;

const Work = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 50px;
    justify-items: center;
    margin-top: 1.4rem;

    @media(max-width: 970px) {
        grid-template-columns: 1fr;
        margin-bottom: -5rem;
    }
`;

const Seedpods = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
`;

const Minted = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    
    @media(max-width: 715px) {
        margin-top: -3.5rem;
    }
`;

const Hatching = styled.div`
    width: 100%;
    position: relative;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const imgStyleHatchingSeedpods = {
    "color":"#41403E",
    "alignSelf":"center", 
    "marginTop":"1.5rem",
    "transition":"all .5s ease",
    "fontSize":"2rem",
    "letterSpacing":"1px",
    "outline":"none",
    "width":"100%",
    "height":"auto",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 7px rgb(179,227,227)",
    '@media(maxWidth: 970px)': {
        width: '100%',
      },
};

const imgStyle = {
    "color":"#41403E",
    "alignSelf":"center", 
    "marginTop":"1.5rem",
    "transition":"all .5s ease",
    "fontSize":"2rem",
    "letterSpacing":"1px",
    "outline":"none",
    "width":"68%",
    "height":"auto",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 7px rgb(179,227,227)",
    '@media(maxWidth: 970px)': {
        width: '100%',
      },
};

const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'violet' : 'darkgray',
      padding: 2
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      const color = 'violet';
  
      return { ...provided, opacity, transition, color };
    }
};

const Coming = styled.div`
    text-align: center;
    width: 100%;
    color: rgb(179, 227, 227);
    font-family: 'Tiny BoxBitA10', sans-serif;
    font-size: clamp(1.25rem, 2vw, 3vw);
`;