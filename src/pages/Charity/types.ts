export type CharityParam = { address: string };

export type CharityNavProps = {
  title: string;
  disabled: boolean;
  getLink: (address: string) => string;
  isDefault?: boolean;
  defaultPath: (address: string) => string;
};
