import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FundCreatorValues as V } from "pages/Admin/types";
import { DivContainer, Label, Submitter, TextInput } from "components/admin";
import { INIT_SPLIT } from ".";
import MemberAdder from "./MemberAdder";
import useCreateFund from "./useCreateFund";

export default function Form() {
  const { createFund, cw3MemberCount } = useCreateFund();
  return (
    <DivContainer>
      <TextInput title="Proposal Title" name="title" required />
      <TextInput
        title="proposal description"
        name="description"
        wide
        required
      />
      <TextInput<V> title="fund name" name="fundName" required />
      <TextInput<V>
        title="fund description"
        name="fundDescription"
        wide
        required
      />
      <TextInput<V>
        title="expiry height"
        name="expiryHeight"
        placeholder="700992312"
        mono
      />
      <DateInput />
      <Slider />
      <CheckInput />
      <Label className="text-green-l1">Add members</Label>
      <MemberAdder />

      <Submitter type="button" onClick={createFund} _classes="mt-4">
        Submit{cw3MemberCount > 1 ? "proposal" : ""}
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
    <div className="text-gray-d2 grid mt-6">
      <label className="mb-2 text-xs font-heading uppercase font-bold text-gray-d2 select-none">
        <span>SPLIT TO LIQUID ACCOUNT</span>
        <span className="font-mono font-bold text-green-d1 ml-2 text-base">
          {splitToLiq === INIT_SPLIT ? "--" : splitToLiq + "%"}
        </span>
        <button onClick={unspecifySplit} className="font-mono ml-1">
          reset
        </button>
      </label>
      <div className="p-3 rounded-md bg-gray-l3 shadow-inner-white">
        <input
          {...register("splitToLiquid")}
          className="w-full"
          type="range"
          min="0"
          max="100"
          step="1"
        />
      </div>
    </div>
  );
}

function CheckInput() {
  const { register } = useFormContext<V>();
  return (
    <div
      className="text-gray-d2 flex items-center p-3 rounded-md 
    shadow-inner-white bg-gray-l3 my-6"
    >
      <input
        {...register("isFundRotating")}
        type="checkbox"
        className="mr-2"
        id="__checkInput"
      />
      <label
        htmlFor="__checkInput"
        className="text-xs font-heading uppercase font-bold text-gray-d2
        select-none cursor-pointer"
      >
        included on fund rotation
      </label>
    </div>
  );
}

function DateInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<V>();
  return (
    <div className="text-gray-d2 grid">
      <label
        htmlFor="__dateInput"
        className="mb-2 text-xs font-heading uppercase font-bold text-gray-d2 select-none"
      >
        Expiry time
      </label>
      <input
        {...register("expiryTime")}
        id="__dateInput"
        type="datetime-local"
        className="font-mono uppercase bg-gray-l3 shadow-inner-white 
        rounded-md p-3 focus:outline-none"
      />
      <ErrorMessage
        errors={errors}
        name={"expiryTime"}
        as="span"
        className="font-mono font-semibold text-right text-red-l1 text-xs m-1"
      />
    </div>
  );
}
