export type NewEndowAdminPayload = {
  endowID: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type DeleteEndowAdminPayload = {
  endowID: number;
  email: string;
};
