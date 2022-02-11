import CharityEditor from "./CharityEdit/CharityEditor";
import EditForm from "./CharityEdit/EditForm";
import { initialFormState } from "./CharityEdit/placeholders";

export default function Test() {
  return (
    <div className="grid padded-container justify-items-center">
      <CharityEditor {...initialFormState}>
        <EditForm />
      </CharityEditor>
    </div>
  );
}
