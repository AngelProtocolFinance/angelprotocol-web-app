import { Network } from "slices/launchpad/types";
import junoIcon from "assets/icons/currencies/juno.svg";
import polygonIcon from "assets/icons/currencies/matic.svg";
import Image from "components/Image";

type Props = { network: Network; classes?: string };
export default function NetworkIcon({ classes = "", network }: Props) {
  return (
    <Image
      img={{ src: network === "juno" ? junoIcon : polygonIcon }}
      className={classes}
    />
  );
}
