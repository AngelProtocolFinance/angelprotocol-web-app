import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FV, TPermissions } from "./types";
import { Tooltip } from "components/admin";
import { adminRoutes } from "constants/routes";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";
import Form from "./Form";
import ReadOnlyPermissionsTable from "./ReadOnlyPermissionsTable";
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

  return (
    <div className="grid gap-6">
      <Seo title="Permissions" url={adminRoutes.permissions} />

      <h2 className="font-bold text-[2rem]">Permissions</h2>

      {typeof txResource === "string" ? (
        <>
          <Tooltip tooltip={txResource} />
          <ReadOnlyPermissionsTable {...permissions} />
        </>
      ) : (
        <FormProvider {...methods}>
          <Form />
        </FormProvider>
      )}
    </div>
  );
}
