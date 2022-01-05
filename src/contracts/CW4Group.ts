import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "constants/contracts";
import Contract from "./Contract";
import { MemberRes, sc } from "./types";

export default class CW4Group extends Contract {
  address: string;
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.address = contracts[this.chainID][sc.cw3_multisig];
  }

  async isMember(addr: string, weight?: number | undefined) {
    const result = await this.query<MemberRes>(this.address, {
      member: { addr, weight },
    });
    return result.weight ? true : false;
  }
}
