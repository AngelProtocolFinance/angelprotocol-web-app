import { EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { PayloadAction } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ApplicationStatus } from "@giving/types/aws";
import { Chain } from "@giving/types/aws";
import {
  AdminVoteInfo,
  CW3Config,
  EndowmentDetails,
  Proposal,
  ReviewCW3Config,
  YieldVault,
} from "@giving/types/contracts";

export type ApplicationStatusOptions = ApplicationStatus | "all";

export type Tag = TagDescription<string>;
export type TagPayload = PayloadAction<Tag[], string>;

export type ContractQueryArgs<T = object> = {
  address: string;
  msg: T;
};

export type MultiContractQueryArgs = ContractQueryArgs<AggregatedQuery>;
export type AggregatedQuery = {
  aggregate: { queries: EncodedQueryMember[] };
};
export type EncodedQueryMember = {
  address: string;
  data: string; //base64 encoded msg
};

type Base = {
  cw3: string;
  cw4: string;
  id: number;
  propMeta: Required<
    Pick<TxArgs, "successMeta" | "tagPayloads" | "isAuthorized">
  > & {
    willExecute?: true;
  };
};

export type APResources = Base & {
  type: "ap";
  config: CW3Config;
};
export type ReviewResources = Base & {
  type: "review";
  config: ReviewCW3Config;
};
export type CharityResources = Base & {
  type: "charity";
  config: CW3Config;
} & EndowmentDetails;

export type AdminResources = APResources | ReviewResources | CharityResources;

export type ProposalDetails = Proposal & {
  votes: AdminVoteInfo[];
};

export type JunoTags =
  | "gov"
  | "indexfund"
  | "admin"
  | "account"
  | "registrar"
  | "custom";

export type Country = {
  flags: { png?: string; svg?: string };
  name: {
    common: string;
  };
};

export type CountryInRegion = Pick<Country, "name"> & { region: string };

export type CountryOption = {
  name: string;
  flag: string;
};

export type Regions = { [region: string]: string[] };

export type EndowmentAssets = {
  liquid: AssetSummary;
  locked: AssetSummary;
};

export type AssetSummary = {
  symbol: string;
  free: number;
  invested: number;
  total: number;
  vaults: Vault[];
};

export type Vault = YieldVault & {
  balance: number;
  invested: number;
  symbol: string;
};

export type Tx = { hash: string; chainID: string };

export type TxSuccessMeta = {
  message: string;
  link?: { url: string; description: string };
};

export type TxLoading = { loading: string };
export type TxError = { error: string; tx?: Tx };
export type TxSuccess = {
  success: TxSuccessMeta;
  tx?: Tx & { rawLog?: string };
};

export type TxState = TxLoading | TxError | TxSuccess;

export type TxOnSuccess = (res: DeliverTxResponse, chain: Chain) => void;

export type TxArgs = {
  tagPayloads?: TagPayload[];
  successMeta?: TxSuccessMeta;
  isAuthorized?: boolean;
  msgs: EncodeObject[];
  onSuccess?(res: DeliverTxResponse, chain: Chain): void;
};
