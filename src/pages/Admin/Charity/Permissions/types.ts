export const PERMISSION_TYPE = {
  admin_wallet: "admin_wallet",
  governance: "governance",
  delegate: "delegate",
} as const;

export type PermissionType = keyof typeof PERMISSION_TYPE;

export type Permission = {
  id: string;
  action: string;
  permitted_to: keyof typeof PERMISSION_TYPE;
  delegate_address: string;
};
