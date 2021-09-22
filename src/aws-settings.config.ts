// TCA Member's Login Auth Process
// after check useRequest hook, remove it
const TCAAuthProcess = async (password: string) => {
  const url = process.env.REACT_APP_AWS_TCA_LOGIN_URL;
  try {
    const response: any = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify({ password: password }),
    });

    const data: { accessToken: string; errorMessage: string } =
      await response.json();
    if (data.accessToken) {
      console.log("Access Token: ", data.accessToken);
    } else {
      console.log("Error Message: ", data.errorMessage);
    }
  } catch (error) {
    console.error(error);
  }
};

// Charity Registration Process
// Initial Registration (creating Registration and ContactPerson items)
const CreateNewCharity = async (contactData: any) => {
  const url = process.env.REACT_APP_AWS_CHARITY_REGISTRATION_URL;
  let body;

  if (contactData.OrgRole === "other") {
    body = {
      Registration: { CharityName: contactData.CharityName },
      ContactPerson: {
        FirstName: contactData.FirstName,
        LastName: contactData.LastName,
        Email: contactData.Email,
        PhoneNumber: contactData.Phone,
        Role: contactData.OtherRole,
      },
    };
  } else {
    body = {
      Registration: { CharityName: contactData.CharityName },
      ContactPerson: {
        FirstName: contactData.FirstName,
        LastName: contactData.LastName,
        Email: contactData.Email,
        PhoneNumber: contactData.Phone,
        Role: contactData.OrgRole,
      },
    };
  }

  try {
    const response: any = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data: { message: string; UUID: string } = await response.json();

    // If there's a UUID returned, it means registration is a success
    if (data.UUID) {
      body = {
        CharityName: contactData.CharityName,
        FirstName: contactData.FirstName,
        LastName: contactData.LastName,
        Email: contactData.Email,
        Phone: contactData.Phone,
        UUID: data.UUID,
      };

      console.log("message:", data.message, "UUID:", data.UUID);
      localStorage.setItem("userData", JSON.stringify(body));
    } else {
      console.log("message:", data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

// Create new Metadata of charity
const CreateNewMetadata = async (metadata: any) => {
  const url = process.env.REACT_APP_AWS_CHARITY_METADATA_URL;

  try {
  } catch (error) {
    console.error(error);
  }
};

// Create new Key Person's details
const CreateNewKeyPerson = async (keyPersonData: any) => {
  const url = process.env.REACT_APP_AWS_CHARITY_KEYPERSON_URL;

  try {
  } catch (error) {
    console.error(error);
  }
};

// Get previous registration details of charity when given a UUID
const GetPreviousRegistration = async (id: string) => {
  const url = process.env.REACT_APP_AWS_CHARITY_REGISTRATION_URL;
  let body: { [key: string]: any } = {};

  try {
    const response: any = await fetch(`${url}?uuid=${id}`, {
      method: "GET",
    });
    const data: any = await response.json();

    if (data.message === "Charity not found.") {
      console.log("message:", data.message);
      return false;
    } else {
      data.forEach((element: any) => {
        if (element.SK === "ContactPerson") {
          body = element;
        } else {
          body["CharityName"] = element.CharityName;
        }
      });

      localStorage.setItem("userData", JSON.stringify(body));
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};

// Other "GET" requests here...

// Update the charity's Registration data
const UpdateRegistrationData = async () => {};

// Update the Contact Person's details
const UpdateContactPerson = async () => {};

// Update Metadata of charity
const UpdateMetadata = async () => {};

// Update Key Person's details
const UpdateKeyPerson = async () => {};

export {
  TCAAuthProcess,
  CreateNewCharity,
  CreateNewMetadata,
  CreateNewKeyPerson,
  GetPreviousRegistration,
  UpdateRegistrationData,
  UpdateContactPerson,
  UpdateMetadata,
  UpdateKeyPerson,
};
