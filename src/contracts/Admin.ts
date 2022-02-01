import { ConnectedWallet } from "@terra-money/wallet-provider";
import { contracts } from "../constants/contracts";
import Contract from "./Contract";
import { Member, sc } from "./types";

export default class Admin extends Contract {
  apCW4_addr: string;
  apCW3_addr: string;
  coCW4_addr: string;
  gaCW3_addr: string;
  constructor(wallet?: ConnectedWallet) {
    super(wallet);
    this.apCW4_addr = contracts[this.chainID][sc.apCW4];
    this.apCW3_addr = contracts[this.chainID][sc.apCW4];
    this.coCW4_addr = contracts[this.chainID][sc.coCW4];
    this.gaCW3_addr = contracts[this.chainID][sc.gaCW3];
  }

  async get_apCW4_member(addr: string) {
    return this.query<Member>(this.apCW4_addr, {
      member: { addr },
    });
  }
}
