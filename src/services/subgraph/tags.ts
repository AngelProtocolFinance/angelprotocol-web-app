export const tags = [
  "transactions",
  "transaction",
  "application-proposal",
] as const;

export type SubgraphTag = (typeof tags)[number];

//FUTURE: tags might be populated more th
export const defaultProposalTags: SubgraphTag[] = [
  "transactions",
  "transaction",
  "application-proposal",
];
