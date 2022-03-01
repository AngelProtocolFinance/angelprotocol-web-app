import TextInput from "../../TextInput";
import Label from "../../Label";
import { FundCreatorValues as V } from "./fundCreatorSchema";
import { useFormContext } from "react-hook-form";
import useCreateFund from "./useCreateFund";
import { INIT_SPLIT } from "./FundCreator";

export default function FundCreatorForm() {
  const { createFund } = useCreateFund();
  return (
    <div className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey">
      <TextInput title="Proposal Title" name="title" placeholder="title" />
      <TextInput
        title="proposal description"
        name="description"
        placeholder="tell something about your proposal"
        wide
      />

      <Label text="fund details" textColor="text-angel-orange" />
      <div className="shadow-inner-white-grey bg-light-grey rounded-md p-3  mb-6">
        <TextInput<V>
          title="name"
          name="fundName"
          placeholder="A wonderful fund name"
          plain
        />
        <TextInput<V>
          title="description"
          name="fundDescription"
          placeholder="A little something about the fund.."
          wide
          plain
        />
        <TextInput<V>
          title="expiry height"
          name="expiryHeight"
          placeholder="700992312"
          plain
          mono
        />
        <DateInput />
        <Slider />

        <CheckInput />
      </div>

      <Label text="add members" textColor="text-green-400" />

      <div className="shadow-inner-white-grey bg-light-grey rounded-md p-3 grid">
        <TextInput
          title="endowment address"
          name="name"
          placeholder="terra123abc..."
          plain
          mono
        />
        <p>show members here with x</p>
        <button className="justify-self-end text-green-400 font-bold text-sm">
          + add member
        </button>
      </div>

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
        <span className="text-base font-bold mr-1">%</span>
        <span>SPLIT TO LIQUID ACCOUNT</span>
        <span className="font-mono font-bold text-green-500 ml-2 text-base ">
          [{splitToLiq === INIT_SPLIT ? "--" : splitToLiq + "%"}]
        </span>
        <button onClick={unspecifySplit} className="font-mono">
          reset
        </button>
      </label>
      <input
        {...register("splitToLiquid")}
        type="range"
        min="0"
        max="100"
        step="1"
      />
    </div>
  );
}

function CheckInput() {
  const { register } = useFormContext<V>();
  return (
    <div className="text-angel-grey flex items-center mt-6">
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
        className="bg-light-grey border-b-2 border-opacity-30 border-angel-grey 
        rounded-none pb-1 focus:outline-none"
      />
    </div>
  );
}
