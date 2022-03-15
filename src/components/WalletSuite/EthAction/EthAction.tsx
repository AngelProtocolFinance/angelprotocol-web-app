import { useSetModal } from "components/Modal/Modal";
import ConnectButton from "../ConnectButton";
import { useGetMetamask, useSetMetamask } from "providers/Metamask/Metamask";
import metamaskIcon from "images/icons/metamask.png";
import { Dwindow } from "services/provider/types";
import XDefiError from "./xDefiError";

const dwindow = window as Dwindow;
export default function EthAction() {
  const { loading: isConnecting } = useGetMetamask();
  const { connect } = useSetMetamask();
  const { showModal } = useSetModal();

  async function handleClick() {
    //if metamask is not installed
    if (!dwindow.ethereum?.isMetaMask) {
      alert("install");
      return;
    } else if (isXdefiPrioritized()) {
      alert("remove priority please");
      return;
    } else {
      await connect();
    }
  }

  return (
    <ConnectButton
      onClick={handleClick}
      _icon={metamaskIcon}
      disabled={isConnecting}
    >
      Metamask
    </ConnectButton>
  );
}

const metamaskInstallLink =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";

function isXdefiPrioritized() {
  return (
    dwindow.xfi?.binance !== undefined &&
    dwindow.xfi?.bitcoin !== undefined &&
    dwindow.xfi?.bitcoincash !== undefined &&
    dwindow.xfi?.litecoin !== undefined &&
    dwindow.xfi?.terra !== undefined &&
    dwindow.xfi?.thorchain !== undefined
  );
}
