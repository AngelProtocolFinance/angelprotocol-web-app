import feeSetting from "./feeSetting.json";
import queriesAbi from "./queries.json";
import strategyParams from "./strategy-params.json";

export const queries = [...queriesAbi, ...feeSetting, ...strategyParams];
