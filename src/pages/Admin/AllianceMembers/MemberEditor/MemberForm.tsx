import Label from "pages/Admin/components/Label";
import TextInput from "../../components/TextInput";
import IconEditor from "./IconEditor";
import { MemberEditValues as V } from "./schema";
import useModifyMember from "./useModifyMember";

export default function MemberForm() {
  const { modifyMember, isSubmitDisabled, error } = useModifyMember();
  return (
    <form
      onSubmit={modifyMember}
      className="w-full max-w-lg p-4 rounded-md grid content-start rounded-md bg-white-grey relative"
    >
      <Label text="icon" required />
      <IconEditor />
      <TextInput<V> title="name" name="name" required />
      <TextInput<V> title="wallet address" name="address" required mono />
      <TextInput<V> title="website" name="url" />

      {error && (
        <p className="text-red-400 text-sm font-semibold font-mono text-center mb-2">
          {error}
        </p>
      )}
      <button
        disabled={isSubmitDisabled}
        type="submit"
        className="text-xs font-heading font-extrabold uppercase bg-angel-blue 
        justify-self-center px-4 py-2 rounded-sm text-white active:bg-blue-accent disabled:bg-grey-accent"
      >
        submit
      </button>
    </form>
  );
}
