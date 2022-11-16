import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegState } from "services/aws/registration/StepGuard";
import Loader from "components/Loader";
import { Button } from "../../common";

export default function ButtonSection({ classes = "" }: { classes?: string }) {
  const { nav, data } = useRegState<2>();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className={`flex justify-center ${classes}`}>
      {isSubmitting ? (
        <Loader bgColorClass="bg-white" widthClass="w-4" gapClass="gap-1" />
      ) : (
        <>
          <Link
            className="btn-outline-blue w-48 h-12 mr-2"
            to={`../${nav.back}`}
            state={data.init}
          >
            Back
          </Link>
          <Button submit className="btn-orange w-48 h-12">
            Upload
          </Button>
        </>
      )}
    </div>
  );
}
