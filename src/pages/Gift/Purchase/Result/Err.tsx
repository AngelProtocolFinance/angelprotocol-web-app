import Icon from "components/Icon";
import { BtnPrim, BtnSec } from "components/gift";
import { useSetter } from "store/accessors";
import { TError, setStep } from "slices/gift";
import { appRoutes } from "constants/routes";

export default function Err({ error }: TError) {
  const dispatch = useSetter();

  function goToForm() {
    dispatch(setStep(1));
  }

  return (
    <div className="grid justify-items-center">
      <div className="bg-red rounded-full aspect-square grid place-items-center mb-4 sm:mb-8">
        <Icon type="Exclamation" size={56} className="text-white m-5" />
      </div>

      <h3 className="text-2xl sm:text-3xl mb-4 font-bold text-center">
        Something went wrong!
      </h3>
      <p className="text-center">{error}</p>
      <div className="grid sm:grid-cols-2 mt-12 gap-5 w-full sm:w-auto">
        <BtnSec as="link" to={appRoutes.marketplace} className="w-full">
          Back to the platform
        </BtnSec>
        <BtnPrim onClick={goToForm} className="w-full">
          Change payment details
        </BtnPrim>
      </div>
    </div>
  );
}
