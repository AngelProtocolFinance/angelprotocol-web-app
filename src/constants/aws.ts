import { IS_TEST } from "./env";

const awsmobile = {
  aws_project_region: "us-east-1",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: IS_TEST ? "us-east-1_wSV9z0cmA" : "us-east-1_ukOlQeQIM",
  aws_user_pools_web_client_id: IS_TEST
    ? "5mhk1c9fgp08evbu2mht9p9b3s"
    : "207sfl8bl2m2cghbr86vg4je2o",
  oauth: {
    domain: `bettergiving${
      IS_TEST ? "-staging" : ""
    }.auth.us-east-1.amazoncognito.com`,
    scope: ["aws.cognito.signin.user.admin", "email", "openid", "profile"],
    redirectSignIn: "",
    redirectSignOut: "",
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
  aws_cognito_username_attributes: ["EMAIL"],
  aws_cognito_social_providers: ["GOOGLE"],
  aws_cognito_signup_attributes: ["GIVEN_NAME", "FAMILY_NAME", "EMAIL"],
  aws_cognito_mfa_configuration: "OPTIONAL",
  aws_cognito_mfa_types: ["TOTP"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [
      "REQUIRES_LOWERCASE",
      "REQUIRES_UPPERCASE",
      "REQUIRES_NUMBERS",
      "REQUIRES_SYMBOLS",
    ],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
};

export default awsmobile;
