import { MsgSendType, MsgTypes, TxArgs } from "./types";
import { toBase64 } from "helpers";

export const msgs: {
  [T in Exclude<MsgTypes, MsgSendType>]: (args: TxArgs<T>) => object;
} = {
  "cw20.transfer": (p) => ({ transfer: p }),
  "cw20.send": ({ amount, contract, msg }) => ({
    amount,
    contract,
    msg: toBase64(msg),
  }),

  "accounts.change-status": (p) => ({ update_endowment_status: p }),
  "accounts.withdraw": (p) => ({ withdraw: p }),
  "accounts.invest": (p) => ({ vaults_invest: p }),
  "accounts.redeem": (p) => ({ vaults_redeem: p }),
  "accounts.deposit": (p) => ({ deposit: p }),

  "controller.update-contoller": (p) => ({ update_endowment_controller: p }),

  "airdrop.claim": (p) => ({ claim: p }),

  "gift-card.deposit": (p) => ({
    deposit: p.recipient
      ? {
          to_address: p.recipient,
        }
      : /** dont add to_address when recipient is empty */
        {},
  }),
  "gift-card.spend": (p) => ({ spend: p }),

  "gov.create-poll": (p) => ({ create_poll: p }),
  "gov.unstake": (p) => ({ withdraw_voting_tokens: p }),
  "gov.claim": (p) => ({ claim_voting_tokens: p }),
  "gov.end-poll": (p) => ({ end_poll: p }),
  "gov.vote": (p) => ({ cast_vote: p }),

  "index-fund.update-config": (p) => ({ update_config: p }),
  "index-fund.update-owner": (p) => ({ update_owner: p }),
  "index-fund.create-fund": (p) => ({ create_fund: p }),
  "index-fund.remove-fund": (p) => ({ remove_fund: p }),
  "index-fund.update-members": (p) => ({ update_members: p }),
  "index-fund.alliance-list": (p) => ({ update_alliance_member_list: p }),
  "index-fund.alliance-member": (p) => ({ update_alliance_member: p }),

  "registrar.update-config-extension": (p) => ({ update_config_extension: p }),
  "registrar.update-owner": (p) => ({ update_owner: p }),

  "cw4.update-members": (p) => ({ update_members: p }),

  "cw3.update-config": (p) => ({ update_config: p }),
  "cw3.execute-proposal": (p) => ({ execute: p }),
  "cw3.propose": (p) => ({ propose: p }),
  "cw3.vote": (p) => ({ vote: p }),
  "cw3.propose-withdraw": (p) => ({ propose_locked_withdraw: p }),

  "cw3/review.vote-application": (p) => ({ vote_application: p }),
  "cw3/review.update-config": (p) => ({ update_config: p }),
};
