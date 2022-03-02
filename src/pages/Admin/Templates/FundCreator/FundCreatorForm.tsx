import { useFormContext } from "react-hook-form";
import TextInput from "../../TextInput";
import Label from "../../Label";
import { FundCreatorValues as V } from "./fundCreatorSchema";
import MemberAdder from "./MemberAdder/MemberAdder";
import useCreateFund from "./useCreateFund";
import { INIT_SPLIT } from "./FundCreator";

export default function FundCreatorForm() {
  const { createFund } = useCreateFund();
  return (
    <div className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey">
      <TextInput title="Proposal Title" name="title" />
      <TextInput title="proposal description" name="description" wide />
      <TextInput<V> title="fund name" name="fundName" />
      <TextInput<V> title="fund description" name="fundDescription" wide />
      <TextInput<V>
        title="expiry height"
        name="expiryHeight"
        placeholder="700992312"
        mono
      />
      <DateInput />
      <Slider />
      <CheckInput />
      <Label text="add members" textColor="text-green-400" />
      <MemberAdder />

      <button
        type="button"
        onClick={createFund}
        className="justify-self-center text-blue-accent hover:text-angel-blue uppercase text-white font-extrabold mt-4"
      >
        Propose changes
      </button>
    </div>
  );
}

function Slider() {
  const { register, watch, setValue } = useFormContext<V>();
  const splitToLiq = watch("splitToLiquid");

  function unspecifySplit() {
    setValue("splitToLiquid", INIT_SPLIT);
  }

  return (
    <div className="text-angel-grey grid mt-6">
      <label className="mb-2 text-xs font-heading uppercase font-bold text-angel-grey select-none">
        <span>SPLIT TO LIQUID ACCOUNT</span>
        <span className="font-mono font-bold text-green-500 ml-2 text-base">
          {splitToLiq === INIT_SPLIT ? "--" : splitToLiq + "%"}
        </span>
        <button onClick={unspecifySplit} className="font-mono ml-1">
          reset
        </button>
      </label>
      <div className="p-3 rounded-md bg-light-grey shadow-inner-white-grey">
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
      className="text-angel-grey flex items-center p-3 rounded-md 
    shadow-inner-white-grey bg-light-grey my-6"
    >
      <input
        {...register("isFundRotating")}
        type="checkbox"
        className="mr-2"
        id="__checkInput"
      />
      <label
        htmlFor="__checkInput"
        className="text-xs font-heading uppercase font-bold text-angel-grey
        select-none cursor-pointer"
      >
        included on fund rotation
      </label>
    </div>
  );
}

function DateInput() {
  const { register } = useFormContext<V>();
  return (
    <div className="text-angel-grey grid">
      <label
        htmlFor="__dateInput"
        className="mb-2 text-xs font-heading uppercase font-bold text-angel-grey select-none"
      >
        Expiry time
      </label>
      <input
        {...register("expiryTime")}
        id="__dateInput"
        type="datetime-local"
        className="font-mono uppercase bg-light-grey shadow-inner-white-grey 
        rounded-md p-3 focus:outline-none"
      />
    </div>
  );
}
