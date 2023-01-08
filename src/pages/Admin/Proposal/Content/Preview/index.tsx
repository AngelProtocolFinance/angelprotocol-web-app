import { ProposalMeta } from "pages/Admin/types";
import AllianceUpdate from "./AllianceUpdate";
import CWMemberUpdate from "./CWMemberUpdate";
import DiffTable from "./DiffTable";
import EndowmentApplication from "./EndowmentApplication";
import EndowmentStatusUpdate from "./EndowmentStatusUpdate";
import Fund from "./Fund";
import FundMemberUpdate from "./FundMemberUpdate";
import FundTransfer from "./FundTransfer";
import OwnerUpdate from "./OwnerUpdate";
import Withdraw from "./Withdraw";

export default function Preview(props: ProposalMeta) {
  switch (props.type) {
    /**_indexfund */
    case "if_alliance":
      return <AllianceUpdate {...props.data} />;
    case "if_create":
      return <Fund {...props.data} />;
    case "if_remove":
      return <Fund {...props.data} />;
    case "if_members":
      return <FundMemberUpdate {...props.data} />;
    case "if_config":
      return <DiffTable diffSet={props.data} />;
    case "if_owner":
      return <OwnerUpdate {...props.data} />;

    /** _cw3 */
    case "cw3_config":
      return <DiffTable diffSet={props.data} />;
    case "cw3_transfer":
      return <FundTransfer {...props.data} />;
    case "cw3_application":
      return <EndowmentApplication {...props.data} />;

    /** _cw4 */
    case "cw4_members":
      return <CWMemberUpdate {...props.data} />;

    /** _account */
    case "acc_withdraw":
      return <Withdraw {...props.data} />;
    case "acc_profile":
      return <DiffTable diffSet={props.data} />;
    case "acc_endow_status":
      return <EndowmentStatusUpdate {...props.data} />;

    /** _registrar */
    case "reg_config":
      return <DiffTable diffSet={props.data} />;
    case "reg_owner":
      return <OwnerUpdate {...props.data} />;
    default:
      return <div className="p-2">no preview</div>;
  }
}
