export type Country = {
  name: string;
  flag: string;
  code: string;
};

export type Regions = { [region: string]: Country[] };
