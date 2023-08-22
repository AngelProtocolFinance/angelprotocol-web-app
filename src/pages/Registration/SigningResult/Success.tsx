import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import routes, { steps } from "../routes";

export default function Success() {
  return (
    <>
      <Icon type="CheckCircle" className="text-green" size={70} />
      <h1 className="text-2xl uppercase text-center mt-10 mb-4">
        Signature saved!
      </h1>

      <Link
        className="w-full max-w-[26.25rem] btn-orange btn-reg mt-4"
        to={`${appRoutes.register}/${routes.steps}/${steps.summary}`}
      >
        Continue
      </Link>
    </>
  );
}
