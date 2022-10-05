import { Application, RegistrationStatus } from "types/aws";
import { placeholderApplication } from "services/aws/registration";
import { isRegistrationEditable } from "../isRegistrationEditable";

const editableStatuses: RegistrationStatus[] = ["Inactive", "Rejected"];
const nonEditableStatuses: RegistrationStatus[] = ["Under Review", "Active"];

describe("isRegistrationEditable tests", () => {
  it.each(nonEditableStatuses)(
    "returns 'false' when charity registration status is '%j'",
    (status) => {
      const application: Application = {
        ...placeholderApplication,
        Registration: {
          ...placeholderApplication.Registration,
          RegistrationStatus: status,
        },
      };

      const isEditable = isRegistrationEditable(application);

      expect(isEditable).toBe(false);
    }
  );

  it.each(editableStatuses)(
    "returns 'true' when charity registration status is '%j'",
    (status) => {
      const application: Application = {
        ...placeholderApplication,
        Registration: {
          ...placeholderApplication.Registration,
          RegistrationStatus: status,
        },
      };

      const isEditable = isRegistrationEditable(application);

      expect(isEditable).toBe(true);
    }
  );
});
