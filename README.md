# angelprotocol-web-app
[![codecov](https://codecov.io/gh/AngelProtocolFinance/angelprotocol-web-app/branch/master/graph/badge.svg?token=9KS3RZZHJF)](https://codecov.io/gh/AngelProtocolFinance/angelprotocol-web-app)

### Requirements

- `Node v16.18.0`

## Setup

1. create `.env` file at the root of the project and add the following entries

```yaml
# discard to generate source-maps to use in "yarn analyze"
 GENERATE_SOURCEMAP=<TRUE | FALSE>

# port used by development server
 PORT=<port number>

 NX_NETWORK=<LOCAL | TESTNET | MAINNET>
 NX_JUNO_LCD_NODE=<juno lcd>

# set these to override all JUNO LCDs and RPCs including 
# NX_JUNO_LCD_NODE
# This is specially helpful when using localjuno
NX_JUNO_LCD_OVERRIDE=http://localhost:1317
NX_JUNO_RPC_OVERRIDE=http://localhost:26657

# others ( ask team members )
 NX_APES_AUTH_SECRET_KEY
 NX_ANGEL_AUTH_SECRET_KEY
 NX_KADO_API_KEY
 NX_INFURA_ID

```
