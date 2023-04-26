import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { matchRoutes, useLocation } from "react-router-dom";
import { DonateValues as DV } from "../types";
import CountrySelector from "components/CountrySelector";
import TokenField from "components/TokenField";
import { Label } from "components/form";
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
    resetField,
    handleSubmit,
    getValues,
    watch,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<DV>();

  const isInsideWidget = useIsInsideWidget();

  const endowId = useGetter((state) => state.donation.recipient?.id);

  const dispatch = useDispatch();

  function submit(data: DV) {
    dispatch(setDetails(data));
    reset();
  }

  const wasCompleted = !!getValues("token.amount");

  const tokenType = watch("token.type");

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      <TokenField<DV, "token">
        name="token"
        tokens={getValues("tokens")}
        withGiftcard
        withBalance
        label="Enter the donation amount:"
        classes={{ label: "text-lg", inputContainer: "dark:bg-blue-d6" }}
      />

      {tokenType === "fiat" && (
        <>
          <h4 className="font-bold text-sm">Enter your payment details:</h4>
          <Label className="mb-2" htmlFor="country">
            Country of Residence *
          </Label>
          <CountrySelector<DV, "country">
            placeholder="Select a country"
            fieldName="country"
            onReset={() => resetField("country")}
            classes={{
              container: "px-4 dark:bg-blue-d6",
              input: "py-3.5 placeholder:text-sm",
              error: "field-error",
            }}
          />
        </>
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
          disabled={
            !isValid || (wasCompleted ? false : isDirty) || isSubmitting
          }
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
