export interface Endowment {
  icon: string;
  owner: string;
  address: string;
  description: string;
  url: string;
  name: string;
}

export interface Result {
  Count: number;
  ScannedCount: number;
  Items: Endowment[];
}

//owner:endowment
export type Lookup = { [index: string]: string };
