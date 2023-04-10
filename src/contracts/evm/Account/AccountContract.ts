import { EVENT_TEMPLATES, Events, Functions, Queries } from "./types";
import { WalletState } from "contexts/WalletContext";
import { contractsEvm } from "constants/contracts";
import { Contract } from "../Contract";
import { abi } from "./abi";
import { RESULT_DECODERS } from "./resultDecoders";

/**
 * Representation of the `Account` contract that extends and wraps the generic `Contract` functionality.
 * Ensures that `Contract` methods are called with the Account ABI.
 */
export class AccountContract extends Contract<Functions, Events, Queries> {
  /**
   * Passes the Account ABI to the parent `Contract` class, ensuring its methods are called with that ABI.
   *
   * @param wallet The connected wallet.
   */
  constructor(wallet?: WalletState) {
    super(
      abi,
      contractsEvm.accounts.diamond,
      EVENT_TEMPLATES,
      RESULT_DECODERS,
      wallet
    );
  }
}
