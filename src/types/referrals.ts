export interface Referred {
  id: number;
  name: string;
  up_until: string;
  ltd: number;
}

export interface Commissioned {
  amount: number;
  date: string;
  donation: {
    id: string;
    to_id: string;
    to_name: string;
  };
}
