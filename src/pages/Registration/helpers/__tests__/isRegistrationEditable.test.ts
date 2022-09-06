import { Charity, RegistrationStatus } from "types/aws";
import { placeholderCharity } from "services/aws/registration";
import { isRegistrationEditable } from "../isRegistrationEditable";

const statuses: RegistrationStatus[] = ["Under Review", "Approved", "Active"];

describe("isRegistrationEditable tests", () => {
  it.each(statuses)(
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

  test("returns 'true' when charity registration status is '%j'", () => {
    const charity: Charity = {
      ...placeholderCharity,
      Registration: {
        ...placeholderCharity.Registration,
        RegistrationStatus: "Inactive",
      },
    };

    const isEditable = isRegistrationEditable(charity);

    expect(isEditable).toBe(true);
  });
});
