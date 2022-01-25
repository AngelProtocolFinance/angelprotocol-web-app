export interface Details {
  icon: string;
  iconLight?: boolean;
  url: string;
  name: string;
  description: string;
  tier: number;
}

export type Charities = {
  [index: string]: Details;
};
