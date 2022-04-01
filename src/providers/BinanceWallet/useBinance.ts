import { DeviceType, deviceType } from "helpers/deviceType";
import { useEffect, useState } from "react";
import { Dwindow } from "services/provider/types";
import {
  AccountChangeHandler,
  EIP1193Events,
  EIP1193Methods,
  Binance,
} from "./types";

export default function useBinance() {
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction();

  const shouldReconnect = lastAction === "connect";
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (deviceType() === DeviceType.MOBILE && (window as Dwindow).BinanceChain) {
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
    const binance = getBinance();
    if (binance && (isNewConnection || shouldReconnect) && !connected) {
      attachAccountChangeHandler(binance);
      const { result: accounts = [] } = await binance.send(
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
  const attachAccountChangeHandler = (ethereum: Binance) => {
    ethereum.on(EIP1193Events.accountsChanged, handleAccountsChange);
  };
  const detachAccountChangeHandler = () => {
    getBinance()?.removeListener(
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
    const binance = getBinance();
    if (!binance) return;
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
        throw new RejectBinanceLogin();
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

const ActionKey = "binance_pref";
type Action = "connect" | "disconnect";
function saveUserAction(action: Action) {
  localStorage.setItem(ActionKey, action);
}

function retrieveUserAction(): Action {
  return (localStorage.getItem(ActionKey) as Action) || "disconnect";
}

export function getBinance() {
  return (window as any).BinanceChain as Binance;
}

export class RejectBinanceLogin extends Error {
  constructor() {
    super();
    this.message = "Binance login cancelled";
    this.name = "RejectBinanceLogin";
  }
}

//notes: 1 accountChange handler run only on first connect [] --> [something]
//and revocation of permission [something] --> []
