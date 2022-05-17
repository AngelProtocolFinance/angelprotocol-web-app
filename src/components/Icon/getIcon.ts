import { IconTypes, iconList } from "./constants";

export default function getIcon(type: IconTypes) {
  return iconList[type];
}
