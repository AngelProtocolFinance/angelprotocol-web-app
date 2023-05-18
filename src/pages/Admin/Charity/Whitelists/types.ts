export type WhiteLists = {
  contributors: string[];
  beneficiaries: string[];
};
export type FormValues = { initial: WhiteLists } & WhiteLists;
