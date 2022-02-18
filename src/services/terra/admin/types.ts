export type Member = {
  addr: string;
  weight: number;
};

export type MemberRes = {
  members: Member[];
};

export type InquiredMember = {
  weight: number | null;
};
