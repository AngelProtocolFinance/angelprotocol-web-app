export const allChainIds = [
  "56",
  "97",
  "42",
  "1",
  "juno-1",
  "uni-3",
  "phoenix-1",
  "pisco-1",
] as const;

export type ChainId = typeof allChainIds[number];
