import { Contract } from "@ethersproject/contracts";
import { InfuraProvider } from "@ethersproject/providers";

import { useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';

import { addresses, abis, puppiesTokens, moegirlsTokens } from "@project/contracts";

import { InventoryImage, InventoryMenu } from "./index";

import puppies from "./../img/inventory_puppies.png";
import moe from "./../img/inventory_moe.png";

const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const NETWORK = process.env.REACT_APP_NETWORK;

function Inventory({ account }) {
    const [totalPups, setTotalPups] = useState(0);
    const [totalMoe, setTotalMoe] = useState(0);

    useEffect(() => {
        async function getBalances(account) {
            if (account !== "") {
                const provider = new InfuraProvider(NETWORK, INFURA_ID);
                const ceaOS = new Contract(addresses.puppies, abis.erc1155, provider);
                const numberOfPups = puppiesTokens.length;
                const accountsPups = Array(numberOfPups).fill(account);
                const numberOfMoe = moegirlsTokens.length;
                const accountsMoe = Array(numberOfMoe).fill(account);
                const tokenBalancePup = await ceaOS.balanceOfBatch(accountsPups, puppiesTokens);
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
            } 
        }

        getBalances(account);
    }, [account]);

    let toolTipPuppies;
    if (account === "") toolTipPuppies = "Connect your wallet to display your assets";
    else toolTipPuppies = "Collected Pixel Crypto Puppies";

    let toolTipMoe;
    if (account === "") toolTipMoe = "Connect your wallet to display your assets";
    else toolTipMoe = "Collected Moe Girls";

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
            <div data-tip data-for="registerTipMoe" style={{"display":"flex"}}>
                <div style={{"color":"#d3d3d3", "width":"32px"}}>?</div>
                <div style={{"color":"#d3d3d3"}}>x0</div>
            </div>*/}

            <ReactTooltip id="registerTipPuppies" place="right" effect="solid">
                {toolTipPuppies}
            </ReactTooltip>
            <ReactTooltip id="registerTipMoe" place="right" effect="solid">
                {toolTipMoe}
            </ReactTooltip>
        </InventoryMenu>
    );
}

export default Inventory;
