export type NewEndowAdminPayload = {
  endowID: number;
  firstName: string;
  lastName: string;
  email: string;
  endowName: string;
};

export type DeleteEndowAdminPayload = {
  endowID: number;
  email: string;
};
