import junoIcon from "assets/icons/currencies/juno.svg";
import unknownTokenIcon from "assets/icons/currencies/token.svg";

//need to update this to expected result of `{balance:{}}` query
//better include that data in said query
const _assets: { [index: string]: { name: string; icon: string } } = {
  ujunox: { icon: junoIcon, name: "Juno" },
};

export const assets = new Proxy(_assets, {
  get(target, key: string) {
    return target[key] ?? { icon: unknownTokenIcon, name: "Token" };
  },
});
