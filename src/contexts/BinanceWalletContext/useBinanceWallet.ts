import {
  AccountChangeHandler,
  EIP1193Events,
  EIP1193Methods,
  Web3Provider,
} from "@types-ethereum";
import { Dwindow } from "@types-slice/provider";
import { RejectBinanceLogin } from "errors/errors";
import { useEffect, useState } from "react";
import { DeviceType, deviceType } from "helpers/deviceType";

export default function useBinanceWallet() {
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction();

  const shouldReconnect = lastAction === "connect";
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (
      deviceType() !== DeviceType.DESKTOP &&
      (window as Dwindow).BinanceChain
    ) {
      return;
    } //No binance wallet on mobile.

    requestAccess();
    //eslint-disable-next-line
  }, []);

  async function requestAccess(isNewConnection = false) {
    const binance = getBinance();
    if (binance && (isNewConnection || shouldReconnect) && !connected) {
      attachAccountChangeHandler(binance);
      const method: EIP1193Methods = "eth_requestAccounts";
      const { result: accounts = [] } = await binance.send(method, []);

      setConnected(true);
      setAddress(accounts[0]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  //attachers/detachers
  const attachAccountChangeHandler = (binance: Web3Provider) => {
    const event: EIP1193Events = "accountsChanged";
    binance.on(event, handleAccountsChange);
  };

  //event listeners

  //useful when user changes account internally via metamask
  const handleAccountsChange: AccountChangeHandler = (accounts) => {
    //requestAccounts(new connection) will set the address so no need to set again
    if (accounts.length > 0 && !address) {
      setAddress(accounts[0]);
      //if no account is found, means user disconnected
    } else {
      setConnected(false);
      saveUserAction("disconnect");
    }
  };

  async function disconnect() {
    if (!connected) return;
    const binance = getBinance();
    if (!binance) return;
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
  return (window as any).BinanceChain as Web3Provider;
}

//notes: 1 accountChange handler run only on first connect [] --> [something]
//and revocation of permission [something] --> []
