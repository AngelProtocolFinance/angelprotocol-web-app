import CharityEditor from "./CharityEditor";
import EditForm from "./EditForm";
import { initialFormState } from "./placeholders";

export default function CharityEdit() {
  return (
    <div className="grid padded-container justify-items-center">
      <CharityEditor {...initialFormState}>
        <EditForm />
      </CharityEditor>
    </div>
  );
}
