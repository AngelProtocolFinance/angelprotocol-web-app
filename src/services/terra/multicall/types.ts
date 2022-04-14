export type EndowmentBalance = {
  liquid: number; //prettified USD value $1,000
  locked: number;
  total: number;
};

export type RateLookUp = { [index: string]: string };
