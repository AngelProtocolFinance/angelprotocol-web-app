import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FV, TPermissions } from "./types";
import { Tooltip } from "components/admin";
import { adminRoutes } from "constants/routes";
import { isTooltip, useAdminContext } from "../../Context";
import Seo from "../Seo";
import Form from "./Form";
import { controllerUpdate, formPermission } from "./helpers";
import { schema } from "./schema";

export default function Permissions() {
  const {
    settingsController: controller,
    id,
    txResource,
  } = useAdminContext<"charity">();

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

  const tooltip = isTooltip(txResource) ? txResource : undefined;
  return (
    <div className="grid gap-6">
      <Seo title="Permissions" url={adminRoutes.permissions} />
      <h2 className="font-bold text-[2rem]">Permissions</h2>
      {tooltip && <Tooltip tooltip={tooltip} />}
      <FormProvider {...methods}>
        <Form aria-disabled={tooltip !== undefined} />
      </FormProvider>
    </div>
  );
}
