import { IS_TEST } from "constants/env";

type Logger = {
  error: (...data: any[]) => void;
  info: (...data: any[]) => void;
  log: (...data: any[]) => void;
};

export const logger: Logger = IS_TEST
  ? {
      // using console.log for .error and .info funcs as console.error and
      // console.info are undefined while testing for some reason
      error: (...data) => console.log(...data),
      info: (...data) => console.log(...data),
      log: (...data) => console.log(...data),
    }
  : {
      error: (_) => {},
      info: (_) => {},
      log: (_) => {},
    };
