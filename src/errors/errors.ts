import { ChainIDs } from "@types-lists";

export class LogApplicationUpdateError extends Error {
  chainId: ChainIDs;
  pollId: string;
  constructor(chainId: ChainIDs, pollId: string) {
    super();
    this.chainId = chainId;
    this.pollId = pollId;
    this.name = "ApplicationReviewPollUpdateError";
  }
}

export class LogDonationFail extends Error {
  chainId: ChainIDs;
  txHash: string;
  constructor(chainId: ChainIDs, txHash: string) {
    super();
    this.chainId = chainId;
    this.txHash = txHash;
    this.name = "LogDonationFail";
  }
}

export class RejectBinanceLogin extends Error {
  constructor() {
    super();
    this.message = "Binance login cancelled";
    this.name = "RejectBinanceLogin";
  }
}

export class RejectMetamaskLogin extends Error {
  constructor() {
    super();
    this.message = "Metamask login cancelled";
    this.name = "RejectMetamaskLogin";
  }
}

export class WalletDisconnectError extends Error {
  constructor() {
    super();
    this.name = "WalletDisconnectError";
  }
}

export class TxResultFail extends Error {
  chainId: string;
  txHash: string;
  constructor(chainId: string, txHash: string) {
    super();
    this.chainId = chainId;
    this.txHash = txHash;
    this.name = "TxResultFailt";
  }
}
