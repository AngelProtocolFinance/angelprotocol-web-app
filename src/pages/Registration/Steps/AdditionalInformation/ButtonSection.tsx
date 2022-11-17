import { useFormContext } from "react-hook-form";
import { steps } from "pages/Registration/routes";
import { useRegState } from "services/aws/registration/StepGuard";
import { BtnSec } from "components/donation";
import { BtnPrim } from "components/registration";

export default function ButtonSection() {
  const { data } = useRegState<3>();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="flex justify-center mt-4">
      <BtnSec as="link" to={`../${steps.doc}`} state={data.init}>
        Back
      </BtnSec>
      <BtnPrim type="submit" disabled={isSubmitting}>
        Continue
      </BtnPrim>
    </div>
  );
}
