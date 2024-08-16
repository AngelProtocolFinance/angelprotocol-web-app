import { IS_TEST } from "constants/env";
import list from "./token_1925a.json";
import test_list from "./token_c84f2.json";

export const tokens = IS_TEST ? test_list : list;
