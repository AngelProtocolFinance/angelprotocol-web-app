import Icon from "components/Icon";
import { BtnBack, ButtonContinue } from "components/donation";
import { useSetter } from "store/accessors";
import { setStep } from "slices/donation";
import { appRoutes } from "constants/routes";

export default function Success({
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
      <Icon type="CheckCircle" size={80} className="text-[#7EC682] mb-8" />
      <h3 className="text-3xl mb-12 font-bold text-center leading-relaxed">
        Thank you for your donation of{" "}
        <span className="font-extrabold">ETH 0.05</span> to{" "}
        <span className="font-extrabold">mothers2mothers</span>!
      </h3>
      <p className="text-center">
        11The payment wasn’t processed. Please double check your payment details
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
