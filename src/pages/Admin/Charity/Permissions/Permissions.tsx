import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FV, TPermissions } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { adminRoutes } from "constants/routes";
import Seo from "../Seo";
import Form from "./Form";
import { controllerUpdate, formPermission } from "./helpers";
import { schema } from "./schema";

export default function Permissions() {
  const { settingsController: controller, id } = useAdminResources<"charity">();

  const permissions: TPermissions = {
    accountFees: formPermission(controller.earlyLockedWithdrawFee),
    allowList: formPermission(controller.allowlistedBeneficiaries),
    donationSplitParams: formPermission(controller.splitToLiquid),
    profile: formPermission(controller.name),
  };

  const methods = useForm<FV>({
    values: {
      ...permissions,
      initial: controllerUpdate(id, permissions, controller),
    },
    resolver: yupResolver(schema),
  });

  return (
    <div className="grid gap-6">
      <Seo title="Permissions" url={adminRoutes.permissions} />

      <h2 className="font-bold text-[2rem]">Permissions</h2>

      <FormProvider {...methods}>
        <Form />
      </FormProvider>
    </div>
  );
}
