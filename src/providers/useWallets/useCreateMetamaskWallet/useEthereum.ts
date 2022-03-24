import { useEffect, useState } from "react";
import { DeviceType, deviceType } from "../../../helpers/deviceType";
import { Dwindow } from "../../../services/provider/types";
import {
  AccountChangeHandler,
  EIP1193Events,
  EIP1193Methods,
  Ethereum,
} from "./types";

export default function useEthereum() {
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction();

  const shouldReconnect = lastAction === "connect";
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (deviceType() === DeviceType.MOBILE && (window as Dwindow).ethereum) {
      setConnected(true);
      setLoading(false);
      return;
    }

    requestAccess();
    return () => {
      detachAccountChangeHandler();
    };
    //eslint-disable-next-line
  }, []);

  async function requestAccess(isNewConnection = false) {
    const ethereum = getEthereum();
    if (ethereum && (isNewConnection || shouldReconnect) && !connected) {
      attachAccountChangeHandler(ethereum);
      const { result: accounts = [] } = await ethereum.send(
        EIP1193Methods.eth_requestAccounts,
        []
      );

      setConnected(true);
      setAddress(accounts[0]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  //attachers/detachers
  const attachAccountChangeHandler = (ethereum: Ethereum) => {
    ethereum.on(EIP1193Events.accountsChanged, handleAccountsChange);
  };
  const detachAccountChangeHandler = () => {
    getEthereum()?.removeListener(
      EIP1193Events.accountsChanged,
      handleAccountsChange
    );
  };

  //event listeners

  //useful when user changes account internally via metamask
  const handleAccountsChange: AccountChangeHandler = (accounts) => {
    //requestAccounts(new connection) will set the address so no need to set again
    if (accounts.length > 0 && !address) {
      setAddress(accounts[0]);
      //if no account is found, means user disconnected
    } else {
      detachAccountChangeHandler();
      setConnected(false);
      saveUserAction("disconnect");
    }
  };

  async function disconnect() {
    if (!connected) return;
    const ethereum = getEthereum();
    if (!ethereum) return;
    detachAccountChangeHandler();
    setConnected(false);
    saveUserAction("disconnect");
  }

  async function connect() {
    try {
      setLoading(true);
      await requestAccess(true);
      saveUserAction("connect");
    } catch (err: any) {
      setLoading(false);
      //let caller handle error with UI
      if ("code" in err && err.code === 4001) {
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

const ActionKey = "ethereum_pref";
type Action = "connect" | "disconnect";
function saveUserAction(action: Action) {
  localStorage.setItem(ActionKey, action);
}

function retrieveUserAction(): Action {
  return (localStorage.getItem(ActionKey) as Action) || "disconnect";
}

export function getEthereum() {
  return (window as any).ethereum as Ethereum;
}

export class RejectMetamaskLogin extends Error {
  constructor() {
    super();
    this.message = "Metamask login cancelled";
    this.name = "RejectMetamaskLogin";
  }
}

//notes: 1 accountChange handler run only on first connect [] --> [something]
//and revocation of permission [something] --> []
