import { StatusProps } from "./types";
import Icon from "components/Icon";
import { Status } from "./Status";

export default function LoadingStatus(props: StatusProps) {
  return <Status icon={<Icon type="Loading" className="" />} />;
}
