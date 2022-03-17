import Loader from "components/Loader/Loader";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../common";
import routes, { registerRootPath } from "../routes";

export default function ButtonSection() {
  const navigate = useNavigate();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="flex justify-center">
      {isSubmitting ? (
        <Loader bgColorClass="bg-white" widthClass="w-4" gapClass="gap-1" />
      ) : (
        <>
          <Button
            className="bg-green-400 w-48 h-12 mr-2"
            onClick={() => navigate(`${registerRootPath}/${routes.dashboard}`)}
          >
            Back
          </Button>
          <Button submit className="bg-thin-blue w-48 h-12">
            Upload
          </Button>
        </>
      )}
    </div>
  );
}
