type Permission = {
  id: string;
  action: string;
  permitted_to: "admin_wallet" | "governance" | "delegate";
  delegate_address: string;
};

export type TableProps = {
  permissions: Permission[];
  className?: string;
  disabled: boolean;
  isLoading: boolean;
};
