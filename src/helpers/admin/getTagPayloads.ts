import { TagPayload } from "types/third-party/redux";
import { TxMeta } from "types/tx";
import { ApesTag, invalidateApesTags } from "services/apes";
import { invalidateJunoTags } from "services/juno";
import { EVMTag } from "services/juno/tags";
import {
  SubgraphTag,
  defaultProposalTags,
  invalidateSubgraphTags,
} from "services/subgraph";

export function getTagPayloads(type?: TxMeta["id"]): TagPayload[] {
  const _evm: EVMTag[] = [];
  const _apes: ApesTag[] = [];
  const _subgraph: SubgraphTag[] = defaultProposalTags;

  switch (type) {
    case "accounts.update-controller":
    case "accounts.update-settings":
    case "accounts.update-fee-settings":
      _evm.push("accounts.endowment");
      break;

    case "accounts.withdraw":
      _evm.push("accounts.token-balance");
      break;

    case "index-fund.remove-fund":
    case "index-fund.create-fund":
    case "index-fund.config":
      _evm.push("index-fund.fund");
      break;

    case "multisig.add-owners":
    case "multisig.remove-owners":
    case "multisig.change-threshold":
    case "multisig.change-auto-execute":
    case "multisig.change-duration":
      _evm.push("multisig-subgraph");
      break;

    case "multisig/review.confirm-prop":
      _evm.push("multisig/review.prop-confirms");
      break;

    case "multisig/review.execute-prop":
      _evm.push("multisig/review.proposal");
      break;

    case "erc20.transfer":
      _apes.push("chain"); //assuming user wallet is beneficiary
      break;

    case "accounts.invest":
    case "accounts.redeem":
      _evm.push("accounts.state");
      break;

    case "accounts.close":
      _evm.push("accounts.endowment");
      break;

    case "registrar.update-config":
    case "registrar.update-owner":
      _evm.push("registrar.config");
      break;
  }

  return [
    invalidateJunoTags(_evm),
    invalidateApesTags(_apes),
    invalidateSubgraphTags(_subgraph),
  ];
}
