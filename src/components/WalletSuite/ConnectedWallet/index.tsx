import { Popover } from "@headlessui/react";
import {
  WalletState,
  useGetWallet,
} from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import { maskAddress } from "helpers";
import { connectWalletBtnStyle } from "../constants";
import Details from "./Details";

//this component won't be rendered if wallet is not connected
export default function ConnectedWallet(props: WalletState) {
  const { isLoading } = useGetWallet();
  const maskedAddr = maskAddress(props.address);

  return (
    <Popover as="div" className="relative">
      <Popover.Button disabled={isLoading} className={connectWalletBtnStyle}>
        <span>{maskedAddr}</span>
        <Icon type="ArrowDown" className="text-2xl opacity-50" />
      </Popover.Button>
      <Details {...props} />
    </Popover>
  );
}
