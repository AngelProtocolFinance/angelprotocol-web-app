import { useFormContext } from "react-hook-form";
import { steps } from "pages/Registration/routes";
import { useRegState } from "services/aws/registration/StepGuard";
import { BtnPrim, BtnSec } from "components/registration";

export default function ButtonSection({ classes = "" }: { classes?: string }) {
  const { data } = useRegState<2>();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className={`flex justify-center ${classes}`}>
      <BtnSec as="link" to={`../${steps.contact}`} state={data.init}>
        Back
      </BtnSec>
      <BtnPrim type="submit" disabled={isSubmitting}>
        Continue
      </BtnPrim>
    </div>
  );
}
