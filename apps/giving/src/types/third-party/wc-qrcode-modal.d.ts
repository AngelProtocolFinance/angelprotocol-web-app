declare module "@keplr-wallet/wc-qrcode-modal" {
  import { IQRCodeModalOptions } from "@walletconnect/types";

  export class KeplrQRCodeModalV1 {
    constructor(protected readonly uiOptions?: IQRCodeModalOptions) {}
    open(uri: string, cb: any): void;
    close(): void;
  }
}
