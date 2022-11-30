import { useFormContext } from "react-hook-form";
import { FundCreatorValues as V } from "pages/Admin/types";
import Checkbox from "components/Checkbox";
import { DivContainer, Submitter, TextArea, TextPrim } from "components/admin";
import { Label } from "components/form";
import { INIT_SPLIT } from ".";
import MemberAdder from "./MemberAdder";
import useCreateFund from "./useCreateFund";

export default function Form() {
  const { createFund } = useCreateFund();
  return (
    <DivContainer>
      <TextPrim label="Proposal title" name="title" required />
      <TextArea label="Proposal description" name="description" required />
      <TextPrim<V> label="Fund name" name="fundName" required />
      <TextArea<V> label="Fund description" name="fundDescription" required />
      <TextPrim<V>
        label="Expiry height"
        name="expiryHeight"
        placeholder="700992312"
      />
      <TextPrim<V>
        type="datetime-local"
        label="Expiry time"
        name="expiryHeight"
      />
      <Slider />
      <Checkbox<V>
        name="isFundRotating"
        classes={{
          container:
            "p-3 bg-red text-sm rounded bg-orange-l6 dark:bg-blue-d7 grid items-center border border-gray-l2 dark:border-bluegray",
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
      <div className="rounded bg-orange-l6 dark:bg-blue-d7 grid items-center px-4 py-6 border border-gray-l2 dark:border-bluegray">
        <input
          {...register("splitToLiquid")}
          className="w-full slider"
          type="range"
          min="0"
          max="100"
          step="1"
        />
      </div>
    </div>
  );
}
