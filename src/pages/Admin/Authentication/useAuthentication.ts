import { ConnectedWallet } from "@terra-money/wallet-provider";
import { useSetAuthorized } from "contexts/AuthProvider";
import CW4Group from "contracts/CW4Group";

export enum AuthResponse {
  NotConnect = 1,
  NotAuthorized = 2,
  Authorized = 3,
}

export const useAuthentication = () => {
  const { saveAuthorize, deleteAuthorize } = useSetAuthorized();

  const handleAuthorize = async (wallet: ConnectedWallet | undefined) => {
    if (wallet) {
      const cw4Group = new CW4Group();
      const result = await cw4Group.isMember(wallet.walletAddress);
      if (result) {
        await saveAuthorize("authorized");
        return AuthResponse.Authorized;
      } else {
        await deleteAuthorize();
        return AuthResponse.NotAuthorized;
      }
    } else {
      await deleteAuthorize();
      return AuthResponse.NotConnect;
    }
  };

  return handleAuthorize;
};
