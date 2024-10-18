import type { ImgLink } from "components/ImgEditor";
import type { UserV2 } from "types/auth";
import type { CurrencyOption, DetailedCurrency } from "types/components";

export type FV = {
  firstName: string;
  lastName: string;
  prefCurrency: CurrencyOption;
  avatar: ImgLink;
};

export type Props = {
  currencies: DetailedCurrency[];
  defaultCurr?: DetailedCurrency;
  user: UserV2;
};
