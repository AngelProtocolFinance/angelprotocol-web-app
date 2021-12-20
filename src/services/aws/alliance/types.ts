export interface Details {
  name: string;
  icon: string;
  iconLight: boolean;
  address: string;
}
export interface Result {
  Count: number;
  ScannedCount: number;
  Items: Details[];
}

export interface Member {
  name: string;
  icon: string;
  iconLight: boolean;
  addresses: string[];
}
