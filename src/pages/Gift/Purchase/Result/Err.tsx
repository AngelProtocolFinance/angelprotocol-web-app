import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { TError, setStep } from "slices/gift";
import { appRoutes } from "constants/routes";

export default function Err({ error }: TError) {
  const dispatch = useSetter();

  function goToForm() {
    dispatch(setStep(1));
  }

  return (
    <div className="grid justify-items-center">
      <div className="bg-red rounded-full aspect-square grid place-items-center mb-4 sm:mb-8">
        <Icon type="Exclamation" size={56} className="text-white m-5" />
      </div>

      <h3 className="text-2xl sm:text-3xl mb-4 font-bold text-center">
        Something went wrong!
      </h3>
      <p className="text-center">{error}</p>
      <div className="grid sm:grid-cols-2 mt-12 gap-5 w-full sm:w-auto">
        <Link
          className="w-full btn-gift btn-outline-filled"
          to={appRoutes.marketplace}
        >
          Back to the platform
        </Link>
        <button
          type="button"
          onClick={goToForm}
          className="w-full btn-gift btn-orange"
        >
          Change payment details
        </button>
      </div>
    </div>
  );
}
