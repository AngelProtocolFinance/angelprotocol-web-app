declare module "@types-component/admin-executer" {
  import { TagPayloads } from "@types-slice/transaction";
  type AdmiExecuterProps = {
    proposal_id: number;
    tagPayloads?: TagPayloads;
  };
}
