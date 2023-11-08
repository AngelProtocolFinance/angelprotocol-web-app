/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:be8b5874-c985-49b6-8968-eedb10f7ade2",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_p1kV3Cb0C",
    "aws_user_pools_web_client_id": "2ho9v068hhr4uae9qmbopom76u",
    "oauth": {
        "domain": "2h40h8r8d938-dev.auth.us-east-1.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://auth-ui.dpspevs7tj1ov.amplifyapp.com/,http://localhost:4200/,https://staging.angelgiving.io/",
        "redirectSignOut": "https://auth-ui.dpspevs7tj1ov.amplifyapp.com/,http://localhost:4200/,https://staging.angelgiving.io/",
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
        "EMAIL",
        "NAME"
    ],
    "aws_cognito_mfa_configuration": "OPTIONAL",
    "aws_cognito_mfa_types": [
        "TOTP"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
