export class Disconnected extends Error {
  constructor() {
    super();
    this.name = "wallet disconnected";
  }
}

export class TxResultFail extends Error {
  url: string;
  constructor(url: string) {
    super();
    this.url = url;
    this.name = "TxResultFailt";
  }
}
