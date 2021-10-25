export interface Endowment {
  icon: string;
  owner: string;
  address: string;
  description: string;
  url: string;
  name: string;
  iconLight?: boolean;
}

export interface Details {
  description: string;
  url: string;
  name: string;
  icon: string;
  iconLight?: boolean;
}

export interface Result {
  Count: number;
  ScannedCount: number;
  Items: Endowment[];
}

//owner:endowment
export type Lookup = { [index: string]: string };
export type Accounts = { [index: string]: Details };
