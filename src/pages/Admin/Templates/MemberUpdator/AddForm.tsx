import { SubmitHandler, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import GroupTitle from "./GroupTitle";
import { Values } from "./types";

export default function Addform(props: { adder: SubmitHandler<Values> }) {
  const { handleSubmit } = useFormContext<Values>();
  return (
    <form
      onSubmit={handleSubmit(props.adder)}
      className="border-4 p-2 border-opacity-20 rounded-md mb-2 grid"
      autoComplete="off"
    >
      <GroupTitle title="Add new member" />
      <TextInput title="wallet address" name="addr" />
      <TextInput title="weight" name="weight" />
      <button
        type="submit"
        className="justify-self-end bg-white bg-opacity-10 hover:bg-opacity-30 px-4 rounded-md text-xs uppercase py-1 text-white"
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
    <div className="flex flex-col border-b-2 border-opacity-10 text-white text-opacity-80 mb-4">
      <label className="text-xs font-heading uppercase">{props.title}</label>
      <input
        {...register(props.name)}
        type="text"
        className="bg-transparent focus:outline-none p-1"
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
