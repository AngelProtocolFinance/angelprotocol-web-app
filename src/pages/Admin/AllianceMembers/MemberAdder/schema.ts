import * as Yup from "yup";
import { PartialRecord } from "types/types";
import { addressSchema } from "schemas/schemas";
import { MemberDetails } from "services/aws/alliance/types";

export type MemberAdderValues = Omit<MemberDetails, "otherWallets">;

const memberAdderShape: PartialRecord<keyof MemberAdderValues, Yup.AnySchema> =
  {
    icon: Yup.string().required("icon is required"),
    name: Yup.string().required("name is required"),
    address: addressSchema("wallet address"),
    url: Yup.string().url("invalid url"),
  };

export const schema = Yup.object(memberAdderShape);
