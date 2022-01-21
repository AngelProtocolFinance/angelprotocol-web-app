### File structure



`src/components/` - where all shared components of prominent [app pages](#top-level-app-pages) should be located  
`src/pages/[page name]` - 


### Imports
always organize imports with the following in mind:
1. external package import always goes on the top
2. group imports that came from the same origin 
3. nearer paths should be at the bottom 

Example:
```javascript
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import useEstimator from "./useEstimator";
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxErrorHandler from "hooks/useTxErrorHandler";
import handleTerraError from "helpers/handleTerraError";
import { Values } from "./types";
import { terra } from "services/terra/terra";
import { gov, tags, user } from "services/terra/tags";
```

can be arranged like this 
```javascript
//external packages on top
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";

//from same origin 
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import { terra } from "services/terra/terra";
import { gov, tags, user } from "services/terra/tags";

//doesn't fit on the above criteria
import Contract from "contracts/Contract";
import { useSetter } from "store/accessors";
import useTxErrorHandler from "hooks/useTxErrorHandler";
import handleTerraError from "helpers/handleTerraError";

//nearer paths
import useEstimator from "./useEstimator";
import { Values } from "./types";

```































#### Top level app pages 
* Governance
* Admin
* Leaderboards
