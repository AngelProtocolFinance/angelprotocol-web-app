export type CountryOption = {
  name: {
    common: string;
  };
  cca2: string; //ISO 3166-1 alpha-2 code
  flags: {
    png?: string;
    svg?: string;
  };
};
