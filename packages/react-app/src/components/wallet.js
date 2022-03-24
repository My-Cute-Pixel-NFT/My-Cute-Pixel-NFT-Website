import { useEffect, useState } from "react";

import { FaWallet } from "react-icons/fa";
import { IconContext } from "react-icons";
import ReactTooltip from 'react-tooltip';

import { Button, Wallet } from "./index";

function addWalletAddress(account) {
    if (account !== "") {
      let width = window.innerWidth;
      let dispAccount;
      if (width < 800) {
        dispAccount = account.substring(0, 2) + " \n " + account.substring(3, 6) + "..." + account.substring(38);
      } else { 
        dispAccount = account.substring(0, 6) + "..." + account.substring(38);
      }
      return (
        " " + dispAccount + " "
      );
    }
}
  
function RedLargeWallet() {
    return (
      <IconContext.Provider value={{ color: '#ffbbc2', size: '40px' }}>
        <div data-tip data-for="registerTipConnect">
          <FaWallet style={{"alignSelf":"center"}} />
        </div>
  
        <ReactTooltip id="registerTipConnect" place="right" effect="solid">
          Wallet disconnected. Click here to connect.
        </ReactTooltip>
      </IconContext.Provider>
    );
}
  
function GreenLargeWallet({account}) {
    return (
      <IconContext.Provider value={{ color: '#b3e3e3', size: '40px' }}>
        <Wallet data-tip data-for="registerTipDisconnect">
          <FaWallet style={{"alignSelf":"center"}} />
          { addWalletAddress(account) }
        </Wallet>
  
        <ReactTooltip id="registerTipDisconnect" place="top" effect="solid">
          Wallet connected. Click here to disconnect.
        </ReactTooltip>
      </IconContext.Provider>
    );
}
  
function WalletButton({ provider, setProvider, loadWeb3Modal, account, setAccount, logoutOfWeb3Modal }) {
    const [rendered, setRendered] = useState("");
  
    useEffect(() => {  
        async function fetchAccount() {
            try {
                if (!provider) {
                    return;
                }

                // Load the user's accounts.
                const accounts = await provider.listAccounts();
                if (typeof(accounts) == "undefined") {
                  return;
                }
                setAccount(accounts[0]);

                // Resolve the ENS name for the first account (only if Ethereum).
                let name = false;
                if (provider.network) {
                    if (provider.network.name === "homestead") {
                        name = await provider.lookupAddress(accounts[0]);
                    }
                }

                // Render either the ENS name or the shortened account address.
                if (name) {
                    setRendered(name);
                } else {
                    setRendered(<GreenLargeWallet account = {account} />);
                }
            } catch (err) {
                setAccount("");
                setRendered("");
                console.error(err);
            }
        }

        fetchAccount();
    }, [account, provider, setAccount]);

    if (typeof(window.ethereum) !== 'undefined') {
      window.ethereum.on("accountsChanged", (accounts) => {
          if (account !== "") {
            if (typeof(accounts[0]) !== "undefined") {
                console.log("Selected account: " + accounts[0]);
                setAccount(accounts[0]);
            } else {
                console.log("Disconnected");
                setRendered("");
            }
          } else {
            console.log("Disconnected");
            setProvider(false);
            setAccount("");
          }
      });
    }
  
    return (
        <Button
          onClick={() => {
            if (typeof(provider) === "undefined") {
              loadWeb3Modal();
            } else {
              logoutOfWeb3Modal();
            }
          }}
        >
          {rendered === "" && <RedLargeWallet />}
          {rendered !== "" && rendered}
        </Button>
    );
}

export default WalletButton;