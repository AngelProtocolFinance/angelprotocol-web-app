import { Chain } from "types/server/aws";

export class LogApplicationUpdateError extends Error {
  chain: Chain;
  pollId: string;
  constructor(chain: Chain, pollId: string) {
    super();
    this.chain = chain;
    this.pollId = pollId;
    this.name = "ApplicationReviewPollUpdateError";
  }
}

export class LogDonationFail extends Error {
  chain: Chain;
  txHash: string;
  constructor(chain: Chain, txHash: string) {
    super();
    this.chain = chain;
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

export class UnexpectedStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnexpectedStateError";
  }
}

type Network = "Juno" | "Terra" | "Ethereum" | "Binance";
export class WrongNetworkError extends Error {
  constructor(correctNetwork: Network) {
    super();
    this.name = "WrongNetworkError";
    this.message = `Connected to the wrong network. Please connect to the ${correctNetwork} chain.`;
  }
}

export class UnsupportedNetworkError extends Error {
  constructor(chainId: string) {
    super();
    this.name = "UnsupportedNetworkError";
    this.message = `Network ${chainId} not supported. The only supported networks are on: Juno, Terra, Ethereum and Binance`;
  }
}

export class TxResultFail extends Error {
  chain: Chain;
  txHash: string;
  constructor(
    chain: Chain,
    txHash: string,
    height: number,
    code: number,
    rawLog?: string
  ) {
    super();
    this.chain = chain;
    this.txHash = txHash;
    this.name = "TxResultFailt";
    this.message = `Error when broadcasting tx ${txHash} at height ${height}. Code: ${code}; Raw log: ${rawLog}`;
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
