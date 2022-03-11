import Loader from "components/Loader/Loader";
import { useFormContext } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "../common";
import routes from "../routes";
import { FormValues } from "./types";

export default function ButtonSection() {
  const history = useHistory();
  const {
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  if (isSubmitting) {
    return <Loader bgColorClass="bg-white" widthClass="w-3" gapClass="gap-1" />;
  }

  return (
    <div className="flex justify-center">
      <Button
        className="w-48 h-12 bg-green-400 mr-2"
        onClick={() => history.push(routes.dashboard)}
      >
        Back
      </Button>
      <Button submit className="w-48 h-12 bg-thin-blue">
        Upload
      </Button>
    </div>
  );
}
