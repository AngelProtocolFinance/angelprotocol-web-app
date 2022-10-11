import Description from "./Description";
import Form from "./Form";

export default function Newsletter() {
  return (
    <div className="flex flex-col items-start gap-2.5 ">
      <Description />
      <Form />
    </div>
  );
}
