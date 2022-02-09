import CharityEditor from "./Charity/CharityEditor/CharityEditor";
import EditForm from "./Charity/CharityEditor/EditForm";
import { initialFormState } from "./Charity/CharityEditor/placeholders";

export default function Test() {
  return (
    <div className="grid grid-rows-a1 place-items-center">
      <CharityEditor {...initialFormState}>
        <EditForm />
      </CharityEditor>
    </div>
  );
}
