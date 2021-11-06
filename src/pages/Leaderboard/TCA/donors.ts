import { Names } from "./types";

//index as enum of addresses to avoid duplicates
export type Donors = { [index: string]: Names };
export const donors: Donors = {
  terra1zxtczmxtw8mk8xncvr8lcq2qmvk4dz88ek6f79: Names.community,
  terra18n2pc9x6q9str9dz8sqpt7ulz5telutclkzaec: Names.luna_apes,
  terra17me29hk8cdd6mm6uf7cf0amsxmzxnszkfe5ph4: Names.luna_bulls,
  terra1r59snugfm3gxjas565jf5ehw54junlfpmspjan: Names.luna_bulls,
  terra1tz9jtxemq5e9sw048adz32tj62vkzp6f63e26f: Names.astronorcs,
  terra1pl2cus25j79ukff04fxn9wwemerm2463gnztl6: Names.west_coast_wonder,
  terra1etwq0q8wwnmq7322kz4v6ff2dcvwfm634vdkqn: Names.loop,
  terra1rzjxj4c6ykemk8csvtjchcqas7mul8s4w6rk8x: Names.tales_of_terra,
  terra1kf4k0l7hj5tlkuzf67ly43q8d2gcxay3hwa7fr: Names.hero,
};
