export type RegistrationState = {};

//REF_ID is global to registration
type InitialStep = {
  email: string;
};

//STEP 1
type ContactDetails = {
  name: {
    first: string;
    last: string;
  };
  //https://www.npmjs.com/package/react-phone-input-2
  phone: {
    format: string;
    value: string;
  };
  // disabled, can't be changed once confirmed
  email: string;

  organization: {
    name: string;
    role: string;
    otherRole: string;
    goal: string;
  };

  referrer: string;
};
