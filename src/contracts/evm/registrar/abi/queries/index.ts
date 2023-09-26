import feeSetting from "./feeSetting.json";
import queriesAbi from "./queries.json";

export const queries = [...queriesAbi, ...feeSetting];
