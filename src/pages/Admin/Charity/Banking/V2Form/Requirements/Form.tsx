import { useForm } from "react-hook-form";
import { Group } from "types/aws";

type Props = { fields: Group[] };

export default function Form({ fields }: Props) {
  const { register } = useForm();
  return (
    <form>
      {fields.map((f) => (
        <div key={f.key}>{f.name}</div>
      ))}
    </form>
  );
}
