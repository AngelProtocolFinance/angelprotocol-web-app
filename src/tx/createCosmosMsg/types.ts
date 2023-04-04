import { Coin } from "@cosmjs/proto-signing";
import {
  AllianceMember,
  Asset,
  CW4Member,
  DepositPayload,
  FundConfig,
  FundDetails,
  IndexFundOwnerPayload,
  InvestPayload,
  RedeemPayload,
  RegistrarConfigExtensionPayload,
  RegistrarOwnerPayload,
  StatusChangePayload,
  Vote,
  WithdrawPayload,
} from "types/contracts";

type NativeTransfer = {
  amount: string;
  denom: string;
};

type CW20Send = {
  amount: string;
  contract: string;
  msg: object;
};

type Msg<T> = {
  args: T;
  funds?: Coin[];
};

type AirdropClaim = {
  stage: number;
  amount: string;
  proof: string[];
};

type GCSpend = {
  asset: Asset;
  endow_id: number;
  locked_percentage: string;
  liquid_percentage: string;
};

const _msg_send = "recipient.send" as const;
export type MsgSendType = typeof _msg_send;

export type Msgs = {
  [_msg_send]: Msg<NativeTransfer>;
  "cw20.transfer": Msg<{ amount: string; recipient: string }>;
  "cw20.send": Msg<CW20Send>;

  "accounts.change-status": Msg<StatusChangePayload>;
  "accounts.withdraw": Msg<WithdrawPayload>;
  "accounts.invest": Msg<InvestPayload>;
  "accounts.redeem": Msg<RedeemPayload>;
  "accounts.deposit": Msg<DepositPayload>;

  "airdrop.claim": Msg<AirdropClaim>;

  "gov.create-poll": Msg<{ title: string; description: string; link?: string }>;
  "gov.unstake": Msg<{ amount: string }>;
  "gov.claim": Msg<{}>;
  "gov.end-poll": Msg<{ poll_id: number }>;
  "gov.vote": Msg<{ poll_id: number; vote: Vote; amount: string }>;

  "index-fund.update-config": Msg<FundConfig>;
  "index-fund.update-owner": Msg<IndexFundOwnerPayload>;
  "index-fund.create-fund": Msg<Omit<FundDetails, "id">>;
  "index-fund.remove-fund": Msg<{ fund_id: number }>;
  "index-fund.update-members": Msg<{
    fund_id: number;
    add: string[];
    remove: string[];
  }>;
  "index-fund.alliance-list": Msg<{
    address: string;
    member: AllianceMember;
    action: "add" | "remove";
  }>;
  "index-fund.alliance-member": Msg<{
    address: string;
    member: AllianceMember;
  }>;

  "registrar.update-config-extension": Msg<
    Partial<RegistrarConfigExtensionPayload>
  >;
  "registrar.update-owner": Msg<RegistrarOwnerPayload>;

  "gift-card.deposit": Msg<{ recipient: string }>;
  "gift-card.spend": Msg<GCSpend>;

  "cw4.update-members": Msg<{ add: CW4Member[]; remove: string[] }>;
};

export type MsgTypes = keyof Msgs;
export type TxArgs<T extends MsgTypes> = Msgs[T]["args"];

export type MsgOptions<T extends MsgTypes> = T extends `${infer C}.${string}`
  ? //for juno no hardcoded-contracts
    { [key in C]: string } & Msgs[T]["args"]
  : Msgs[T]["args"];
