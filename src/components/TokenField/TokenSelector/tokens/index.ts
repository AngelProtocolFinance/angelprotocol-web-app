import { IS_TEST } from "constants/env";
import list from "./token_398c8.json";
import test_list from "./token_e45ff.json";

export const tokens = IS_TEST ? test_list : list;
