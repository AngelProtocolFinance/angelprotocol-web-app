import Icon from "components/Icon";
import { GENERIC_ERROR_MESSAGE } from "constants/common";

export default function DefaultFallback({ error = GENERIC_ERROR_MESSAGE }) {
  return (
    <div className="grid place-items-center content-center gap-6 p-4">
      <Icon type="ExclamationCircleFill" className="text-red text-[2em]" />
      <p className="text-center">{error}</p>
    </div>
  );
}
