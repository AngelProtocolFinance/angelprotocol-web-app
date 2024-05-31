import { yupResolver } from "@hookform/resolvers/yup";
import { Field, Form as FormContainer } from "components/form";
import { useController, useForm } from "react-hook-form";
import { optionType, schema } from "schemas/shape";
import { requiredString } from "schemas/string";
import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";
import { ProgramSelector } from "../../common/ProgramSelector";
import { EMPTY_PROGRAM } from "../../common/constants";
import type { StockFormStep, StocksDonationDetails } from "../../types";
import { nextFormState } from "../helpers";

type FV = Omit<StocksDonationDetails, "method" | "numShares"> & {
  numShares: string;
};

export default function Form(props: StockFormStep) {
  const { setState } = useDonationState();
  const methods = useForm({
    defaultValues: props.details
      ? {
          symbol: props.details.symbol,
          numShares: props.details.numShares.toString(),
          program: props.details.program,
        }
      : {
          symbol: "",
          numShares: "",
          program: EMPTY_PROGRAM,
        },
    resolver: yupResolver(
      schema<FV>({
        symbol: requiredString.trim(),
        numShares: requiredString.trim().matches(/^[1-9]\d*$/, "invalid"),
        program: optionType(),
      })
    ),
  });

  const { control } = methods;
  const { field: program } = useController<FV, "program">({
    control: control,
    name: "program",
  });

  return (
    <FormContainer
      methods={methods}
      className="grid"
      onSubmit={methods.handleSubmit((fv) =>
        setState((prev) =>
          nextFormState(prev, {
            ...fv,
            method: "stocks",
            numShares: +fv.numShares,
          })
        )
      )}
    >
      <Field<FV>
        required
        name="symbol"
        label="Symbol name of share"
        placeholder="Ex. AAPL"
        classes={{ label: "font-semibold", container: "field-donate" }}
      />

      <Field<FV>
        required
        name="numShares"
        label="Number of shares you are donating"
        placeholder="Enter quantity"
        classes={{
          label: "font-semibold",
          container: "mt-6 field-donate",
          error: "left-0",
        }}
      />

      {(props.init.recipient.progDonationsAllowed ?? true) && (
        <ProgramSelector
          classes="mt-6 mb-4"
          endowId={props.init.recipient.id}
          program={program.value}
          onChange={program.onChange}
        />
      )}

      <h4 className="mt-6 mb-2">Benefits of donating appreciated stock</h4>
      <p className="text-sm">
        You can enjoy significant tax advantages and maximize the size of your
        contributions when you transfer securities through Better Giving:
      </p>
      <div className="grid rounded bg-gray-l5 dark:bg-navy-d3 p-2 my-4">
        <span className="text-sm text-navy-l2">
          NOTE: This is not financial advice! Please speak to your tax advisor
          or broker about your specific situation and country's tax laws.
        </span>
      </div>
      <p className="text-sm">
        If you held the stock for at least one year, you receive a tax deduction
        for the full value of the stock at the time of donation (not just the
        amount you paid for the stock).
      </p>
      <p className="text-sm mt-4">
        You avoid paying both capital gains tax and stock sales commissions.
        When you give appreciated stocks directly to a nonprofit, your gift can
        be up to 20% larger because you avoid the taxes you'd incur from selling
        and donating the cash.
      </p>
      <ContinueBtn
        disabled={methods.formState.isSubmitting}
        className="mt-6"
        type="submit"
      />
    </FormContainer>
  );
}
