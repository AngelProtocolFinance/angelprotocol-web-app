import { ProposalMeta } from "@types-page/admin";
import AllianceUpdate from "./AllianceUpdate";
import CWMemberUpdate from "./CWMemberUpdate";
import DiffTable from "./DiffTable";
import EndowmentStatusUpdate from "./EndowmentStatusUpdate";
import Fund from "./Fund";
import FundMemberUpdate from "./FundMemberUpdate";
import FundTransfer from "./FundTransfer";
import OwnerUpdate from "./OwnerUpdate";
import Withdraw from "./Withdraw";

export default function Preview(props: ProposalMeta) {
  switch (props.type) {
    /**_indexfund */
    case "indexfund-alliance-edit":
      return <AllianceUpdate {...props.data} />;
    case "indexfund-create-fund":
      return <Fund {...props.data} />;
    case "indexfund-remove-fund":
      return <Fund {...props.data} />;
    case "indexfund-update-fund-members":
      return <FundMemberUpdate {...props.data} />;
    case "indexfund-config-update":
      return <DiffTable diffSet={props.data} />;
    case "indexfund-owner-update":
      return <OwnerUpdate {...props.data} />;

    /** _admin-group */
    case "admin-group-update-members":
      return <CWMemberUpdate {...props.data} />;
    case "admin-group-update-cw3-config":
      return <DiffTable diffSet={props.data} />;
    case "admin-group-fund-transfer":
      return <FundTransfer {...props.data} />;

    /** _endowment-group */
    case "endowment-update-status":
      return <EndowmentStatusUpdate {...props.data} />;
    case "endowment-withdraw":
      return <Withdraw {...props.data} />;
    case "endowment-update-profile":
      return <DiffTable diffSet={props.data} />;

    case "registrar-update-config":
      return <DiffTable diffSet={props.data} />;
    case "registrar-update-owner":
      return <OwnerUpdate {...props.data} />;
    default:
      return <div className="p-2">no preview</div>;
  }
}
