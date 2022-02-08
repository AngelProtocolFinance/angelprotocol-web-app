import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { aws } from "../services/aws/aws";
import { terra } from "../services/terra/terra";
import { apes } from "../services/apes/apes";
import userReducer from "../services/user/userSlice";
import chainReducer from "../services/chain/chainSlice";
import walletReducer from "../services/wallet/walletSlice";
import providerReducer from "../services/provider/providerSlice";
import transactionReducer from "../services/transaction/transactionSlice";
import tokensReducer from "../services/tokens/tokenSlice";

const userPersistConfig = { key: "user", storage, blacklist: ["admin"] };
const tokenPersistConfig = { key: "tokens", storage };

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  tokens: persistReducer(tokenPersistConfig, tokensReducer),
  transaction: transactionReducer,
  chain: chainReducer,
  provider: providerReducer,
  wallet: walletReducer,
  [aws.reducerPath]: aws.reducer,
  [terra.reducerPath]: terra.reducer,
  [apes.reducerPath]: apes.reducer,
});

export default rootReducer;
