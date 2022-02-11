import { Link, useRouteMatch } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import CharityEditor from "./CharityEditor";
import EditForm from "./EditForm";
import { initialFormState } from "./placeholders";
import { app } from "types/routes";

export default function CharityEdit() {
  return (
    <div className="grid padded-container justify-items-center">
      <CharityEditor {...initialFormState}>
        <EditForm />
      </CharityEditor>
    </div>
  );
}
