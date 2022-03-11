import Loader from "components/Loader/Loader";
import { useFormContext } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "../common";
import routes from "../routes";

export default function ButtonSection() {
  const history = useHistory();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="flex justify-center">
      {isSubmitting ? (
        <Loader bgColorClass="bg-white" widthClass="w-3" gapClass="gap-1" />
      ) : (
        <>
          <Button
            className="bg-green-400 w-48 h-12 mr-2"
            onClick={() => history.push(routes.dashboard)}
          >
            Back
          </Button>
          <Button submit className="bg-thin-blue w-48 h-12">
            Submit
          </Button>
        </>
      )}
    </div>
  );
}
