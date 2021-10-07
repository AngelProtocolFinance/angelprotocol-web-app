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

  try {
    const response: any = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(contactData),
    });

    const data: { message: string; UUID: string } = await response.json();

    // If there's a UUID returned, it means registration is a success
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Create new Metadata of charity
const CreateNewMetadata = async (metadata: any) => {
  const url = "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com/charity";
  // const url = process.env.REACT_APP_AWS_CHARITY_REGISTRATION_URL;

  try {
    const response: any = await fetch(`${url}?uuid=${metadata.UUID}`, {
      method: "POST",
      body: JSON.stringify(metadata),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

// Create new Key Person's details
const CreateNewKeyPerson = async (keyPersonData: any) => {
  const url =
    "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com/charity/key-person";
  // const url = process.env.REACT_APP_AWS_CHARITY_REGISTRATION_URL;

  try {
    const response: any = await fetch(`${url}?uuid=${keyPersonData.UUID}`, {
      method: "POST",
      body: JSON.stringify(keyPersonData),
    });
    return response.json();
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
const UpdateContactPerson = async (contactData: any) => {
  const url =
    "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com/registration";
  // const url = process.env.REACT_APP_AWS_CHARITY_REGISTRATION_URL;

  try {
    const response: any = await fetch(
      `${url}?uuid=${contactData.ContactPerson.UUID}`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...contactData.ContactPerson,
          CharityName: contactData.Registration.CharityName,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

// Update Metadata of charity
const UpdateMetadata = async (charityData: any) => {
  const url = "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com/charity";
  // const url = process.env.REACT_APP_AWS_CHARITY_REGISTRATION_URL;

  try {
    const response: any = await fetch(`${url}?uuid=${charityData.UUID}`, {
      method: "PUT",
      body: JSON.stringify(charityData),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
// Update Key Person's details
const UpdateKeyPerson = async (keyPersonData: any) => {
  const url =
    "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com/charity/key-person";
  // const url = process.env.REACT_APP_AWS_CHARITY_REGISTRATION_URL;

  try {
    const response: any = await fetch(`${url}?uuid=${keyPersonData.UUID}`, {
      method: "PUT",
      body: JSON.stringify(keyPersonData),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

// build email
const BuildEmail = async (request: any) => {
  const url =
    "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com/registration/build-email";
  // const url = process.env.REACT_APP_AWS_CHARITY_REGISTRATION_URL;
  try {
    const response: any = await fetch(
      `${url}?uuid=${request.uuid}&type=${request.type}`,
      {
        method: "POST",
        body: JSON.stringify(request.body),
      }
    );
    return response.json();
  } catch (error) {
    return error;
  }
};

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
  BuildEmail,
};
