import { useFormContext } from "react-hook-form";
import { steps } from "pages/Registration/routes";
import { BtnPrim, BtnSec } from "components/registration";
import { useRegState } from "../StepGuard";

export default function ButtonSection({ classes = "" }: { classes?: string }) {
  const { data } = useRegState<2>();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className={`flex justify-center ${classes} gap-4`}>
      <BtnSec
        as="link"
        to={`../${steps.contact}`}
        state={data.init}
        disabled={isSubmitting}
        className="min-w-[8rem]"
      >
        Back
      </BtnSec>
      <BtnPrim type="submit" disabled={isSubmitting} className="min-w-[8rem]">
        Continue
      </BtnPrim>
    </div>
  );
}
