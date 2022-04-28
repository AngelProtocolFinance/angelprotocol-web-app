declare module "@types-page/endowment-admin" {
  import { UpdateProfilePayload } from "@types-server/contracts";
  import { ProposalBase } from "@types-page/admin";

  type EndowmentAdminParams = { address: string };
  type UpdateProfileValues = ProposalBase &
    UpdateProfilePayload & { initialProfile: UpdateProfilePayload };
}
