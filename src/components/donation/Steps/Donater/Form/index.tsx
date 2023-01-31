import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { matchRoutes, useLocation } from "react-router-dom";
import { DonateValues } from "../types";
import { BtnPrimary, BtnSec } from "components/donation";
import { useGetter } from "store/accessors";
import { setDetails } from "slices/donation";
import { appRoutes } from "constants/routes";
import AdvancedOptions from "./AdvancedOptions";
import Amount from "./Amount";

// import AmountOptions from "./AmountOptions";

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

  const dispatch = useDispatch();

  function submit(data: DonateValues) {
    dispatch(setDetails(data));
    reset();
  }

  const wasCompleted = !!getValues("token.amount");

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      <Amount />
      {/*<AmountOptions classes="mt-3" />*/}
      {!props.hideAdvOpts && (
        <AdvancedOptions classes="mt-10" unfold={props.unfoldAdvOpts} />
      )}

      <div
        className={`flex ${
          isInsideWidget ? "justify-center" : "justify-between"
        } font-body mt-8 md:mt-12`}
      >
        {!isInsideWidget && (
          <BtnSec
            as="link"
            className="w-44"
            to={`${appRoutes.profile}/${endowId}`}
          >
            Cancel
          </BtnSec>
        )}
        <BtnPrimary
          className="w-44"
          disabled={
            !isValid || (wasCompleted ? false : !isDirty) || isSubmitting
          }
          type="submit"
        >
          Continue
        </BtnPrimary>
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
