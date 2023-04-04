import { Coin } from "@cosmjs/proto-signing";
import {
  AllianceMember,
  ApplicationVote,
  Asset,
  CW3ConfigPayload,
  CW4Member,
  DepositPayload,
  EmbeddedBankMsg,
  EmbeddedWasmMsg,
  FundConfig,
  FundDetails,
  IndexFundOwnerPayload,
  InvestPayload,
  RedeemPayload,
  RegistrarConfigExtensionPayload,
  RegistrarOwnerPayload,
  ReviewCW3ConfigPayload,
  StatusChangePayload,
  UpdateEndowmentControllerMsg,
  Vote,
  WithdrawLockPayload,
  WithdrawPayload,
} from "types/contracts";
import { Contract } from "types/lists";

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

  "controller.update-contoller": Msg<UpdateEndowmentControllerMsg>;

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

  "cw3.update-config": Msg<CW3ConfigPayload>;
  "cw3.execute-proposal": Msg<{ proposal_id: number }>;
  "cw3.propose": Msg<{
    title: string;
    description: string;
    msgs: (EmbeddedBankMsg | EmbeddedWasmMsg)[];
    meta?: string;
  }>;
  "cw3.vote": Msg<{ proposal_id: number; vote: Vote }>;
  "cw3.propose-withdraw": Msg<WithdrawLockPayload>;

  "cw3/review.vote-application": Msg<ApplicationVote>;
  "cw3/review.update-config": Msg<ReviewCW3ConfigPayload>;
};

export type MsgTypes = keyof Msgs;
export type TxArgs<T extends MsgTypes> = Msgs[T]["args"];

type Empty = { [key: string]: never };
export type MsgOptions<T extends MsgTypes> = T extends `${infer C}.${string}`
  ? C extends Contract
    ? Msgs[T]["args"]
    : { [key in C]: string } & Msgs[T]["args"]
  : Empty;
