import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RiTwitterLine, RiInstagramLine, RiMediumLine, RiGithubLine } from "react-icons/ri";
import Slide from 'react-reveal/Slide';
import { MoralisProvider } from "react-moralis";

import { Body, Header, Footer, TopLeft } from "./components/index";
import Toggle from "./components/toggle";
import Menu from "./components/menu";
import WalletButton from "./components/wallet";
import Inventory from "./components/balances";

import useWeb3Modal from "./hooks/useWeb3Modal";

import Home from "./pages/Home";
import PixelCryptoPuppies from "./pages/PixelCryptoPuppies";
import TheMoeGirls from "./pages/TheMoeGirls";
import Lunians from "./pages/Lunians";
import Commissions from "./pages/Commissions";

import spaceBack from "./img/WholeSpaceBackground.png";

require('dotenv').config();

// Moralis
const MORALIS_SERVER = process.env.REACT_APP_MORALIS_SERVER;
const MORALIS_ID = process.env.REACT_APP_MORALIS_ID;

function App() {
    const [navToggled, setNavToggled] = useState(false);
    const [account, setAccount] = useState("");
    const [refreshInventory, setRefreshInventory] = useState(false);

    const handleNavToggle = () => {
      setNavToggled(!navToggled);
      setMenuButColor("#6c718c");
    }

    const [provider, setProvider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

    const [menuButColor, setMenuButColor] = useState("#6c718c");
    const [socialBut1Color, setSocialBut1Color] = useState("#e8f8f8");
    const [socialBut2Color, setSocialBut2Color] = useState("#e8f8f8");
    const [socialBut3Color, setSocialBut3Color] = useState("#e8f8f8");
    const [socialBut4Color, setSocialBut4Color] = useState("#e8f8f8");

    const menuButStyle={
      color:`${menuButColor}`
    };
    const socialBut1Style={
      color:`${socialBut1Color}`
    };
    const socialBut2Style={
      color:`${socialBut2Color}`
    };
    const socialBut3Style={
      color:`${socialBut3Color}`
    };
    const socialBut4Style={
      color:`${socialBut4Color}`
    };

    const handleButColorEnter = () => {
      setMenuButColor("#ffbbc2");
    };
    const handleButColorLeave = () => {
      if (navToggled) setMenuButColor("#e8f8f8");
      else setMenuButColor("#6c718c");
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

    const handleSoc3ColorEnter = () => {
      setSocialBut3Color("#ffbbc2");
    };
    const handleSoc3ColorLeave = () => {
      setSocialBut3Color("#e8f8f8");
    };

    const handleSoc4ColorEnter = () => {
      setSocialBut4Color("#ffbbc2");
    };
    const handleSoc4ColorLeave = () => {
      setSocialBut4Color("#e8f8f8");
    };

    return (
      <MoralisProvider appId={MORALIS_ID} serverUrl={MORALIS_SERVER}>
          <div style={styleBackground}>
            <Header>
              <Toggle style={menuButStyle} handleNavToggle={handleNavToggle} 
              handleButColorEnter={handleButColorEnter} handleButColorLeave={handleButColorLeave} />
              <TopLeft>
                <WalletButton provider={provider} setProvider={setProvider} loadWeb3Modal={loadWeb3Modal} 
                account={account} setAccount={setAccount} logoutOfWeb3Modal={logoutOfWeb3Modal} />
                <Inventory account={account} refresh={refreshInventory}/>
              </TopLeft>
            </Header>
            <Body>
              <Router>
                { navToggled ? 
                <Menu style={menuButStyle} handleNavToggle={handleNavToggle} 
                handleButColorEnter={handleButColorEnter} handleButColorLeave={handleButColorLeave} /> 
                : null }
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/PixelCryptoPuppies" element={<PixelCryptoPuppies account={account} />} />
                  <Route exact path="/TheMoeGirls" element={<TheMoeGirls account={account} />} />
                  <Route exact path="/Lunians" element={<Lunians account={account} refreshInventory={refreshInventory} setRefreshInventory={setRefreshInventory}/>} />
                  <Route exact path="/Commissions" element={<Commissions />} />
                </Routes>
              </Router>
            </Body>
            <Footer>
                <Slide left delay={250}>
                  <a href="https://twitter.com/mycutepixel_nft" target="_blank" rel="noreferrer"
                  style={socialBut1Style} onMouseEnter={handleSoc1ColorEnter} 
                  onMouseLeave={handleSoc1ColorLeave}>
                    <RiTwitterLine />
                  </a>
                </Slide>
                <Slide bottom delay={250}>
                  <a href="https://www.instagram.com/my.cute.pixel.nft" target="_blank" rel="noreferrer"
                  style={socialBut4Style} onMouseEnter={handleSoc4ColorEnter} 
                  onMouseLeave={handleSoc4ColorLeave}>
                    <RiInstagramLine />
                  </a>
                </Slide>
                <Slide bottom delay={250}>
                  <a href="https://mycutepixel-nft.medium.com" target="_blank" rel="noreferrer"
                  style={socialBut2Style} onMouseEnter={handleSoc2ColorEnter} 
                  onMouseLeave={handleSoc2ColorLeave}>
                    <RiMediumLine />
                  </a>
                </Slide>
                <Slide right delay={250}>
                  <a href="https://github.com/My-Cute-Pixel-NFT"
                  style={socialBut3Style} onMouseEnter={handleSoc3ColorEnter} 
                  onMouseLeave={handleSoc3ColorLeave}>
                    <RiGithubLine />
                  </a>
                </Slide>
            </Footer>
          </div>
      </MoralisProvider>
    );
}

const styleBackground = {
  "backgroundImage":"url("+spaceBack+")", 
  "backgroundSize":"cover",
  "backgroundPosition":"center",
  "backgroundRepeat":"no-repeat"
}

export default App;
