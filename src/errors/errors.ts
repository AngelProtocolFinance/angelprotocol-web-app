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

export class EIP1193Error extends Error {
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
