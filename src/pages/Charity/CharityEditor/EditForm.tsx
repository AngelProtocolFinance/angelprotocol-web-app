import ImageEditor from "./ImageEditor";
import TextInput from "./TextInput";

export default function EditForm() {
  return (
    <form className="max-w-2xl w-full">
      <ImageEditor />
      <TextInput />
      <TextInput />
      <TextInput />
      <TextInput />
    </form>
  );
}
