import type { ComponentType } from "react";
import type { V1RecipientAccount } from "types/aws";

export type FormButtonsProps = {
  disabled?: boolean;
  isSubmitting?: boolean;
};

export type IFormButtons = ComponentType<FormButtonsProps>;

export type OnSubmit = (
  recipient: V1RecipientAccount,
  bankStatementFile: File
) => Promise<void>;
