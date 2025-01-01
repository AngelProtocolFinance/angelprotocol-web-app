export { clientLoader } from "./loader";
import Widget from "./Widget";

export default function FormBuilder() {
  return (
    <div className="px-6 py-8 md:p-10 @container">
      <Widget />
    </div>
  );
}
