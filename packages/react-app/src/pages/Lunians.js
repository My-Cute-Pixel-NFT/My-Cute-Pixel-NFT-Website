import { React, useState, useEffect, useLayoutEffect } from "react";
import ReactTooltip from 'react-tooltip';
import styled, { keyframes } from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Flash from 'react-reveal/Flash';
import Select from 'react-select';
import SpinStretch from "react-cssfx-loading/lib/SpinStretch";
import { FaCheck } from "react-icons/fa";
import { BsDot } from "react-icons/bs";

import { Contract } from "@ethersproject/contracts";
import { InfuraProvider, Web3Provider } from "@ethersproject/providers";
import "@ethersproject/bignumber";
import { addresses, abis, seedpodIds } from "@project/contracts";

import { Image } from "./../components/index";
import MediumCard from "./../components/flipCard";
import { StyledCollection, Heading, Content, Paragraph } from 
"./../components/collectionPagesComponents";

import luniansLogo from "./../img/LuniansLogo.png";
import numberNFTs from "./../img/909.png";
import lunia from "./../img/Lunia.gif";
import poofpoof from "./../img/Poof-Poof.gif";
//import animatedlunianseedpod from "./../img/AnimatedLunianSeedpod.gif";
import blackhole from "./../img/BlackHole.jpg";
import lunianseedpodback from "./../img/LunianSeedpodBack.png";
import nebulaseedpodback from "./../img/NebulaSeedpod.png";
import roadmap from "./../img/Roadmap.gif";
import saleDate from "./../img/saleDate.png";
import lunianSample from "./../img/LunianSample.png";
import tease from "./../img/Tease.png";
import hatchingSeedpods from "./../img/HatchingSeedpods.png";
import hatchingSeedpodsVert from "./../img/HatchingSeedpodsVert.png";
import twoseedpods from "./../img/TwoSeedpods.gif";
import button from "./../img/Button.png";
import questionmark from "./../img/Question.gif";
import loading from "./../img/Loading.gif";
import roadmapBackground from "./../img/Roadmap/backgroundFrame.png";
import roadmapBlackhole from "./../img/Roadmap/blackhole.png";
import roadmapDiscord from "./../img/Roadmap/discord.png";
import roadmapOpenSeedpod from "./../img/Roadmap/openSeedpod.png";
import roadmapGoldSeedpod from "./../img/Roadmap/goldSeedpod.png";
import roadmapGift from "./../img/Roadmap/gift.png";
import roadmapADN from "./../img/Roadmap/ADN.png";
import roadmapAtom from "./../img/Roadmap/Atom.png";
import roadmapNetwork from "./../img/Roadmap/Network.png";
import roadmapStation from "./../img/Roadmap/spaceStation.png";
import roadmapSETI from "./../img/Roadmap/SETI.png";
import roadmapFrame from "./../img/Roadmap/frame.png";

const toolTipCredits = "Planet and background created using Deep-Fold's <br/> Planet and Space generators";
const abstract1 = "\"A riveting tale about forces of cosmic proportions\".";
const abstract2 = "\"A planet full of mysteries and strange creatures\".";
const abstract3 = "\"A wondrous device (or seed?) with a secret inside\".";
const abstract4 = "\"Creatures made of an unknown form of energy\".";
const abstract5 = "\"Seedpods with dark energy and matter attached\".";
const abstract6 = "\"The path that will take us from the Earth to Lunia\".";
const abstract7 = "\"Announcing the date when the seedpods sale starts!\".";
const abstract8 = "\"Learn the most important details about the lunians\".";
const link1 = "https://mycutepixel-nft.medium.com/origins-2ff7364458aa";
const link2 = "https://mycutepixel-nft.medium.com/lunia-fca028acc38a";
const link3 = "https://mycutepixel-nft.medium.com/lunian-seedpod-9274a9ef2867";
const link4 = "https://mycutepixel-nft.medium.com/poof-poofs-3a663dc614b0";
const link5 = "https://mycutepixel-nft.medium.com/nebula-seedpod-a375bfcdcd35";
const link6 = "https://mycutepixel-nft.medium.com/roadmap-e3470309b7db";
const link7 = "https://mycutepixel-nft.medium.com/start-sale-date-prices-and-hatching-d62b33886358";
const link8 = "https://mycutepixel-nft.medium.com/lunians-189d55d2da3f";
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
const baseLunianImgPath = "https://ipfs.io/ipfs/QmQfsudvCAmFWLzDfNrf4wWozPdjNvzmwpnuU11d8cpzcK/";

// INFURA
const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const test = false;
let NETWORK, chainId;
if (test) { // Mumbai
    NETWORK = process.env.REACT_APP_NETWORK_TEST;
    chainId = 80001;
} else { // Polygon
    NETWORK = process.env.REACT_APP_NETWORK;
    chainId = 137;
}

const stampLunian1 = {
    "position": "absolute",
    "top": "0",
    "left": "25%",
    "transform": "translate(-50%, -50%)",
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
    "transform": "translate(-50%, -15%)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)",
    "fontSize":"small"
};

const stampLunianPrice = {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "transform": "translate(5px, 12px)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)"
};

const stampLunianPriceVert = {
    "position": "absolute",
    "top": "50%",
    "left": "0",
    "transform": "translate(0, -142%)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 3px rgb(143, 72, 184)",
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
    "transform": "translate(50%, -50%)",
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
    "transform": "translate(-50%, 25%)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)",
    "fontSize":"small"
};

const stampNebulaPrice = {
    "position": "absolute",
    "top": "0",
    "left": "50%",
    "transform": "translate(0, 10px)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 5px rgb(143, 72, 184)"
};

const stampNebulaPriceVert = {
    "position": "absolute",
    "top": "50%",
    "left": "0",
    "transform": "translate(0, 0)",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "padding":"2px 8px",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 3px rgb(143, 72, 184)",
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
    const [dotsSize, setDotsSize] = useState(55);
    const [roadmapTextSize, setRoadmapTextSize] = useState("26px");
    const [hatchingSeedpodsImg, setHatchingSeedpodsImg] = useState(hatchingSeedpods);
    const [stampLunian1CSS, setStampLunian1CSS] = useState(stampLunian1);
    const [stampLunianPriceCSS, setStampLunianPriceCSS] = useState(stampLunianPrice);
    const [stampLunian2CSS, setStampLunian2CSS] = useState(stampLunian2);
    const [stampNebula1CSS, setStampNebula1CSS] = useState(stampNebula1);
    const [stampNebulaPriceCSS, setStampNebulaPriceCSS] = useState(stampNebulaPrice);
    const [stampNebula2CSS, setStampNebula2CSS] = useState(stampNebula2);
    const [buttonShadow, setButtonShadow] = useState("none");
    const [buttonPaddingTop, setButtonPaddingTop] = useState("0");
    const [showRoadmapModal, setShowRoadmapModal] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [collapseZoom, setCollapseZoom] = useState("0");
    const [discord, setDiscord] = useState(false);
    const [discordZoom, setDiscordZoom] = useState("0");
    const [remains, setRemains] = useState(false);
    const [remainsZoom, setRemainsZoom] = useState("0");
    const [distribution, setDistribution] = useState(false);
    const [distributionZoom, setDistributionZoom] = useState("0");
    const [drop, setDrop] = useState(false);
    const [dropZoom, setDropZoom] = useState("0");
    const [fusion, setFusion] = useState(false);
    const [fusionZoom, setFusionZoom] = useState("0");
    const [visualizer, setVisualizer] = useState(false);
    const [visualizerZoom, setVisualizerZoom] = useState("0");
    const [station, setStation] = useState(false);
    const [stationZoom, setStationZoom] = useState("0");
    const [seti, setSeti] = useState(false);
    const [setiZoom, setSetiZoom] = useState("0");
    const [cycle, setCycle] = useState(false);
    const [cycleZoom, setCycleZoom] = useState(false);
    const [unknown, setUnknown] = useState(false);
    const [unknownColor, setUnknownColor] = useState("#e8f8f8");

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const provider = new InfuraProvider(NETWORK, INFURA_ID);
    let luniansCollection = new Contract(addresses.lunians, abis.lunians.abi, provider);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const press = () => {
        setButtonShadow("7px 10px rgb(0,0,0,0.2)");
        setButtonPaddingTop("4px");
    };

    const unpress = () => {
        setButtonShadow("none");
        setButtonPaddingTop("0");
    };

    const handleCollapseEnter = () => {
        setCollapseZoom("3%");
    };
    const handleCollapseClick = () => {
        setShowRoadmapModal(true);
        setCollapse(true);
    }
    const handleDiscordEnter = () => {
        setDiscordZoom("1%");
    };
    const handleDiscordClick = () => {
        setShowRoadmapModal(true);
        setDiscord(true);
    }
    const handleRemainsEnter = () => {
        setRemainsZoom("1%");
    };
    const handleRemainsClick = () => {
        setShowRoadmapModal(true);
        setRemains(true);
    }
    const handleDistributionEnter = () => {
        setDistributionZoom("1%");
    };
    const handleDistributionClick = () => {
        setShowRoadmapModal(true);
        setDistribution(true);
    }
    const handleDropEnter = () => {
        setDropZoom("1%");
    };
    const handleDropClick = () => {
        setShowRoadmapModal(true);
        setDrop(true);
    }
    const handleFusionEnter = () => {
        setFusionZoom("1%");
    };
    const handleFusionClick = () => {
        setShowRoadmapModal(true);
        setFusion(true);
    }
    const handleVisualizerEnter = () => {
        setVisualizerZoom("1%");
    };
    const handleVisualizerClick = () => {
        setShowRoadmapModal(true);
        setVisualizer(true);
    }
    const handleStationEnter = () => {
        setStationZoom("1%");
    };
    const handleStationClick = () => {
        setShowRoadmapModal(true);
        setStation(true);
    }
    const handleSetiEnter = () => {
        setSetiZoom("1%");
    };
    const handleSetiClick = () => {
        setShowRoadmapModal(true);
        setSeti(true);
    }
    const handleCycleEnter = () => {
        setCycleZoom(true);
    };
    const handleCycleClick = () => {
        setShowRoadmapModal(true);
        setCycle(true);
    }
    const handleUnknownEnter = () => {
        setUnknownColor("rgb(133, 255, 243)");
    };
    const handleUnknownClick = () => {
        setShowRoadmapModal(true);
        setUnknown(true);
    }
    const handleMilesoneLeave = () => {
        setCollapseZoom("0"); setDiscordZoom("0"); setRemainsZoom("0"); setDistributionZoom("0"); 
        setDropZoom("0"); setFusionZoom("0"); setVisualizerZoom("0"); setStationZoom("0"); 
        setSetiZoom("0"); setCycleZoom(false); setUnknownColor("#e8f8f8");
    };
    const handleRoadmapModalClose = () => {
        setShowRoadmapModal(false);
        setCollapse(false); setDiscord(false); setRemains(false); setDistribution(false); setDrop(false); 
        setFusion(false); setVisualizer(false); setStation(false); setSeti(false); setCycle(false); setUnknown(false);
    };

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
                setVisible1("visible");
                setNSeedpodsArr([]);
                n = n > 20 ? 20 : n;
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
        setChangeLunian("hidden");
        setTextA(waitText1a);
        setTextB(waitText1b);
    }

    async function hatch(_seedpodId) {
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
                    let flag = false;
                    let flagged = false;
                    let counter = 0;
                    function updateMinted(flagged) {
                        if (!flagged) {
                            setTimeout(function () {
                                setSpin("hidden");
                                setTextA(resultText1a);
                                setTextB(resultText1b);
                                if (counter > 1 && changeLunian === "hidden") {
                                    setChangeLunian("visible");
                                }
                            }, 500);
                            luniansCollection.off("LunianMinted");
                            setDisableSeedpodSelector(false);
                            setRefreshInventory(!refreshInventory);
                        }
                    }
                    luniansCollection.on("DiceRolled", (_requestId, _address) => {
                        setTimeout(function () {
                            setTextA(waitText2a);
                            setTextB(waitText2b);
                        }, 10000);
                        setTimeout(function () {
                            setTextA(updateTexta);
                            setTextB(updateTextb);
                        }, 16000);
                        setTimeout(function () {
                            if(counter < seedpodsToMint.value) {
                                setTextA(waitText3a);
                                setTextB(waitText3b);
                            } else {
                                updateMinted(flagged);
                                flagged = true;
                            }
                        }, 20000);
                        setTimeout(function () {
                            if(counter < seedpodsToMint.value) {
                                setTextA(updateTexta);
                                setTextB(updateTextb);
                            } else {
                                updateMinted(flagged);
                                flagged = true;
                            }
                        }, 26000);
                        setTimeout(function () {
                            flag = true;
                            if(counter < seedpodsToMint.value) {
                                setTextA(waitText4a);
                                setTextB(waitText4b);
                            } else {
                                updateMinted(flagged);
                                flagged = true;
                            }
                        }, 30000);
                    });
                    luniansCollection.on("LunianMinted", (_owner, _lunianId) => {
                        if (_owner === account) {
                            counter++;
                            setLunianIds(lunianIds => [...lunianIds, _lunianId]);
                            if (counter < 2) {
                                setMintedLunian(baseLunianImgPath + 
                                                _lunianId.toNumber() + ".png");
                            }
                        }
                    });
                    setTimeout(handleShowModal, 3000);
                    function checkFlag() {
                        if(counter < seedpodsToMint.value || !flag) {
                           window.setTimeout(checkFlag, 500);
                        } else {
                           updateMinted(flagged);
                        }
                    }
                    checkFlag();
                } else {
                    setDisableSeedpodSelector(false);
                    alert("Wrong network. Please switch to Polygon.");
                }
            } catch (e) {
                setVisible2("hidden");
                setMintedLunian(initMintedLunian);
                setDisableSeedpodSelector(false);
                const rollState = await luniansCollection.rollState();
                if (rollState) {
                    alert("Many seedpods are being hatched right now. Wait a little and try again later.");
                } else {
                    alert("Something went wrong. Contact us if the error persists.");
                }
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
            setMintedLunian(baseLunianImgPath + lunianIds[currentLunianIndex] + ".png");
            setMounted(false);
        }
    }, [currentLunianIndex, mounted, lunianIds]);

    useLayoutEffect(() => {
        const updateImage = () => {
          if (window.innerWidth > 700) {
              setHatchingSeedpodsImg(hatchingSeedpods);
              setStampLunian1CSS(stampLunian1);
              setStampLunianPriceCSS(stampLunianPrice);
              setStampLunian2CSS(stampLunian2);
              setStampNebula1CSS(stampNebula1);
              setStampNebulaPriceCSS(stampNebulaPrice);
              setStampNebula2CSS(stampNebula2);
          } else {
              setHatchingSeedpodsImg(hatchingSeedpodsVert);
              setStampLunian1CSS(stampLunian1Vert);
              setStampLunianPriceCSS(stampLunianPriceVert);
              setStampLunian2CSS(stampLunian2Vert);
              setStampNebula1CSS(stampNebula1Vert);
              setStampNebulaPriceCSS(stampNebulaPriceVert);
              setStampNebula2CSS(stampNebula2Vert);
          }
          if (window.innerWidth <= 500) {
            setDotsSize(40);
            setRoadmapTextSize("11.5px");
          } else if (window.innerWidth <= 850) {
            setDotsSize(50);
            setRoadmapTextSize("23px");
          } else {
            setDotsSize(55);
            setRoadmapTextSize("26px");
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
                    <div style={{"position":"absolute", "marginLeft":"auto", "marginRight":"auto", "left":"0", "right":"0", "textAlign":"center", "marginTop":"7%"}}>
                        <Flash forever={true} duration={6000}>
                            <SaleInfo>
                                <p>SEEDPODS SALE STARTS</p>
                                <p>JULY, 12TH 2022</p>
                            </SaleInfo>
                        </Flash>
                    </div>
                    <Image src={lunia} alt="lunia-planet" style={{"alignSelf":"center", 
                    "marginTop":"2rem", "paddingTop":"1.25%"}} />
                    <NumberNFTs src={numberNFTs} alt="number-nfts" />
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
                    <div style={{"textAlign":"center", "width":"100%", "margin":"1rem 0"}}>
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
                                    Decentralized hosting of metadata through IPFS
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
                    </div>
                </Reasons>

                <div style={{"alignSelf":"center", "marginBottom":"1rem", "boxShadow":buttonShadow}} 
                    onClick={goToTop} onMouseEnter={press} onMouseLeave={unpress}>
                    <Image src={button} alt="go-top" style={{"alignSelf":"center", "marginBottom":"0", 
                        "marginTop":"0", "height":"70px", "width":"auto", "paddingTop":buttonPaddingTop}} />
                </div>

                <Lore>
                    <div style={{"display":"flex", "justifyContent":"space-between", "width":"100%"}}>
                        <div style={{"borderTop":"groove rgb(179, 227, 227)", "flex":"0 1 35%"}}/>
                        <Top>
                            DISCOVER MORE
                        </Top>
                        <div style={{"borderTop":"groove rgb(179, 227, 227)", "flex":"0 1 35%"}}/>
                    </div>
                    <Grid>
                        <Flip left>
                            <MediumCard frontImage={blackhole} frontTitle="Origins" backText={abstract1} link={link1} padding={"0"}/>
                            <MediumCard frontImage={lunia} frontTitle="Lunia" backText={abstract2} link={link2} padding={"2rem"}/>
                            <MediumCard frontImage={lunianseedpodback} frontTitle="Lunian Seedpods" backText={abstract3} link={link3} padding={"0"}/>
                            <MediumCard frontImage={poofpoof} frontTitle="Poof-poofs" backText={abstract4} link={link4} padding={"0"}/>
                            <MediumCard frontImage={nebulaseedpodback} frontTitle="Nebula Seedpods" backText={abstract5} link={link5} padding={"0"}/>
                            <MediumCard frontImage={roadmap} frontTitle="Roadmap" backText={abstract6} link={link6} padding={"0"}/>
                            <MediumCard frontImage={saleDate} frontTitle="Sale Info" backText={abstract7} link={link7} padding={"0"}/>
                            <MediumCard frontImage={lunianSample} frontTitle="Lunians" backText={abstract8} link={link8} padding={"0"}/>
                        </Flip>
                    </Grid>
                </Lore>

                <Hatching>
                    <Top>
                        THE SEEDPODS
                    </Top>
                    <Paragraph>
                        Hatch your seedpods here when planet Lunia has unveiled "all" its mysteries, and 
                        get a fantastic and enigmatic creature with random rarities.
                    </Paragraph>
                    <Fade delay={900}>
                        <Image src={tease} alt="Lunian tease" style={{"marginTop":"0.7rem", "marginBottom":"0"}} />
                    </Fade>
                    <Zoom top delay={50}>
                        <div>
                            <Image src={hatchingSeedpodsImg} alt="Hatching Seedpods" style={imgStyleHatchingSeedpods} />
                            <div style={stampLunian1CSS}>
                                Lunian<br/>seedpods
                            </div>
                            <div style={stampLunianPriceCSS}>
                                0.03 ETH
                            </div>
                            <div style={stampLunian2CSS}>
                                Common<br/>&<br/>cheaper
                            </div>
                            <div style={stampNebula1CSS}>
                                Nebula<br/>seedpods
                            </div>
                            <div style={stampNebulaPriceCSS}>
                                0.06 ETH
                            </div>
                            <div style={stampNebula2CSS}>
                                Higher rarities<br/>&<br/>limited
                            </div>
                        </div>
                    </Zoom>
                </Hatching>

                <div style={{"alignSelf":"center", "marginTop":"2rem", "marginBottom":"1.5rem", "boxShadow":buttonShadow}} 
                    onClick={goToTop} onMouseEnter={press} onMouseLeave={unpress}>
                    <Image src={button} alt="go-top" style={{"alignSelf":"center", "marginBottom":"0", 
                        "marginTop":"0", "height":"70px", "width":"auto", "paddingTop":buttonPaddingTop}} />
                </div>

                <div style={roadmapStyle}>
                    <Image src={roadmapBackground} alt="roadmap-background" style={roadmapBackgroundStyle}/>
                    <Dot1Style> <BsDot size={dotsSize}/> </Dot1Style> <Dot2Style> <BsDot size={dotsSize}/> </Dot2Style>
                    <Dot3Style> <BsDot size={dotsSize}/> </Dot3Style> <Dot4Style> <BsDot size={dotsSize}/> </Dot4Style>                        
                    <Dot5Style> <BsDot size={dotsSize}/> </Dot5Style> <Dot6Style> <BsDot size={dotsSize}/> </Dot6Style>
                    <Dot7Style> <BsDot size={dotsSize}/> </Dot7Style> <Dot8Style> <BsDot size={dotsSize}/> </Dot8Style>
                    <Dot9Style> <BsDot size={dotsSize}/> </Dot9Style> <Dot10Style> <BsDot size={dotsSize}/> </Dot10Style>
                    <Dot11Style> <BsDot size={dotsSize}/> </Dot11Style> <Dot12Style> <BsDot size={dotsSize}/> </Dot12Style>
                    <Dot13Style> <BsDot size={dotsSize}/> </Dot13Style> <Dot14Style> <BsDot size={dotsSize}/> </Dot14Style>
                    <Dot15Style> <BsDot size={dotsSize}/> </Dot15Style> <Dot16Style> <BsDot size={dotsSize}/> </Dot16Style>
                    <Dot17Style> <BsDot size={dotsSize}/> </Dot17Style> <Dot18Style> <BsDot size={dotsSize}/> </Dot18Style>
                    <Dot19Style> <BsDot size={dotsSize}/> </Dot19Style> <Dot20Style> <BsDot size={dotsSize}/> </Dot20Style>
                    <Dot21Style> <BsDot size={dotsSize}/> </Dot21Style> <Dot22Style> <BsDot size={dotsSize}/> </Dot22Style>
                    <Dot23Style> <BsDot size={dotsSize}/> </Dot23Style> <Dot24Style> <BsDot size={dotsSize}/> </Dot24Style>
                    <Dot25Style> <BsDot size={dotsSize}/> </Dot25Style> <Dot26Style> <BsDot size={dotsSize}/> </Dot26Style>
                    <Dot28Style> <BsDot size={dotsSize}/> </Dot28Style> <Dot29Style> <BsDot size={dotsSize}/> </Dot29Style>
                    <Dot30Style> <BsDot size={dotsSize}/> </Dot30Style> <Dot31Style> <BsDot size={dotsSize}/> </Dot31Style>
                    <Dot32Style> <BsDot size={dotsSize}/> </Dot32Style> <Dot33Style> <BsDot size={dotsSize}/> </Dot33Style>
                    <Dot34Style> <BsDot size={dotsSize}/> </Dot34Style> <Dot35Style> <BsDot size={dotsSize}/> </Dot35Style>
                    <Dot36Style> <BsDot size={dotsSize}/> </Dot36Style> <Dot37Style> <BsDot size={dotsSize}/> </Dot37Style>
                    <Dot38Style> <BsDot size={dotsSize}/> </Dot38Style> <Dot39Style> <BsDot size={dotsSize}/> </Dot39Style>
                    <Dot40Style> <BsDot size={dotsSize}/> </Dot40Style> <Dot41Style> <BsDot size={dotsSize}/> </Dot41Style>
                    <Dot42Style> <BsDot size={dotsSize}/> </Dot42Style> <Dot43Style> <BsDot size={dotsSize}/> </Dot43Style>
                    <Dot44Style> <BsDot size={dotsSize}/> </Dot44Style> <Dot45Style> <BsDot size={dotsSize}/> </Dot45Style>
                    <Dot46Style> <BsDot size={dotsSize}/> </Dot46Style> <Dot47Style> <BsDot size={dotsSize}/> </Dot47Style>
                    <Dot48Style> <BsDot size={dotsSize}/> </Dot48Style> <Dot49Style> <BsDot size={dotsSize}/> </Dot49Style>
                    <Dot50Style> <BsDot size={dotsSize}/> </Dot50Style> <Dot51Style> <BsDot size={dotsSize}/> </Dot51Style>
                    <Dot52Style> <BsDot size={dotsSize}/> </Dot52Style> <Dot53Style> <BsDot size={dotsSize}/> </Dot53Style> 
                    <Dot54Style> <BsDot size={dotsSize}/> </Dot54Style> <Dot55Style> <BsDot size={dotsSize}/> </Dot55Style>
                    <Dot56Style> <BsDot size={dotsSize}/> </Dot56Style> <Dot57Style> <BsDot size={dotsSize}/> </Dot57Style>
                    <Dot58Style> <BsDot size={dotsSize}/> </Dot58Style> <Dot59Style> <BsDot size={dotsSize}/> </Dot59Style>
                    <Dot60Style> <BsDot size={dotsSize}/> </Dot60Style> <Dot61Style> <BsDot size={dotsSize}/> </Dot61Style>
                    <Dot62Style> <BsDot size={dotsSize}/> </Dot62Style> <Dot63Style> <BsDot size={dotsSize}/> </Dot63Style>
                    <Dot64Style> <BsDot size={dotsSize}/> </Dot64Style> <Dot65Style> <BsDot size={dotsSize}/> </Dot65Style>
                    <Dot66Style> <BsDot size={dotsSize}/> </Dot66Style> <Dot67Style><BsDot size={dotsSize}/> </Dot67Style>
                    <div onMouseEnter={handleCollapseEnter} onMouseLeave={handleMilesoneLeave} onClick={handleCollapseClick} style={{"position":"absolute", "left":"1.5%", "top":"11%", "width":"35%", "padding":collapseZoom}}>
                        <Image src={roadmapBlackhole} alt="blackhole" style={{"width":"100%", "height":"auto", "marginBottom":"0"}}/>
                    </div>
                    <div onMouseEnter={handleDiscordEnter} onMouseLeave={handleMilesoneLeave} onClick={handleDiscordClick} style={{"position":"absolute", "left":"60%", "top":"13%", "width":"12.5%", "padding":discordZoom}}>
                        <Image src={roadmapDiscord} alt="discord" 
                            style={{"width":"100%", "height":"auto", "marginBottom":"0"}}/>
                    </div>
                    <div onMouseEnter={handleRemainsEnter} onMouseLeave={handleMilesoneLeave} onClick={handleRemainsClick} style={{"position":"absolute", "right":"3%", "top":"25%","width":"15%", "padding":remainsZoom}}>
                        <Image src={roadmapOpenSeedpod} alt="openSeedpod" 
                            style={{"width":"100%", "height":"auto", "marginBottom":"0"}}/>
                    </div>
                    <div onMouseEnter={handleDistributionEnter} onMouseLeave={handleMilesoneLeave} onClick={handleDistributionClick} style={{"position":"absolute", "left":"55%", "top":"35%","width":"15.5%", "padding":distributionZoom}}>
                        <Image src={roadmapGoldSeedpod} alt="goldSeedpod" 
                            style={{"width":"100%", "height":"auto", "marginBottom":"0"}}/>
                    </div>
                    <div onMouseEnter={handleDropEnter} onMouseLeave={handleMilesoneLeave} onClick={handleDropClick} style={{"position":"absolute", "left":"13%", "top":"38%","width":"15%", "padding":dropZoom}}>
                        <Image src={roadmapGift} alt="gift" 
                            style={{"width":"100%", "height":"auto", "marginBottom":"0"}}/>
                    </div>
                    <div onMouseEnter={handleFusionEnter} onMouseLeave={handleMilesoneLeave} onClick={handleFusionClick} style={{"position":"absolute", "left":"43%", "top":"53%", "width":"10%", "padding":fusionZoom, "display":"flex", "flexDirection":"column"}}>
                        <Image src={roadmapADN} alt="adn" 
                            style={{"width":"100%", "height":"auto", "margin":"0 0 0.3rem 0"}}/>
                        <Image src={roadmapAtom} alt="atom" 
                            style={{"width":"100%", "height":"auto", "margin":"0.3rem 0 0 0"}}/>
                    </div>
                    <div onMouseEnter={handleVisualizerEnter} onMouseLeave={handleMilesoneLeave} onClick={handleVisualizerClick} style={{"position":"absolute", "right":"10%", "top":"58%", "width":"15%", "padding":visualizerZoom}}>
                        <Image src={roadmapNetwork} alt="singular-lunians-net" 
                            style={{"width":"100%", "height":"auto", "marginBottom":"0"}}/>
                    </div>
                    <div onMouseEnter={handleStationEnter} onMouseLeave={handleMilesoneLeave} onClick={handleStationClick} style={{"position":"absolute", "left":"6%", "top":"60%", "width":"15%", "padding":stationZoom}}>
                        <Image src={roadmapStation} alt="space-station" 
                            style={{"width":"100%", "height":"auto", "marginBottom":"0"}}/>
                    </div>
                    <div onMouseEnter={handleSetiEnter} onMouseLeave={handleMilesoneLeave} onClick={handleSetiClick} style={{"position":"absolute", "left":"20%", "top":"77%", "width":"12.5%", "padding":setiZoom}}>
                        <Image src={roadmapSETI} alt="seti-logo" 
                            style={{"width":"100%", "height":"auto", "marginBottom":"0"}}/>
                    </div>
                    <RoadmapTitle text={"The Collapse"} left={"17.5%"} top={"12%"} size={roadmapTextSize} zoom={collapseZoom}/>
                    <RoadmapTitle text={"The Gathering"} left={"51.5%"} top={"20%"} size={roadmapTextSize} zoom={discordZoom}/>
                    <RoadmapTitle text={"The Remains"} left={"65%"} top={"29%"} size={roadmapTextSize} zoom={remainsZoom} width={"23%"}/>
                    <RoadmapTitle text={"The Distribution"} left={"61%"} top={"41%"} size={roadmapTextSize} zoom={distributionZoom}/>
                    <RoadmapTitle text={"The Spacedrop"} left={"6%"} top={"32.3%"} size={roadmapTextSize} zoom={dropZoom}/>
                    <RoadmapTitle text={"The DNA Recovery"} left={"33.2%"} top={"47.7%"} size={roadmapTextSize} zoom={fusionZoom}/>
                    <RoadmapTitle text={"The Datapad"} left={"67%"} top={"66.8%"} size={roadmapTextSize} zoom={visualizerZoom}/>
                    <RoadmapTitle text={"The Spaceport"} left={"15.5%"} top={"67.5%"} size={roadmapTextSize} zoom={stationZoom}/>
                    <RoadmapTitle text={"The Quest"} left={"11.8%"} top={"83.5%"} size={roadmapTextSize} zoom={setiZoom}/>
                    <RoadmapTitle text={"THE CYCLE"} left={"67%"} top={"85%"} size={roadmapTextSize} zoom={cycleZoom} cycle={cycleZoom}/>
                    <div onMouseEnter={handleCycleEnter} onMouseLeave={handleMilesoneLeave} onClick={handleCycleClick} style={{"position":"absolute", "left":"63%", "top":"70%", "width":"33%", "height":"33%"}}/>
                    <Unknown onMouseEnter={handleUnknownEnter} onMouseLeave={handleMilesoneLeave} onClick={handleUnknownClick} style={{"color":unknownColor}}>The Unknown</Unknown>
                    <Image src={roadmapFrame} alt="roadmap-frame" style={roadmapFrameStyle}/>
                </div>

                {/*<Hatching>
                    <Top style={{"fontSize":"2.5rem"}}>
                        HATCHING
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
                                    {nSeedpods > 0 && <p>How many do you want to hatch?</p>}
                                    {account !== "" && nSeedpods === 0 && 
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
                    "marginBottom":"1rem", "marginTop":"0"}} />

                <Coming>More coming soon!</Coming>

                <Modal show={showRoadmapModal} onHide={handleRoadmapModalClose} style={{"fontFamily":
                    "'Minecraftia', sans-serif"}}>
                    <Modal.Header closeButton style={{"backgroundColor":"#4d95aa", "color":"#e8f8f8"}}>
                        {collapse && (<Modal.Title>The Collapse</Modal.Title>)}
                        {discord && (<Modal.Title>The Gathering</Modal.Title>)}
                        {remains && (<Modal.Title>The Remains</Modal.Title>)}
                        {distribution && (<Modal.Title>The Distribution</Modal.Title>)}
                        {drop && (<Modal.Title>The Spacedrop</Modal.Title>)}
                        {fusion && (<Modal.Title>The DNA Recovery</Modal.Title>)}
                        {visualizer && (<Modal.Title>The Datapad</Modal.Title>)}
                        {station && (<Modal.Title>The Spaceport</Modal.Title>)}
                        {seti && (<Modal.Title>The Quest</Modal.Title>)}
                        {cycle && (<Modal.Title>The Cycle</Modal.Title>)}
                        {unknown && (<Modal.Title>The Unknown</Modal.Title>)}
                    </Modal.Header>
                    <Modal.Body style={{"backgroundColor":"#362264", "color":"white"}}>
                        {collapse && (
                            <p>
                                <b>The Collapse has already happened!</b>
                                <br/>
                                <br/>
                                We start preparing our travel to Lunia. A series of actions are to be performed before the sale of lunian and nebula seedpods begins:
                                <br/>
                                <br/>
                                <ul>
                                    <li>Giving away whitelist spots for the limited nebula seedpods.</li>
                                    <li>Giving away some lunian seedpods.</li>
                                    <li>Writing Medium articles with the lore.</li>
                                    <li>Announcing the advantages & rewards plan for holders of our past collections.</li>
                                    <li>Introducing the Lunians.</li>
                                    <li>Describing the differences between lunian and nebula seedpods.</li>
                                    <li>Seedpods sale starts!</li>
                                </ul>
                            </p>
                        )}
                        {discord && (
                            <p>
                                <b>The Gathering will be unlocked when we reach 10% sales of total seedpods.</b>
                                <br/>
                                <br/>
                                The community of those who will travel to Lunia gets going. Additionally to our Twitter account, a Discord server will be prepared and made
                                available for everyone to reunite and discuss the advances of the project.
                            </p>
                        )}
                        {remains && (
                            <p>
                                <b>The Remains will be unlocked when we reach 15% sales of total seedpods.</b>
                                <br/>
                                <br/>
                                As a token of our gratitude, and for you all to remember the origin of your Lunians, once you hatch your seedpods to get your creature, you
                                will preserve an NFT of the (open) seedpod your Lunian came out from.
                            </p>
                        )}
                        {distribution && (
                            <p>
                                <b>The Distribution will be unlocked when we reach 25% sales of total seedpods.</b>
                                <br/>
                                <br/>
                                We want to give back to all the people who have been brave enough to join so early to this mysterious journey that will take us to Lunia. Two
                                rewards will be distributed:
                                <br/>
                                <br/>
                                <ul>
                                    <li>Space lottery: One of the seedpod holders who had bought before we reach 25% of sales, will get 10% of the money raised so far.</li>
                                    <li>Showing gratitude to Deep-Fold: The space background and 3D planet gifs we use in this webpage have been created using Deep-Fold's free
                                        generator. Even if s/he knows nothing about this project, we want to reward them with 5% of the money raised up to this point.</li>
                                </ul>
                            </p>
                        )}
                        {drop && (
                            <p>
                                <b>The Spacedrop will be unlocked when we reach 40% sales of total seedpods.</b>
                                <br/>
                                <br/>
                                At this point, your continous support will deserve even more gratitude. We will make two raffles to give away a nebula seedpod and a lunian 
                                seedpod among all seedpod holders so far.
                            </p>
                        )}
                        {fusion && (
                            <p>
                                <b>The DNA Recovery will be unlocked when we reach 50% sales of total seedpods.</b>
                                <br/>
                                <br/>
                                We know Lunians' ancestors lived inside a primordial black hole that collapsed long ago. What we do not know is how these ancestors looked liked 
                                exactly. While they probably were similar to the Lunians, there surely are some important and unique differences. 
                                <br/>
                                <br/>
                                A DNA reconfiguration tool will be made available to all Lunian holders to let them try to mix the DNA of two of their Lunians into a single one,
                                in the search of recovering the ancestors' original DNA. When done correctly, two Lunians could be turned into a single Singular Lunian.
                            </p>
                        )}
                        {visualizer && (
                            <p>
                                <b>The Datapad will be unlocked when we reach 60% sales of total seedpods.</b>
                                <br/>
                                <br/>
                                Another tool will be published in this webpage. The datapad will provide anyone with an innovative mean to:
                                <br/>
                                <br/>
                                <ul>
                                    <li>Generate (for visualization purposes only) random Lunians that were never hatched and will never exist.</li>
                                    <li>See information about the Singular Lunians whose DNA has been recovered so far.</li>
                                </ul>
                            </p>
                        )}
                        {station && (
                            <p>
                                <b>The Spaceport will be unlocked when we reach 75% sales of total seedpods.</b>
                                <br/>
                                <br/>
                                As part of our space colonization plans, the spaceport will play a key role in promoting Lunians and making them known beyond Lunia itself.
                                The spaceport will be a store where anyone will be able to find and buy merchandise based on the Lunians. 
                                <br/>
                                <br/>
                                Lunians holders will receive and share a 20% of the benefits obtained from the store every year.
                            </p>
                        )}
                        {seti && (
                            <p>
                                <b>The Quest will be unlocked when we reach 90% sales of total seedpods.</b>
                                <br/>
                                <br/>
                                The search for intelligent life should not stop with the Lunians. This is one of the most honorable and ambicious goals humanity has set so far
                                and we want to promote it and support it within our possibilities. 
                                <br/>
                                <br/>
                                For this, we will donate 5% of the money raised so far to the SETI Institute,
                                not in our name but in the name (or alias, or wallet addresses, if preferred) of all holders at this point.
                            </p>
                        )}
                        {cycle && (
                            <p>
                                <b>The Cycle will be unlocked when we sell 100% of the seedpods.</b>
                                <br/>
                                <br/>
                                As some may know, Lunia rotates around its star in a geosynchronous orbit, meaning there is a light side of this planet where it is always at day, and 
                                a dark side where an endless night rules the surface. However, Lunia's sattellites or moons produce a solar eclipse that create a sort of a fake night 
                                every 18 hours that lasts for six hours. 
                                <br/>
                                <br/>
                                This cycle will be reflected in the NFTs, making them dynamic and changing their background and ambient from day to "night" for some hours every 
                                terrestrial day.
                            </p>
                        )}
                        {unknown && (
                            <p>
                                <b>The Unknown awaits us beyond Lunia.</b>
                                <br/>
                                <br/>
                                Here we enter in an unexplored territory. What challenges, mysteries and surprises await us in the future? Nothing is guaranteed here, but if you want, 
                                we may discover it together.
                            </p>
                        )}
                    </Modal.Body>
                    <Modal.Footer style={{"backgroundColor":"#4d95aa"}}>
                    <Button variant="secondary" onClick={handleRoadmapModalClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showModal} onHide={handleCloseModal} style={{"fontFamily":
                    "'Minecraftia', sans-serif"}}>
                    <Modal.Header closeButton style={{"backgroundColor":"#f0a5ad", "color":"#e8f8f8"}}>
                        <Modal.Title>Seedpod hatching</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{"backgroundColor":"#8b6cb5", "color":"white"}}>
                        <p>
                            Seedpods have been inactive for millions of years and the Lunians inside need 
                            time to return from their long hybernation. 
                        </p>
                        <p>
                            Please wait while the process is completed. You will receive your Lunian in 
                            your wallet address and you will get to see it in this page.
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

const SaleInfo = styled.div`
    text-align: center;
    color: rgb(133, 255, 243);
    font-size: 150%;
    font-weight: bold; 
    font-family: Tiny BoxBitA10,sans-serif;

    @media(max-width: 700px) {
        margin-top: -1.8rem; 
    }
`;

const NumberNFTs = styled.img`
    align-self: center;
    margin-top: -3rem; 
    margin-bottom: 2.6rem;
    width: 30%; 
    height: auto;

    @media(max-width: 1200px) {
        margin-top: -2.3rem; 
        width: 40%; 
    }

    @media(max-width: 960px) {
        margin-top: -2rem; 
        width: 45%; 
    }

    @media(max-width: 770px) {
        margin-top: -1.8rem; 
        width: 50%; 
    }
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
    "marginTop":"0",
    "transition":"all .5s ease",
    "fontSize":"2rem",
    "letterSpacing":"1px",
    "outline":"none",
    "width":"100%",
    "height":"auto",
    "boxShadow":"20px 38px 34px -26px hsla(0,0%,0%,.2)",
    "borderRadius":"255px 15px 225px 15px/15px 225px 15px 255px",
    "border":"solid 7px rgb(179,227,227)"
};

const roadmapStyle = {
    "alignSelf":"center", 
    "position":"relative", 
    "marginTop":"1rem",
    "marginBottom":"2rem"
}

const roadmapBackgroundStyle = {
    "width":"100%",
    "height":"auto",
    "maxWidth":"850px", 
    "alignSelf":"center",
    "marginBottom":"0"
};

const roadmapFrameStyle = {
    "position":"absolute",
    "top":"0",
    "left":"0",
    "width":"100%",
    "height":"auto",
    "maxWidth":"850px", 
    "alignSelf":"center",
    "marginBottom":"0"
};

const Dot1Style = styled.div`
    position: absolute;
    left: 31%;
    top: 19%;
    @media(max-width: 900px) {
        display: none;
    }
`;

const Dot2Style = styled.div`
    position: absolute;
    left: 35%;
    top: 18%;
`;

const Dot3Style = styled.div`
    position: absolute;
    left: 38%;
    top: 16%;
`;

const Dot4Style = styled.div`
    position: absolute;
    left: 42%;
    top: 15%;
    @media(max-width: 400px) {
        top: 14%;
    }
`;

const Dot5Style = styled.div`
    position: absolute;
    left: 46%;
    top: 14.5%;
    @media(max-width: 900px) {
        top: 14%;
    }
    @media(max-width: 400px) {
        top: 13%;
    }
`;

const Dot6Style = styled.div`
    position: absolute;
    left: 50%;
    top: 14.5%;
    @media(max-width: 900px) {
        top: 13.5%;
    }
    @media(max-width: 400px) {
        top: 13%;
    }
`;

const Dot7Style = styled.div`
    position: absolute;
    left: 54%;
    top: 14.7%;
    @media(max-width: 900px) {
        top: 13.5%;
    }
    @media(max-width: 700px) {
        display: none;
    }
`;

const Dot8Style = styled.div`
    position: absolute;
    left: 72%;
    top: 15%;
    @media(max-width: 900px) {
        left: 71%;
        top: 13.5%;
    }
    @media(max-width: 400px) {
        top: 13%;
    }
`;

const Dot9Style = styled.div`
    position: absolute;
    left: 76%;
    top: 16%;
    @media(max-width: 900px) {
        left: 75%;
        top: 15%;
    }
`;

const Dot10Style = styled.div`
    position: absolute;
    left: 79%;
    top: 18%;
    @media(max-width: 900px) {
        left: 78%;
        top: 17%;
    }
`;

const Dot11Style = styled.div`
    position: absolute;
    left: 81%;
    top: 20%;
    @media(max-width: 900px) {
        left: 80%;
        top: 19%;
    }
    @media(max-width: 400px) {
        top: 19.5%;
    }
`;

const Dot12Style = styled.div`
    position: absolute;
    left: 84%;
    top: 22%;
    @media(max-width: 900px) {
        left: 83%;
        top: 21%;
    }
    @media(max-width: 400px) {
        display: none;
    }
`;

const Dot13Style = styled.div`
    position: absolute;
    left: 85%;
    top: 32%;
    @media(max-width: 900px) {
        left: 84%;
        top: 31%;
    }
    @media(max-width: 400px) {
        left: 83%;
        top: 30.5%;
    }
`;

const Dot14Style = styled.div`
    position: absolute;
    left: 83%;
    top: 34%;
    @media(max-width: 900px) {
        top: 33%;
    }
`;

const Dot15Style = styled.div`
    position: absolute;
    left: 81%;
    top: 36%;
    @media(max-width: 900px) {
        top: 35%;
    }
`;

const Dot16Style = styled.div`
    position: absolute;
    left: 77%;
    top: 37%;
    @media(max-width: 900px) {
        left: 77.3%;
        top: 36.5%;
    }
    @media(max-width: 700px) {
        left: 76%;
        top: 36%;
    }
`;

const Dot17Style = styled.div`
    position: absolute;
    left: 73%;
    top: 37%;
    @media(max-width: 700px) {
        left: 71%;
        top: 36%;
    }
`;

const Dot18Style = styled.div`
    position: absolute;
    left: 69%;
    top: 37%;
    @media(max-width: 700px) {
        left: 66%;
        top: 36%;
    }
`;

const Dot19Style = styled.div`
    position: absolute;
    left: 50%;
    top: 38%;
    @media(max-width: 900px) {
        top: 36.5%;
    }
    @media(max-width: 700px) {
        display: none;
        top: 38%;
    }
`;

const Dot20Style = styled.div`
    position: absolute;
    left: 46%;
    top: 38%;
    @media(max-width: 900px) {
        top: 37%;
    }
    @media(max-width: 700px) {
        top: 36%;
    }
`;

const Dot21Style = styled.div`
    position: absolute;
    left: 42%;
    top: 38.5%;
    @media(max-width: 900px) {
        left: 42.2%;
        top: 37.5%;
    }
    @media(max-width: 700px) {
        top: 37%;
    }
`;

const Dot22Style = styled.div`
    position: absolute;
    left: 40%;
    top: 40%;
    @media(max-width: 900px) {
        top: 39%;
    }
`;

const Dot23Style = styled.div`
    position: absolute;
    left: 38%;
    top: 42%;
    @media(max-width: 900px) {
        top: 41%;
    }
`;

const Dot24Style = styled.div`
    position: absolute;
    left: 34.2%;
    top: 43.3%;
    @media(max-width: 900px) {
        left: 34.4%;
        top: 42.5%;
    }
    @media(max-width: 700px) {
        top: 42%;
    }
`;

const Dot25Style = styled.div`
    position: absolute;
    left: 30%;
    top: 44%;
    @media(max-width: 900px) {
        top: 43%;
    }
    @media(max-width: 700px) {
        top: 42%;
    }
`;

const Dot26Style = styled.div`
    position: absolute;
    left: 26%;
    top: 44%;
    @media(max-width: 900px) {
        left: 25%;
        top: 43%;
    }
    @media(max-width: 700px) {
        top: 42%;
    }
`;

const Dot28Style = styled.div`
    position: absolute;
    left: 9%;
    top: 44.2%;
    @media(max-width: 900px) {
        left: 7.5%;
        top: 43%;
    }
    @media(max-width: 700px) {
        left: 5%;
    }
`;

const Dot29Style = styled.div`
    position: absolute;
    left: 6%;
    top: 46%;
    @media(max-width: 900px) {
        left: 4.5%;
        top: 44.7%;
    }
    @media(max-width: 700px) {
        top: 44.8%;
        left: 2%;
    }
`;

const Dot30Style = styled.div`
    position: absolute;
    left: 4%;
    top: 48%;
    @media(max-width: 900px) {
        left: 3%;
        top: 46.8%;
    }
    @media(max-width: 700px) {
        left: 1%;
    }
`;

const Dot31Style = styled.div`
    position: absolute;
    left: 4.75%;
    top: 50.3%;
    @media(max-width: 900px) {
        left: 3%;
        top: 49%;
    }
    @media(max-width: 700px) {
        left: 1.5%;
        top: 49.3%;
    }
`;

const Dot32Style = styled.div`
    position: absolute;
    left: 6.5%;
    top: 52.3%;
    @media(max-width: 900px) {
        left: 4%;
        top: 51%;
    }
    @media(max-width: 700px) {
        top: 51.3%;
        left: 2.5%;
    }
`;

const Dot33Style = styled.div`
    position: absolute;
    left: 9%;
    top: 54%;
    @media(max-width: 900px) {
        left: 6%;
        top: 53%;
    }
    @media(max-width: 700px) {
        left: 4.5%;
        top: 53.3%;
    }
`;

const Dot34Style = styled.div`
    position: absolute;
    left: 13%;
    top: 54.5%;
    @media(max-width: 900px) {
        left: 10%;
        top: 53.5%;
    }
    @media(max-width: 700px) {
        left: 8%;
        top: 53.8%;
    }
`;

const Dot35Style = styled.div`
    position: absolute;
    left: 17%;
    top: 54%;
    @media(max-width: 900px) {
        left: 14%;
        top: 53%;
    }
    @media(max-width: 700px) {
        left: 12%;
    }
`;

const Dot36Style = styled.div`
    position: absolute;
    left: 21%;
    top: 54%;
    @media(max-width: 900px) {
        left: 18%;
        top: 53%;
    }
    @media(max-width: 700px) {
        left: 16.3%;
        top: 52.3%;
    }
`;

const Dot37Style = styled.div`
    position: absolute;
    left: 24%;
    top: 55%;
    @media(max-width: 900px) {
        left: 21%;
        top: 54%;
    }
    @media(max-width: 700px) {
        left: 20.8%;
        top: 53%;
    }
`;

const Dot38Style = styled.div`
    position: absolute;
    left: 28%;
    top: 55.5%;
    @media(max-width: 900px) {
        left: 25%;
        top: 54.5%;
    }
`;

const Dot39Style = styled.div`
    position: absolute;
    left: 32%;
    top: 55.5%;
    @media(max-width: 900px) {
        left: 29%;
        top: 54%;
    }
    @media(max-width: 700px) {
        top: 54.5%;
    }
`;


const Dot40Style = styled.div`
    position: absolute;
    left: 36%;
    top: 55%;
    @media(max-width: 900px) {
        left: 33.3%;
        top: 53.8%;
    }
    @media(max-width: 700px) {
        left: 33%;
        top: 54%;
    }
`;

const Dot41Style = styled.div`
    position: absolute;
    left: 53%;
    top: 55%;
    @media(max-width: 900px) {
        left: 53%;
        top: 55%;
    }
    @media(max-width: 700px) {
        left: 51%;
    }
`;

const Dot42Style = styled.div`
    position: absolute;
    left: 56%;
    top: 54%;
    @media(max-width: 900px) {
        left: 56%;
        top: 54%;
    }
    @media(max-width: 700px) {
        left: 55%;
    }
`;

const Dot43Style = styled.div`
    position: absolute;
    left: 59%;
    top: 53%;
    @media(max-width: 900px) {
        left: 59%;
        top: 53%;
    }
`;

const Dot44Style = styled.div`
    position: absolute;
    left: 63%;
    top: 52.5%;
    @media(max-width: 900px) {
        left: 63%;
        top: 52.5%;
    }
`;

const Dot45Style = styled.div`
    position: absolute;
    left: 67%;
    top: 52.5%;
    @media(max-width: 900px) {
        left: 67%;
        top: 52.5%;
    }
`;

const Dot46Style = styled.div`
    position: absolute;
    left: 71%;
    top: 53%;
    @media(max-width: 900px) {
        left: 71%;
        top: 53%;
    }
`;

const Dot47Style = styled.div`
    position: absolute;
    left: 75%;
    top: 54%;
    @media(max-width: 900px) {
        left: 75%;
        top: 54%;
    }
`;

const Dot48Style = styled.div`
    position: absolute;
    left: 78.5%;
    top: 55.5%;
    @media (max-width: 700px) {
        display: none;
    }
`;

const Dot49Style = styled.div`
    position: absolute;
    left: 68%;
    top: 63%;
    @media(max-width: 900px) {
        left: 68%;
        top: 62%;
    }
`;

const Dot50Style = styled.div`
    position: absolute;
    left: 62%;
    top: 63%;
    @media(max-width: 900px) {
        left: 62%;
        top: 63%;
    }
`;

const Dot51Style = styled.div`
    position: absolute;
    left: 56%;
    top: 62.5%;
    @media(max-width: 900px) {
        left: 56%;
        top: 63.5%;
    }
`;

const Dot52Style = styled.div`
    position: absolute;
    left: 50%;
    top: 62%;
    @media(max-width: 900px) {
        left: 50%;
        top: 63%;
    }
    @media(max-width: 700px) {
        top: 62.7%;
    }
`;

const Dot53Style = styled.div`
    position: absolute;
    left: 44%;
    top: 61%;
    @media(max-width: 900px) {
        left: 44%;
        top: 61%;
    }
`;

const Dot54Style = styled.div`
    position: absolute;
    left: 38%;
    top: 60.5%;
    @media(max-width: 900px) {
        left: 38%;
        top: 60.5%;
    }
`;

const Dot55Style = styled.div`
    position: absolute;
    left: 32%;
    top: 60%;
    @media(max-width: 900px) {
        left: 32%;
        top: 60%;
    }
`;

const Dot56Style = styled.div`
    position: absolute;
    left: 26%;
    top: 60.5%;
    @media(max-width: 900px) {
        left: 26%;
        top: 60.5%;
    }
`;

const Dot57Style = styled.div`
    position: absolute;
    left: 20%;
    top: 61%;
    @media(max-width: 900px) {
        left: 20%;
        top: 61%;
    }
`;

const Dot58Style = styled.div`
    position: absolute;
    left: 9%;
    top: 71%;
    @media(max-width: 900px) {
        left: 7%;
        top: 70%;
    }
`;

const Dot59Style = styled.div`
    position: absolute;
    left: 8%;
    top: 73%;
    @media(max-width: 900px) {
        left: 6%;
        top: 72%;
    }
`;

const Dot60Style = styled.div`
    position: absolute;
    left: 8%;
    top: 75%;
    @media(max-width: 900px) {
        left: 6%;
        top: 74%;
    }
`;

const Dot61Style = styled.div`
    position: absolute;
    left: 10%;
    top: 77%;
    @media(max-width: 900px) {
        left: 8%;
        top: 76%;
    }
`;

const Dot62Style = styled.div`
    position: absolute;
    left: 13.5%;
    top: 78.5%;
    @media(max-width: 900px) {
        left: 11.5%;
        top: 77.5%;
    }
`;

const Dot63Style = styled.div`
    position: absolute;
    left: 32.5%;
    top: 78.5%;
    @media(max-width: 900px) {
        left: 32%;
        top: 77.5%;
    }
`;

const Dot64Style = styled.div`
    position: absolute;
    left: 38%;
    top: 77.5%;
    @media(max-width: 900px) {
        left: 38%;
        top: 76.5%;
    }
`;

const Dot65Style = styled.div`
    position: absolute;
    left: 44%;
    top: 77%;
    @media(max-width: 900px) {
        left: 44%;
        top: 76%;
    }
`;

const Dot66Style = styled.div`
    position: absolute;
    left: 50%;
    top: 77%;
    @media(max-width: 900px) {
        left: 50%;
        top: 76%;
    }
`;

const Dot67Style = styled.div`
    position: absolute;
    left: 56%;
    top: 78%;
    @media(max-width: 900px) {
        left: 56%;
        top: 77%;
    }
`;

const RoadmapTitle = ({left, top, text, size, zoom, width, cycle}) => {
    let weight = "normal";
    let color = "#e8f8f8";
    if (zoom !== "0") color = "rgb(133, 255, 243)";
    if (!width) width = "28%";
    if (text === "THE CYCLE") {
        weight = "bold";
        if (cycle) {
            if (size === "11.5px") size = "16px";
            else if (size === "23px") size = "21px";
            else if (size === "26px") size = "24px";
            color = "rgb(133, 255, 243)";
        } else {
            if (size === "11.5px") size = "18px";
            else if (size === "23px") size = "26px";
            else if (size === "26px") size = "30px";
            color = "#e8f8f8";
        }
    }
    return (
        <div style={{"position":"absolute", "left": left, "top": top, "width":width, 
        "textAlign":"center", "fontSize":size, "fontWeight":weight, "color":color}}>
            {text}
        </div>
    );
}

const Unknown = styled.div`
    position: absolute;
    bottom: 4%;
    left: 7.5%;
    background-color: rgba(0,0,0,0.5);
    padding: 2px 8px;
    box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.2);
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    border: solid 5px rgb(143, 72, 184);
    font-style: italic;
    font-family: 'Ice Pixel7', sans-serif;
    font-size: 280%;
    @media(max-width: 900px) {
        font-size: 250%;
    }
    @media(max-width: 700px) {
        font-size: 130%;
    }
`;

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
    "border":"solid 7px rgb(179,227,227)"
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