import { Coin } from "@cosmjs/proto-signing";
import { BigNumberish } from "@ethersproject/bignumber";
import { SimulContractTx } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { getProvider } from "helpers";
import { EIPMethods } from "constants/evm";
import { Contract } from "../Contract";
import abi from "./abi.json";

/**
 * Representation of the `Account` contract that extends and wraps the generic `Contract` functionality.
 * Ensures that `Contract` methods are called with the Account ABI.
 */
export class ERC20 extends Contract {
  /**
   * Passes the Account ABI to the parent `Contract` class, ensuring its methods are called with that ABI.
   *
   * @param contractAddress Address of the contract.
   * @param wallet The connected wallet.
   */
  constructor(contractAddress: string, wallet?: WalletState) {
    super(abi, contractAddress, wallet);
  }

  /**
   * Omitted some checks and optimizations for simplicity.
   *
   * @param address Address for which to fetch token balances.
   * @param providerId Provider ID to use to query balances.
   * @returns A Promise of {@link Coin} which contains the balance and denomination of the coin for the specified address
   */
  async createBalanceOfTx(
    address: string,
    providerId = this.wallet?.providerId
  ): Promise<Coin> {
    if (!providerId) {
      throw new Error();
    }

    const provider = getProvider(providerId)!; // used "!" for simplicity, we should handle the `undefined` case explicitly

    // This isn't optimized for Txs that have a wallet connected, but don't require a 'from' parameter,
    // but can code can be updated to accommodate this.
    const tx = super.createContractTx("balanceOf", { address });

    return provider
      .request<string>({
        method: EIPMethods.eth_call,
        params: [tx],
      })
      .then<Coin>((result) => ({
        amount: (
          this.iface.decodeFunctionResult(
            "balanceOf",
            result
          )[0] as BigNumberish
        ).toString(),
        denom: this.contractAddress,
      }));
  }

  /**
   * Omitted some checks and optimizations for simplicity.
   *
   * @param to Target address to transfer to.
   * @param amount Amount to transfer.
   * @returns An object containing transaction data necessary to call an EVM contract, see {@link SimulContractTx}
   */
  createTransferTx(to: string, amount: string): SimulContractTx {
    return super.createContractTx("transfer", { to, amount });
  }
}
