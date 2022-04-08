import EndowmentStatusUpdate from "./EndowmentStatusUpdate";
import { ProposalMeta } from "../../../types";
import CWMemberUpdate from "./CWMemberUpdate";
import Withdraw from "./Withdraw";
import Fund from "./Fund";
import AllianceUpdate from "./AllianceUpdate";
import FundMemberUpdate from "./FundMemberUpdate";
import { proposalTypes } from "constants/routes";
import FundTransfer from "./FundTransfer";
import DiffTable from "./DiffTable";
import RegistrarOwner from "./RegistrarOwner";

export default function Preview(props: ProposalMeta) {
  switch (props.type) {
    case proposalTypes.endowment_withdraw:
      return <Withdraw {...props.data} />;
    case proposalTypes.endowment_updateStatus:
      return <EndowmentStatusUpdate {...props.data} />;
    case proposalTypes.adminGroup_updateMembers:
      return <CWMemberUpdate {...props.data} />;
    case proposalTypes.adminGroup_updateCW3Config:
      return <DiffTable diffSet={props.data} />;
    case proposalTypes.adminGroup_fundTransfer:
      return <FundTransfer {...props.data} />;
    case proposalTypes.indexFund_createFund:
      return <Fund {...props.data} />;
    case proposalTypes.indexFund_removeFund:
      return <Fund {...props.data} />;
    case proposalTypes.indexFund_allianceEdits:
      return <AllianceUpdate {...props.data} />;
    case proposalTypes.indexFund_updateFundMembers:
      return <FundMemberUpdate {...props.data} />;
    case proposalTypes.indexFund_configUpdate:
      return <DiffTable diffSet={props.data} />;
    case proposalTypes.registrar_updateConfig:
      return <DiffTable diffSet={props.data} />;
    case proposalTypes.registrar_updateOwner:
      return <RegistrarOwner {...props.data} />;

    default:
      return <div className="p-2">no preview</div>;
  }
}
