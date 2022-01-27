export interface Details {
  name: string;
  address: string;
  url?: string;
  icon?: string;
  iconLight?: boolean;
  otherWallets?: string[];
}
export interface Result {
  Count: number;
  ScannedCount: number;
  Items: Details[];
}
