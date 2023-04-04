import { NewAIF } from "types/contracts/evm";
import { WalletState } from "contexts/WalletContext";
import Contract from "../Contract";
import abi from "./abi.json";

type Functions = {
  createEndowment: {
    aif: NewAIF;
  };
  updateEndowment: {
    str: string;
  };
};

export default class Account extends Contract<Functions> {
  constructor(contractAddress: string, wallet: WalletState) {
    super(abi, contractAddress, wallet);
  }
}
