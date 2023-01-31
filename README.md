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

 REACT_APP_NETWORK=<LOCAL | TESTNET | MAINNET>
 REACT_APP_JUNO_LCD_NODE=<juno lcd>

# set these to override all JUNO LCDs and RPCs including 
# REACT_APP_JUNO_LCD_NODE
# This is specially helpful when using localjuno
REACT_APP_JUNO_LCD_OVERRIDE=http://localhost:1317
REACT_APP_JUNO_RPC_OVERRIDE=http://localhost:26657

# others ( ask team members )
 REACT_APP_APES_AUTH_SECRET_KEY
 REACT_APP_ANGEL_AUTH_SECRET_KEY
 REACT_APP_KADO_API_KEY
 REACT_APP_INFURA_ID

```
