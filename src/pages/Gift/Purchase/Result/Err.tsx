import Icon from "components/Icon";
import { BtnPrimary, BtnSec } from "components/donation";
import { useSetter } from "store/accessors";
import { setStep } from "slices/gift";
import { appRoutes } from "constants/routes";

type Props = { msg: string; classes?: string };

export default function Err({ classes = "", msg }: Props) {
  const dispatch = useSetter();

  function goToForm() {
    dispatch(setStep(1));
  }

  return (
    <div className={`grid justify-items-center ${classes}`}>
      <div className="bg-red rounded-full aspect-square grid place-items-center mb-8">
        <Icon type="Exclamation" size={45} className="text-white m-5" />
      </div>

      <h3 className="text-2xl sm:text-3xl mb-4 sm:mb-12 font-bold text-center">
        Something went wrong!
      </h3>
      <p className="text-center">{msg}</p>
      <div className="grid sm:grid-cols-2 mt-12 gap-5 w-full sm:w-auto">
        <BtnSec as="link" to={appRoutes.marketplace} className="w-full">
          Back to the platform
        </BtnSec>
        <BtnPrimary onClick={goToForm} className="w-full">
          Change payment details
        </BtnPrimary>
      </div>
    </div>
  );
}
