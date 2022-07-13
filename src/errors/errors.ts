import { chainIDs } from "constants/chainIDs";

export class LogApplicationUpdateError extends Error {
  chainId: string;
  pollId: string;
  constructor(chainId: string, pollId: string) {
    super();
    this.chainId = chainId;
    this.pollId = pollId;
    this.name = "ApplicationReviewPollUpdateError";
  }
}

export class LogDonationFail extends Error {
  chainId: string;
  txHash: string;
  constructor(chainId: string, txHash: string) {
    super();
    this.chainId = chainId;
    this.txHash = txHash;
    this.name = "LogDonationFail";
  }
}

export class WalletDisconnectError extends Error {
  constructor() {
    super();
    this.name = "WalletDisconnectError";
  }
}

type Network = "Juno" | "Terra" | "Ethereum" | "Binance";
export class WrongNetworkError extends Error {
  constructor(correctNetwork: Network, correctChainId: chainIDs) {
    super();
    this.name = "WrongNetworkError";
    this.message = `Connected to the wrong network. Please connect to the ${correctNetwork} ${correctChainId} chain.`;
  }
}

export class UnimplementedNetworkError extends Error {
  constructor(chainId: string) {
    super();
    this.name = "UnimplementedNetworkError";
    this.message = `Network ${chainId} not implemented`;
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

export class WalletError extends Error {
  //based on EIP1193 error spec
  code: number;
  message: string;
  data?: unknown;
  constructor(message: string, code: number, data?: unknown) {
    super();
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
