import { Charity, RegistrationStatus } from "types/aws";
import { placeholderCharity } from "services/aws/registration";
import { isRegistrationEditable } from "../isRegistrationEditable";

const editableStatuses: RegistrationStatus[] = ["Inactive", "Rejected"];
const nonEditableStatuses: RegistrationStatus[] = ["Under Review", "Active"];

describe("isRegistrationEditable tests", () => {
  it.each(nonEditableStatuses)(
    "returns 'false' when charity registration status is '%j'",
    (status) => {
      const charity: Charity = {
        ...placeholderCharity,
        Registration: {
          ...placeholderCharity.Registration,
          RegistrationStatus: status,
        },
      };

      const isEditable = isRegistrationEditable(charity);

      expect(isEditable).toBe(false);
    }
  );

  it.each(editableStatuses)(
    "returns 'true' when charity registration status is '%j'",
    (status) => {
      const charity: Charity = {
        ...placeholderCharity,
        Registration: {
          ...placeholderCharity.Registration,
          RegistrationStatus: status,
        },
      };

      const isEditable = isRegistrationEditable(charity);

      expect(isEditable).toBe(true);
    }
  );
});
