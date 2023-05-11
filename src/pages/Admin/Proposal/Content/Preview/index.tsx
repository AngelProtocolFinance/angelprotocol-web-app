import { TxMeta } from "contracts/createTx/types";
import DiffTable from "./DiffTable";
import EndowmentApplication from "./EndowmentApplication";
import EndowmentStatusUpdate from "./EndowmentStatusUpdate";
import Fund from "./Fund";
import FundTransfer from "./FundTransfer";
import OwnerUpdate from "./OwnerUpdate";
import Withdraw from "./Withdraw";

export default function Preview(props: TxMeta) {
  switch (props.id) {
    /**_indexfund */
    case "index-fund.create-fund":
      return props.data ? <Fund {...props.data} /> : <></>;
    case "index-fund.remove-fund":
      return <Fund {...props.data} />;

    case "if_owner":
      return <OwnerUpdate {...props.data} />;

    /** _cw3 */
    case "cw3_config":
      return <DiffTable diffSet={props.data} />;
    case "cw3_transfer":
      return <FundTransfer {...props.data} />;
    case "cw3_application":
      return <EndowmentApplication {...props.data} />;

    /** _account */
    case "acc_withdraw":
      return <Withdraw {...props.data} />;

    case "acc_endow_status":
      return <EndowmentStatusUpdate {...props.data} />;

    /** _registrar */
    case "reg_config_extension":
      return <DiffTable diffSet={props.data} />;
    case "reg_owner":
      return <OwnerUpdate {...props.data} />;
    default:
      return <div className="p-2">no preview</div>;
  }
}
