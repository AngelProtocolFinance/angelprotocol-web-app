import { ComponentType } from "react";
import { V1RecipientAccount } from "types/aws";

export type FormButtonsProps = {
  disabled?: boolean;
  isSubmitted?: boolean;
  isSubmitting?: boolean;
};

export type IFormButtons = ComponentType<FormButtonsProps>;

export type OnSubmit = (
  recipient: V1RecipientAccount | null,
  bankStatementFile: File
) => Promise<void>;
