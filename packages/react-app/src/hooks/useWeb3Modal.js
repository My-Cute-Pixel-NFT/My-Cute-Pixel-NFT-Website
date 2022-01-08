import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useCallback, useEffect, useMemo, useState } from "react";
import Web3Modal from "web3modal";

const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const INFURA_SECRET = process.env.REACT_APP_INFURA_SECRET;
const NETWORK = process.env.REACT_APP_NETWORK;

function useWeb3Modal(config = {}) {
  const [provider, setProvider] = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const { autoLoad = true, infuraId = INFURA_ID, infuraSecret = INFURA_SECRET, network = NETWORK } = config;

  // Support default Metamask provider and add WalletConnect too
  const web3Modal = useMemo(() => {
    return new Web3Modal({
      network: network,
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: infuraId,
            infuraSecret: infuraSecret,
            rpc: {137: "https://polygon-rpc.com/"}
          },
        },
      },
    });
  }, [infuraId, infuraSecret, network]);

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(async () => {
      await web3Modal.clearCachedProvider();
      window.location.reload();
  }, [web3Modal]);

  // If autoLoad is enabled and the the wallet has been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

  return [provider, loadWeb3Modal, logoutOfWeb3Modal];
}

export default useWeb3Modal;
