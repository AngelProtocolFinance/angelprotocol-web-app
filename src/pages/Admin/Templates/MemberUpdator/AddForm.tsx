import { SubmitHandler, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import GroupTitle from "./GroupTitle";
import { Values } from "./types";

export default function Addform(props: { adder: SubmitHandler<Values> }) {
  const { handleSubmit } = useFormContext<Values>();
  return (
    <form
      onSubmit={handleSubmit(props.adder)}
      className="mb-2 grid"
      autoComplete="off"
    >
      <GroupTitle
        title="Add new member"
        colorClass="text-green-200 font-bold"
      />
      <TextInput title="wallet address" name="addr" />
      <TextInput title="weight" name="weight" />
      <button
        type="submit"
        className="font-heading font-bold justify-self-end bg-green-200 hover:bg-white hover:text-green-300 bg-opacity-40 p-3 rounded-md text-xs uppercase text-white"
      >
        + add member
      </button>
    </form>
  );
}

function TextInput(props: { title: string; name: keyof Values }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<Values>();
  return (
    <div className="flex flex-col text-white text-opacity-80 mb-4">
      <label className="text-xs font-heading uppercase mb-1">
        {props.title}
      </label>
      <input
        {...register(props.name)}
        type="text"
        className="bg-transparent focus:outline-none p-3 bg-white bg-opacity-10 shadow-inner rounded-md"
      />
      <ErrorMessage
        errors={errors}
        name={props.name}
        as="span"
        className="text-right text-red-200 text-xs mb-1 mt-0.5 mr-1"
      />
    </div>
  );
}
