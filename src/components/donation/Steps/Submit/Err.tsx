import Icon from "components/Icon";
import { GENERIC_ERROR_MESSAGE } from "constants/common";

type Props = {
  msg?: string;
};
export default function Err({ msg = GENERIC_ERROR_MESSAGE }: Props) {
  return (
    <div className="grid place-items-center content-center gap-6 p-4 @md:p-8">
      <Icon type="ExclamationCircleFill" size={60} className="text-red" />
      <p className="text-center">{msg}</p>
    </div>
  );
}
