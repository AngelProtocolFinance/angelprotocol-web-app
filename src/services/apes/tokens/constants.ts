import { WithBalance } from "services/types";
import ethLogo from "assets/icons/currencies/ether.png";
import junoLogo from "assets/icons/currencies/juno.svg";
import lunaLogo from "assets/icons/currencies/luna.png";
import coinIcon from "assets/icons/currencies/token.svg";
import { IS_TEST } from "constants/env";

export const placeHolderToken: WithBalance = {
  symbol: "JUNO",
  logo: ethLogo,
  decimals: 18,
  balance: 0,
  approved: false,
  name: "Placeholder",
  token_identifier: "",
};

export const unSupportedToken: WithBalance = {
  symbol: "XX",
  logo: coinIcon,
  decimals: 18,
  balance: 0,
  approved: false,
  name: "Unsupported",
  token_identifier: "",
};

export const ethereumToken: WithBalance = {
  symbol: "ETH",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022",
  decimals: 18,
  balance: 0,
  approved: true,
  name: "Ethereum",
  token_identifier: "",
};

export const lunaToken: WithBalance = {
  symbol: "LUNA",
  logo: lunaLogo,
  decimals: 6,
  balance: 0,
  approved: true,
  name: "Luna",
  token_identifier: "",
};

export const junoToken: WithBalance = IS_TEST
  ? {
      symbol: "JUNOX",
      logo: junoLogo,
      decimals: 6,
      balance: 0,
      approved: true,
      name: "Juno",
      token_identifier: "",
    }
  : {
      symbol: "JUNO",
      logo: junoLogo,
      decimals: 6,
      balance: 0,
      approved: true,
      name: "Juno",
      token_identifier: "",
    };
