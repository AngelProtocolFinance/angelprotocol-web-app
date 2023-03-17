export type Country = {
  name: string;
  flag: string;
};

export type Regions = { [region: string]: Country[] };
