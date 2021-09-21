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
// Initial Registration
const ContactDetailsFormSubmit = async (contactData: any) => {
  const url = process.env.REACT_APP_AWS_CHARITY_REGISTRATION_URL;
  let body;

  // if (contactData.orgRole === "other") {
  //   body = {
  //     Registration: { CharityName: contactData.charityName },
  //     ContactPerson: {
  //       FirstName: contactData.firstName,
  //       LastName: contactData.lastName,
  //       Email: contactData.email,
  //       PhoneNumber: contactData.phone,
  //       Role: contactData.otherRole,
  //     },
  //   };
  // } else {
  //   body = {
  //     Registration: { CharityName: contactData.charityName },
  //     ContactPerson: {
  //       FirstName: contactData.firstName,
  //       LastName: contactData.lastName,
  //       Email: contactData.email,
  //       PhoneNumber: contactData.phone,
  //       Role: contactData.orgRole,
  //     },
  //   };
  // }
  if (contactData.OrgRole === "other") {
    body = {
      Registration: { CharityName: contactData.CharityName },
      ContactPerson: {
        FirstName: contactData.FirstName,
        LastName: contactData.LastName,
        Email: contactData.Email,
        PhoneNumber: contactData.Phone,
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
          // console.log(element);
          // body += element;
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
  // Should set data to localStorage
};

export { TCAAuthProcess, ContactDetailsFormSubmit, GetPreviousRegistration };
