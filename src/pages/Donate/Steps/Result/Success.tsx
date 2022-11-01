import Icon from "components/Icon";
import { BtnPrimary, BtnSec } from "components/donation";
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
      <p className="text-center mb-8">
        If you requested it, a tax receipt has been sent to the email address
        provided.
      </p>
      <div className="grid grid-cols-2 gap-5 w-full">
        <BtnSec as="btn">Download receipt</BtnSec>
        <BtnSec as="link" to={appRoutes.profile + `/${endowId}`}>
          View transaction
        </BtnSec>
      </div>
      <div className="h-20 grid place-items-center my-12 dark:bg-blue-d7 rounded border dark:border-bluegray-d1 w-full">
        socials
      </div>

      <BtnPrimary as="link" to={appRoutes.profile + `/${endowId}`}>
        Back to the platform
      </BtnPrimary>
    </div>
  );
}
