import { IS_TEST } from "constants/env";

type Logger = {
  error: (...data: any[]) => void;
  info: (...data: any[]) => void;
  log: (...data: any[]) => void;
};

const logger: Logger = IS_TEST
  ? {
      error: (...data) => logger.error(...data),
      info: (...data) => logger.info(...data),
      log: (...data) => logger.log(...data),
    }
  : {
      error: (_) => {},
      info: (_) => {},
      log: (_) => {},
    };

export default logger;
