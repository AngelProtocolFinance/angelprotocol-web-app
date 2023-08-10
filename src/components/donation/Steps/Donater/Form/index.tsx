import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { matchRoutes, useLocation } from "react-router-dom";
import { DonateValues } from "../types";
import TokenField from "components/TokenField";
import { CheckField } from "components/form";
import { useGetter } from "store/accessors";
import { setDetails } from "slices/donation";
import { appRoutes } from "constants/routes";
import AdvancedOptions from "./AdvancedOptions";

export default function Form(props: {
  hideAdvOpts: boolean;
  unfoldAdvOpts: boolean;
}) {
  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<DonateValues>();

  const isInsideWidget = useIsInsideWidget();

  const endowId = useGetter((state) => state.donation.recipient?.id);
  const isKYCRequired = useGetter(
    (state) => state.donation.recipient?.isKYCRequired
  );

  const dispatch = useDispatch();

  function submit(data: DonateValues) {
    dispatch(setDetails(data));
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      <TokenField<DonateValues, "token">
        name="token"
        tokens={getValues("tokens")}
        withGiftcard
        label="Enter the donation amount:"
      />

      {!isKYCRequired && (
        // if KYC is required, KYC form is automatically shown on next step
        <CheckField<DonateValues>
          name="userOptForKYC"
          classes={{
            container: "text-sm",
            error: "mt-2",
          }}
        >
          Please send me a tax receipt
        </CheckField>
      )}
      {!props.hideAdvOpts && (
        <AdvancedOptions classes="mt-10" unfold={props.unfoldAdvOpts} />
      )}

      <div
        className={`flex gap-3 md:gap-5 ${
          isInsideWidget ? "justify-center" : "justify-between"
        } font-body mt-8 md:mt-12`}
      >
        {!isInsideWidget && (
          <Link
            className="btn-outline-filled btn-donate w-1/2"
            to={`${appRoutes.profile}/${endowId}`}
          >
            Cancel
          </Link>
        )}
        <button
          className="btn-orange btn-donate w-1/2"
          //make sure that fields doesn't make form dirty on initial load
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

function useIsInsideWidget() {
  const location = useLocation();

  const isInsideWidget = !!matchRoutes(
    [{ path: appRoutes.donate_widget + "/:id" }],
    location
  );

  return isInsideWidget;
}
