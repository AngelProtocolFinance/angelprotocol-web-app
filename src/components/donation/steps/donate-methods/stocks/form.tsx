import { yupResolver } from "@hookform/resolvers/yup";
import { Field, Form as FormContainer } from "components/form";
import { useController, useForm } from "react-hook-form";
import { optionType, schema, stringNumber } from "schemas/shape";
import { requiredString } from "schemas/string";
import ContinueBtn from "../../common/continue-btn";
import { ProgramSelector } from "../../common/program-selector";
import { useDonationState } from "../../context";
import type { StockFormStep, StocksDonationDetails } from "../../types";
import { nextFormState } from "../helpers";

type FV = Omit<StocksDonationDetails, "method" | "numShares"> & {
  numShares: string;
};

export default function Form(props: StockFormStep) {
  const { setState } = useDonationState();
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: props.details
      ? {
          symbol: props.details.symbol,
          numShares: props.details.numShares.toString(),
          program: props.details.program,
        }
      : {
          symbol: "",
          numShares: "",
          program: { label: "", value: "" },
        },
    resolver: yupResolver(
      schema<FV>({
        symbol: requiredString.trim(),
        numShares: stringNumber(
          (s) => s.required("required"),
          (n) => n.positive("must be greater than 0")
        ),
        program: optionType(),
      })
    ),
  });

  const { field: program } = useController<FV, "program">({
    control: control,
    name: "program",
  });

  return (
    <FormContainer
      className="grid"
      onSubmit={handleSubmit((fv) =>
        setState((prev) =>
          nextFormState(prev, {
            ...fv,
            method: "stocks",
          })
        )
      )}
    >
      <Field
        required
        {...register("symbol")}
        error={errors.symbol?.message}
        label="Symbol name of share"
        placeholder="Ex. AAPL"
        classes={{
          label: "font-heading font-semibold text-base",
          input: "field-input-donate",
        }}
      />

      <Field
        required
        {...register("numShares")}
        error={errors.numShares?.message}
        label="Number of shares you are donating"
        placeholder="Enter quantity"
        classes={{
          container: "mt-6",
          label: "font-heading font-semibold text-base",
          input: "field-input-donate",
        }}
      />

      {(props.init.recipient.progDonationsAllowed ?? true) && (
        // program not allowed for fund (id string)
        <ProgramSelector
          endowId={+props.init.recipient.id}
          classes="mt-6 mb-4"
          program={program.value}
          onChange={program.onChange}
        />
      )}

      <h4 className="mt-6 mb-2">Benefits of donating appreciated stock</h4>
      <p className="text-sm">
        You can enjoy significant tax advantages and maximize the size of your
        contributions when you transfer securities through Better Giving:
      </p>
      <div className="grid rounded-sm bg-gray-l5 dark:bg-gray-d3 p-2 my-4">
        <span className="text-sm text-gray">
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
      <ContinueBtn disabled={isSubmitting} className="mt-6" type="submit" />
    </FormContainer>
  );
}
