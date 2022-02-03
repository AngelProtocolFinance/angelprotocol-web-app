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


### Typescript
avoid explicit `any` 
```typescript
 const response: any = await requestReceipt({
      receipt,
 });

```

### Component
In a component file, always put `default` export at the top 

```jsx
//Component.tsx

export default function Component(){
  return <div><SubComponent/></div>
}

function SubComponent(){
  return <p>SubComponent</p>
}
```

### Abstractions
when tailwind classes are redundant, it's recommended to factor out the redundancy via separate component
https://tailwindcss.com/docs/reusing-styles#extracting-components-and-partials

example, this text has redundant classes on `<p/>`
```jsx
<div>
  <p className="text-2xl font-bold">Thank you for registering.</p>
  <p className="text-2xl font-bold mb-10">
    {responseData.CharityName}, {responseData.FirstName}!
  </p>
  <p className="text-2xl font-bold">Your registration reference is </p>
  <p className="text-2xl font-bold text-yellow-600">{responseData.PK}</p>
</div>
```
instead of creating custom class with
```css
.text-class{
  @apply text-2xl;
  @apply font-bold;
}
```
it's better to just factor out this redundancy to a separate component
```jsx
<Text className="text-2xl font-bold">{props.content}</Text>
```

and use as

```jsx
<div>
  <Text>Thank you for registering.</Text>
  <Text>Your registration reference is </Text>
  //..others
</div>

```

always type your code where possible






























#### Top level app pages 
* Governance
* Admin
* Leaderboards
