export type Donor = {
  firstName: string;
  lastName: string;
  email: string;
};

export type DonorState =
  | { render: "update"; donor: Donor }
  | { render: "new"; donor?: Donor };
