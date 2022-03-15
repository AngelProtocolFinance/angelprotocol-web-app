import { Dwindow } from "services/provider/types";

const dwindow = window as Dwindow;
export default function isXdefiPrioritized() {
  return (
    dwindow.xfi?.binance !== undefined &&
    dwindow.xfi?.bitcoin !== undefined &&
    dwindow.xfi?.bitcoincash !== undefined &&
    dwindow.xfi?.litecoin !== undefined &&
    dwindow.xfi?.terra !== undefined &&
    dwindow.xfi?.thorchain !== undefined
  );
}
