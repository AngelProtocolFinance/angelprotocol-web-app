import { DocumentationValues } from "pages/Registration/types";
import { useRegistrationQuery } from "services/aws/registration";
import Checkbox from "components/Checkbox";

export default function AuthorityToCreateCheckbox() {
  const {
    application: {
      Registration: { OrganizationName },
    },
  } = useRegistrationQuery();

  return (
    <Checkbox<DocumentationValues> name="checkedAuthority">
      {`By checking this box, you declare that you have the authority to create an
        endowment in the name of ${OrganizationName} through Angel Protocol`}
      <span className="text-red-l1 ml-0.5">*</span>
    </Checkbox>
  );
}
