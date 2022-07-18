import { WithBalance } from "services/types";
import ethLogo from "assets/icons/currencies/ether.png";
import lunaLogo from "assets/icons/currencies/luna.png";
import coinIcon from "assets/icons/currencies/token.svg";

export const placeHolderToken: WithBalance = {
  symbol: "ETH",
  logo: ethLogo,
  decimals: 18,
  balance: 0,
  approved: false,
  name: "Placeholder",
  contract_address: "",
};

export const unSupportedToken: WithBalance = {
  symbol: "XX",
  logo: coinIcon,
  decimals: 18,
  balance: 0,
  approved: false,
  name: "Unsupported",
  contract_address: "",
};

export const ethereumToken: WithBalance = {
  symbol: "ETH",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022",
  decimals: 18,
  balance: 0,
  approved: false,
  name: "Ethereum",
  contract_address: "",
};

export const lunaToken: WithBalance = {
  symbol: "LUNA",
  logo: lunaLogo,
  decimals: 6,
  balance: 0,
  approved: false,
  name: "Luna",
  contract_address: "",
};
