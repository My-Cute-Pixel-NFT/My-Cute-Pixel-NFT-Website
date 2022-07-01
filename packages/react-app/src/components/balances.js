import { Contract } from "@ethersproject/contracts";
import { InfuraProvider } from "@ethersproject/providers";

import { useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';

import { addresses, abis, puppiesTokens, moegirlsTokens, seedpodIds } from "@project/contracts";

import { InventoryImage, InventoryMenu } from "./index";

import puppies from "./../img/inventory_puppies.png";
import moe from "./../img/inventory_moe.png";
import lunianseedpod from "./../img/inventory_Lseedpod.png";
import nebulaseedpod from "./../img/inventory_Nseedpod.png";

const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const NETWORK = process.env.REACT_APP_NETWORK;
// const NETWORK_TEST = process.env.REACT_APP_NETWORK_TEST;

function Inventory({ account, refresh }) {
    const [totalPups, setTotalPups] = useState(0);
    const [totalMoe, setTotalMoe] = useState(0);
    const [totalLunianSeedpods, setTotalLunianSeedpods] = useState(0);
    const [totalNebulaSeedpods, setTotalNebulaSeedpods] = useState(0);

    useEffect(() => {
        async function getBalances(account) {
            if (account !== "") {
                try {
                    const provider = new InfuraProvider(NETWORK, INFURA_ID);
                    const ceaOS = new Contract(addresses.puppies, abis.erc1155, provider);
                    const numberOfPups = puppiesTokens.length;
                    const numberOfMoe = moegirlsTokens.length;
                    //const providerTest = new InfuraProvider(NETWORK_TEST, INFURA_ID);
                    let luniansCollection = new Contract(addresses.lunians, abis.lunians.abi, provider);
                    const accountsPups = Array(numberOfPups).fill(account);
                    const accountsMoe = Array(numberOfMoe).fill(account);
                    const tokenBalancePup = 0;await ceaOS.balanceOfBatch(accountsPups, puppiesTokens);
                    const tokenBalanceMoe = await ceaOS.balanceOfBatch(accountsMoe, moegirlsTokens);
                    let totalPupsT = 0;
                    let totalMoeT = 0;
                    for (let i = 0; i < tokenBalancePup.length; i++) {
                        totalPupsT += tokenBalancePup[i].toNumber();
                    }
                    for (let i = 0; i < tokenBalanceMoe.length; i++) {
                        totalMoeT += tokenBalanceMoe[i].toNumber();
                    }
                    setTotalPups(totalPupsT);
                    setTotalMoe(totalMoeT);
                    const totalLST = await luniansCollection.balanceOf(account, seedpodIds[1]);
                    const totalNST = await luniansCollection.balanceOf(account, seedpodIds[0]);
                    setTotalLunianSeedpods(totalLST.toNumber());
                    setTotalNebulaSeedpods(totalNST.toNumber());
                } catch(error) {
                    console.log(error);
                }
            } else {
                setTotalPups(0);
                setTotalMoe(0);
                setTotalLunianSeedpods(0);
                setTotalNebulaSeedpods(0);
            }
        }

        getBalances(account);
    }, [account, refresh]);

    let toolTipPuppies;
    if (account === "") toolTipPuppies = "Connect your wallet to display your assets";
    else toolTipPuppies = "Collected Pixel Crypto Puppies";

    let toolTipMoe;
    if (account === "") toolTipMoe = "Connect your wallet to display your assets";
    else toolTipMoe = "Collected Moe Girls";

    let toolTipSeedpod;
    if (account === "") toolTipSeedpod = "Connect your wallet to display your assets";
    else toolTipSeedpod = "Collected Seedpods";

    return (
        <InventoryMenu>
            <div data-tip data-for="registerTipPuppies" style={{"display":"flex"}}>
                <InventoryImage src={puppies} alt="puppies-logo" />
                <div style={{"color":"#d3d3d3"}}>x{totalPups}</div>
            </div>
            <div style={{"height":"15px", "width":"15px"}}/>
            <div data-tip data-for="registerTipMoe" style={{"display":"flex"}}>
                <InventoryImage src={moe} alt="moe-logo" />
                <div style={{"color":"#d3d3d3"}}>x{totalMoe}</div>
            </div>
            {/*<div style={{"height":"15px", "width":"15px"}}/>
            <div data-tip data-for="registerTipSeedpod" style={{"display":"flex"}}>
                <InventoryImage src={lunianseedpod} alt="moe-logo" />
                <div style={{"color":"#d3d3d3"}}>x{totalLunianSeedpods}</div>
            </div>
            <div style={{"height":"15px", "width":"15px"}}/>
            <div data-tip data-for="registerTipSeedpod" style={{"display":"flex"}}>
                <InventoryImage src={nebulaseedpod} alt="moe-logo" />
                <div style={{"color":"#d3d3d3"}}>x{totalNebulaSeedpods}</div>
            </div>*/}

            <ReactTooltip id="registerTipPuppies" place="right" effect="solid">
                {toolTipPuppies}
            </ReactTooltip>
            <ReactTooltip id="registerTipMoe" place="right" effect="solid">
                {toolTipMoe}
            </ReactTooltip>
            <ReactTooltip id="registerTipSeedpod" place="right" effect="solid">
                {toolTipSeedpod}
            </ReactTooltip>
        </InventoryMenu>
    );
}

export default Inventory;
