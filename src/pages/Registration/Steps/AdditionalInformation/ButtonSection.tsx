import { useFormContext } from "react-hook-form";
import { steps } from "pages/Registration/routes";
import { useRegState } from "services/aws/registration/StepGuard";
import { BtnPrim, BtnSec } from "components/registration";

export default function ButtonSection() {
  const { data } = useRegState<3>();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="flex justify-center mt-4 gap-4">
      <BtnSec
        as="link"
        to={`../${steps.doc}`}
        state={data.init}
        disabled={isSubmitting}
        className="min-w-[10rem]"
      >
        Back
      </BtnSec>
      <BtnPrim type="submit" disabled={isSubmitting} className="min-w-[10rem]">
        Continue
      </BtnPrim>
    </div>
  );
}
