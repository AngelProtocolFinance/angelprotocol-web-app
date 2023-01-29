import { useFormContext } from "react-hook-form";
import { FundCreatorValues as V } from "pages/Admin/types";
import Checkbox from "components/Checkbox";
import { DivContainer, Submitter } from "components/admin";
import { Field, Label } from "components/form";
import { INIT_SPLIT } from ".";
import MemberAdder from "./MemberAdder";
import useCreateFund from "./useCreateFund";

export default function Form() {
  const { createFund } = useCreateFund();
  return (
    <DivContainer>
      <Field<V>
        classes="field-admin"
        label="Proposal title"
        name="title"
        required
      />
      <Field<V, "textarea">
        type="textarea"
        classes="field-admin"
        label="Proposal description"
        name="description"
        required
      />
      <Field<V>
        classes="field-admin"
        label="Fund name"
        name="fundName"
        required
      />
      <Field<V, "textarea">
        type="textarea"
        classes="field-admin"
        label="Fund description"
        name="fundDescription"
        required
      />
      <Field<V>
        classes="field-admin"
        label="Expiry height"
        name="expiryHeight"
        placeholder="700992312"
      />
      <Field<V, "datetime-local">
        classes="field-admin"
        type="datetime-local"
        label="Expiry time"
        name="expiryHeight"
      />
      <Slider />
      <Checkbox<V>
        name="isFundRotating"
        classes={{
          container:
            "p-3 text-sm rounded bg-orange-l6 dark:bg-blue-d7 grid items-center border border-prim",
        }}
      >
        Included on fund rotation
      </Checkbox>
      <Label className="text-green-l1 -mb-4">Add members</Label>
      <MemberAdder />

      <Submitter type="button" onClick={createFund} _classes="mt-4">
        Submit
      </Submitter>
    </DivContainer>
  );
}

function Slider() {
  const { register, watch, setValue } = useFormContext<V>();
  const splitToLiq = watch("splitToLiquid");

  function unspecifySplit() {
    setValue("splitToLiquid", INIT_SPLIT);
  }

  return (
    <div className="grid">
      <Label className="mb-2 text-xs select-none">
        <span>Split to liquid</span>
        <span className="text-green dark:text-green-l2 ml-2 text-sm">
          {splitToLiq === INIT_SPLIT ? "--" : splitToLiq + "%"}
        </span>
        <button onClick={unspecifySplit} className="text-xs ml-1">
          reset
        </button>
      </Label>
      <div className="rounded bg-orange-l6 dark:bg-blue-d7 grid items-center px-4 py-6 border border-prim">
        <input
          {...register("splitToLiquid")}
          type="range"
          min="0"
          max="100"
          step="1"
        />
      </div>
    </div>
  );
}
