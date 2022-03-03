export type Any = any;

export type EndowmentStatus = {
  Inactive: 0;
  Approved: 1;
  Frozen: 2;
  Closed: 3;
};

export type EndowmentStatusNum = EndowmentStatus[keyof EndowmentStatus];
export type EndowmentStatusStrNum = `${EndowmentStatusNum}`;

export type EndowmentListRes = {
  endowments: EndowmentEntry[];
};
export type EndowmentEntry = {
  address: string;
  status: keyof EndowmentStatus;
};
