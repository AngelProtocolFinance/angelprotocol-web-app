import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegState } from "services/aws/registration/StepGuard";
import Loader from "components/Loader";
import { Button } from "../../common";

export default function ButtonSection() {
  const {
    nav,
    data: { init },
  } = useRegState<3>();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="flex justify-center mt-4">
      {isSubmitting ? (
        <Loader bgColorClass="bg-white" widthClass="w-4" gapClass="gap-1" />
      ) : (
        <>
          <Link
            className="btn-outline-blue w-48 h-12 mr-2"
            to={`../${nav.back}`}
            state={init}
          >
            Back
          </Link>
          <Button submit className="btn-orange w-48 h-12">
            Submit
          </Button>
        </>
      )}
    </div>
  );
}
