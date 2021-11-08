export interface Details {
  name: string;
  icon: string;
  iconLight: boolean;
}

export interface RawDetails extends Details {
  address: string;
}

export type Donors = {
  [index: string]: Details;
};

export interface Result {
  Count: number;
  ScannedCount: number;
  Items: RawDetails[];
}
