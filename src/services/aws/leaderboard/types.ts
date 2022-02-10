export interface Endowment {
  endowment_address: string;
  charity_owner: string;
  charity_name: string;
  total_liq: number;
  total_lock: number;
  overall: number;
  charity_logo: string;
  charity_overview: string;
  url: string;
  tier: number;
  iconLight?: boolean;
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
