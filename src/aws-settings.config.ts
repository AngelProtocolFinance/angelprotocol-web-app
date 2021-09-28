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
  const url =
    "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com/registration";
  // const url = process.env.REACT_APP_AWS_CHARITY_REGISTRATION_URL;
  let body;

  if (contactData.orgRole === "other") {
    body = {
      Registration: { CharityName: contactData.charityName },
      ContactPerson: {
        FirstName: contactData.firstName,
        LastName: contactData.lastName,
        Email: contactData.email,
        PhoneNumber: contactData.phone,
        Role: contactData.otherRole,
      },
    };
  } else {
    body = {
      Registration: { CharityName: contactData.charityName },
      ContactPerson: {
        FirstName: contactData.firstName,
        LastName: contactData.lastName,
        Email: contactData.email,
        PhoneNumber: contactData.phone,
        Role: contactData.orgRole,
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
        charityName: contactData.charityName,
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
        uniqueID: data.UUID,
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
  const url =
    "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com/registration";
  // const url = process.env.REACT_APP_AWS_CHARITY_REGISTRATION_URL;
  let body: { [key: string]: any } = {};

  try {
    const response: any = await fetch(`${url}?uuid=${id}`, {
      method: "GET",
    });
    const data: any = await response.json();
    console.log(data);

    if (data.message === "Charity not found.") {
      console.log("message:", data.message);
      return false;
    } else {
      // TO DO PAOLO: Refactor the Lambda function handling this to return just 1 whole object
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
