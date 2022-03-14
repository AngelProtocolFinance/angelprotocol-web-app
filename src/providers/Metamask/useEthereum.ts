import { useEffect, useState } from "react";
import { chainIDs } from "constants/chainIDs";
import { Dwindow } from "services/provider/types";
import { ethers } from "ethers";
import {
  AccountChangeHandler,
  ConnectHandler,
  DisconnectHandler,
  EIP1193Events,
  EIP1193Methods,
  Ethereum,
} from "./types";

const dwindow: Dwindow = window;

export default function useEthereum() {
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction();
  const shouldReconnect = lastAction === "connect";
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [ethereum, setEthereum] = useState(getEthereum());

  useEffect(() => {
    //for client-side page transition
    if (ethereum) {
      attachAccountChangeHandler(ethereum);
      attachDisconnectHandler(ethereum);
      attachConnectHandler(ethereum);
      if (shouldReconnect) {
        //TODO: make an enum for eth methods
        ethereum.send("eth_requestAccounts", []).then((x) => {
          console.log(x);
        });
      }
    }

    //for page reload
    window.addEventListener("load", attachControls);

    return () => {
      window.removeEventListener("load", attachControls);
      resetControls();
    };
    //eslint-disable-next-line
  }, []);

  const attachControls = async () => {
    setEthereum(getEthereum());
    if (!ethereum) return;
    attachAccountChangeHandler(ethereum);
    attachDisconnectHandler(ethereum);
    attachConnectHandler(ethereum);
    if (shouldReconnect) {
      await ethereum.send("eth_requestAccounts", []);
    }
  };

  const resetControls = () => {
    if (!ethereum) return;
    detachAccountChangeHandler(ethereum);
    detachDisconnectHandler(ethereum);
    detachConnectHandler(ethereum);
  };

  //handler attacher/detachers
  //granularity for finer control
  const attachAccountChangeHandler = (ethereum: Ethereum) => {
    ethereum.on(EIP1193Events.accountsChanged, handleAccountsChange);
  };
  const detachAccountChangeHandler = (ethereum: Ethereum) => {
    ethereum.removeListener(
      EIP1193Events.accountsChanged,
      handleAccountsChange
    );
  };
  const attachDisconnectHandler = (ethereum: Ethereum) => {
    ethereum.on(EIP1193Events.disconnect, handleDisconnect);
  };
  const detachDisconnectHandler = (ethereum: Ethereum) => {
    ethereum.removeListener(EIP1193Events.disconnect, handleDisconnect);
  };

  const attachConnectHandler = (ethereum: Ethereum) => {
    ethereum.on(EIP1193Events.disconnect, handleConnect);
  };
  const detachConnectHandler = (ethereum: Ethereum) => {
    ethereum.removeListener(EIP1193Events.disconnect, handleConnect);
  };

  //event handlers
  const handleConnect: ConnectHandler = (connectInfo) => {
    console.log(connectInfo);
  };

  const handleDisconnect: DisconnectHandler = (error) => {
    console.log(error);
  };

  const handleAccountsChange: AccountChangeHandler = async (accounts) => {
    console.log(accounts);
  };

  async function disconnect() {
    saveUserAction("disconnect");
  }

  async function connect() {
    try {
      if (connected) return;
      setLoading(true);
      if (!ethereum) {
        window.open("https://ethereum.app/", "_blank", "noopener noreferrer");
        return;
      }
      await ethereum.send(EIP1193Methods.eth_requestAccounts, []);
    } catch (err) {
      setLoading(false);
      console.error(err);
      //let caller handle error with UI
      if ((err as any).code === 4001) {
        throw new RejectMetamaskLogin();
      } else {
        throw new Error("Uknown error occured");
      }
    }
  }

  return {
    setters: { connect, disconnect },
    state: { loading, address, connected },
  };
}

const key = "ethereum_pref";
type Action = "connect" | "disconnect";
function saveUserAction(action: Action) {
  localStorage.setItem(key, action);
}

function retrieveUserAction(): Action {
  return (localStorage.getItem(key) as Action) || "disconnect";
}

export function getEthereum() {
  console.log("get ethereum");
  return (
    dwindow.ethereum && new ethers.providers.Web3Provider(dwindow.ethereum)
  );
}

export class RejectMetamaskLogin extends Error {
  constructor() {
    super();
    this.message = "Metamask login cancelled";
    this.name = "RejectMetamaskLogin";
  }
}
