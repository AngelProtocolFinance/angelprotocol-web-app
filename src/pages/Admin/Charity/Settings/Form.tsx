import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { DonateMethods, fill, order } from "components/DonateMethods";
import { LockedSplitSlider } from "components/donation";
import { CheckField, Field, Form as _Form } from "components/form";
import { useController, useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import type { Endowment, EndowmentSettingsAttributes } from "types/aws";
import type { TDonateMethod } from "types/components";
import { array, string } from "yup";
import { useUpdateEndowment } from "../common";
import HideBGTipCheckbox from "./HideBGTipCheckbox";
import ReceiptMsg from "./ReceiptMsg";
import { MAX_RECEIPT_MSG_CHAR } from "./constants";
import type { FV } from "./types";

type Props = Pick<Endowment, "id" | EndowmentSettingsAttributes>;
const PAYOUT_MIN_USD = 50;

export default function Form(props: Props) {
  const updateEndow = useUpdateEndowment();

  const methods = useForm({
    resolver: yupResolver(
      schema<FV>({
        receiptMsg: string().max(MAX_RECEIPT_MSG_CHAR, "exceeds max"),
        payout_minimum: stringNumber(
          (s) => s.required("required"),
          (n) => n.min(PAYOUT_MIN_USD, `must be greater than ${PAYOUT_MIN_USD}`)
        ),
        donateMethods: array().test(
          "",
          "at least one payment option should be active",
          (values) => {
            return values?.some((v) => !(v as TDonateMethod).disabled);
          }
        ),
      })
    ),
    values: {
      receiptMsg: props.receiptMsg ?? "",
      sfCompounded: props.sfCompounded ?? false,
      hide_bg_tip: props.hide_bg_tip ?? false,
      programDonateDisabled: !(props.progDonationsAllowed ?? true),
      splitLockPct: 100 - (props.splitLiqPct ?? 50),
      splitFixed: props.splitFixed ?? false,
      payout_minimum: `${props.payout_minimum ?? 50}`,
      donateMethods: fill(props.donateMethods),
      fundOptIn: props.fund_opt_in ?? false,
    },
  });

  const {
    reset,
    handleSubmit,
    resetField,
    formState: { isSubmitting, isDirty, errors },
    control,
  } = methods;

  const { field: splitLockPct } = useController<FV, "splitLockPct">({
    control,
    name: "splitLockPct",
  });

  const { field: donateMethods } = useController<FV, "donateMethods">({
    control,
    name: "donateMethods",
  });

  return (
    <_Form
      disabled={isSubmitting}
      methods={methods}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      onSubmit={handleSubmit(
        async ({
          programDonateDisabled,
          splitLockPct,
          payout_minimum,
          donateMethods: dms,
          fundOptIn,
          ...fv
        }) => {
          const ordered = order(dms);
          const ids = ordered.filter((m) => !m.disabled).map((m) => m.id);

          await updateEndow({
            ...fv,
            fund_opt_in: fundOptIn,
            progDonationsAllowed: !programDonateDisabled,
            splitLiqPct: 100 - splitLockPct,
            id: props.id,
            payout_minimum: +payout_minimum,
            donateMethods: order(ids),
          });

          /** manually re-set the `methods` to trigger animation which doesnt' trigger in ff scenario
           *  1. init order-a: [ stripe, daf, crypto, stocks ]
           *  2. reordered [stripe, crypto, stocks, daf]
           *  3. submit: becomes order-a (no change - animation doesn't run)
           */
          await new Promise((r) => setTimeout(r, 1000));
          resetField("donateMethods", { defaultValue: ordered });
        }
      )}
      className="w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6"
    >
      <ReceiptMsg />

      <div>
        <CheckField<FV> name="sfCompounded" classes={{ label: "font-medium" }}>
          Reinvest dividends from Sustainability Fund
        </CheckField>
        <p className="text-xs sm:text-sm text-navy-l1 italic mt-1">
          Let your dividends work harder for you! By reinvesting growth, you're
          giving your Sustainability Fund balance a boost and ensuring your
          mission has the support it needs to thrive. Your funds remain
          available to you as needed.
        </p>
      </div>

      <div>
        <CheckField<FV>
          name="programDonateDisabled"
          classes={{ label: "font-medium" }}
        >
          Disable Program-based donations
        </CheckField>
        <p className="text-xs sm:text-sm text-navy-l1 italic mt-1">
          Program-based donations are allowed by default, enabling donors to
          select a specifc Program they wish to put their donation towards. You
          may opt-in or out of Program-based donations at any time.
        </p>
      </div>

      <HideBGTipCheckbox />

      <div>
        <CheckField<FV> name="fundOptIn" classes="font-medium">
          Include nonprofit as a potential member for Fundraisers
        </CheckField>
        <p className="text-xs sm:text-sm text-navy-l1 italic mt-1">
          Inclusion as an eligible Fundraiser Index member is optional for all
          Better Giving Nonprofits. By opting in, this nonprofit will appear in
          the search area of the Fundraiser Builder, will be able to be added to
          a Fundraiser, and will receive funds donated via Fundraisers of which
          the nonprofit is a member.
        </p>
      </div>

      <Field
        placeholder={`$${PAYOUT_MIN_USD}`}
        required
        name="payout_minimum"
        label="Payout Minimum"
        classes={{
          label: "font-medium text-base",
        }}
        tooltip={
          <span className="text-navy-l1 text-sm italic">
            Minimum amount of funds your current account must reach before
            triggering a Payout to your Nonprofit's connected Bank Account. For
            example, it can be useful to reduce the total number of payments
            made if the receiving bank charges a fee per deposit transaction.
          </span>
        }
      />

      <h5 className="mt-12 text-2xl">Marketplace settings</h5>

      <label className="mt-2 font-medium">Define default split value:</label>
      <LockedSplitSlider
        onChange={splitLockPct.onChange}
        value={splitLockPct.value}
      />
      <div className="mt-2">
        <CheckField<FV> name="splitFixed" classes="font-medium">
          Disable changing the split value
        </CheckField>
        <p className="text-xs sm:text-sm italic text-navy-l1 mt-2">
          Disabling the Split Value means donors will not be able to change it
          from the default set on the slider above. Checking this box will hide
          the split screen entirely.
        </p>
      </div>

      <DonateMethods
        classes={{
          container: "mt-8",
          label: "font-medium",
          tooltip: "italic text-sm",
        }}
        values={donateMethods.value}
        onChange={donateMethods.onChange}
        error={
          <ErrorMessage
            name="donateMethods"
            as="p"
            errors={errors}
            className="text-red text-sm mb-1"
          />
        }
      />

      <div className="flex gap-3 mt-8">
        <button
          type="reset"
          className="px-6 btn-outline-filled text-sm"
          disabled={!isDirty}
        >
          Reset changes
        </button>
        <button
          type="submit"
          className="px-6 btn-blue text-sm"
          disabled={!isDirty}
        >
          Submit changes
        </button>
      </div>
    </_Form>
  );
}
