/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_ukOlQeQIM",
    "aws_user_pools_web_client_id": "207sfl8bl2m2cghbr86vg4je2o",
    "oauth": {
        "domain": "bettergiving.auth.us-east-1.amazoncognito.com",
        "scope": [
            "aws.cognito.signin.user.admin",
            "email",
            "openid",
            "phone",
            "profile"
        ],
        "redirectSignIn": "https://app.better.giving/auth-redirector/",
        "redirectSignOut": "https://app.better.giving/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [
        "GIVEN_NAME",
        "FAMILY_NAME",
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OPTIONAL",
    "aws_cognito_mfa_types": [
        "TOTP"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": [
            "REQUIRES_LOWERCASE",
            "REQUIRES_UPPERCASE",
            "REQUIRES_NUMBERS",
            "REQUIRES_SYMBOLS"
        ]
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
