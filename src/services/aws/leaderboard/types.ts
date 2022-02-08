export interface Endowment {
  address: string;
  total_liq: number;
  total_lock: number;
  overall: number;
}

export interface Update {
  endowments: Endowment[];
  last_update: string;
}

export interface QueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
  LastUpdate: string;
}
