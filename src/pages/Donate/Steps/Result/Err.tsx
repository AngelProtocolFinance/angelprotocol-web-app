import Icon from "components/Icon";
import { BtnBack, ButtonContinue } from "components/donation";
import { useSetter } from "store/accessors";
import { setStep } from "slices/donation";
import { appRoutes } from "constants/routes";

export default function Err({
  classes = "",
  endowId,
}: {
  classes?: string;
  endowId: number;
}) {
  const dispatch = useSetter();

  function goToForm() {
    dispatch(setStep(1));
  }

  return (
    <div className={`grid justify-items-center ${classes}`}>
      <Icon
        type="ExclamationCircleFill"
        size={113}
        className="text-[#F15A21] mb-8"
      />
      <h3 className="text-3xl mb-12 font-bold">Something went wrong!</h3>
      <p className="text-center">
        The payment wasn’t processed. Please double check your payment details
        or change your payment method and try again.
      </p>
      <div className="grid grid-cols-2 mt-12 gap-5">
        <BtnBack as="link" to={appRoutes.profile + `/${endowId}`}>
          Back to the platform
        </BtnBack>
        <ButtonContinue onClick={goToForm}>
          Change payment details
        </ButtonContinue>
      </div>
    </div>
  );
}
