import { format } from "date-fns";

type Type = "log" | "error" | "warn" | "info" | "debug"

const consoleback = (
  opts: {
    callback?: (type: Type, message: any, ...optionalParams: any[]) => void;
    showMsgType?: boolean;
    showTime?: boolean;
    timeFormat?: string;
  } = {
    callback: () => null,
    showMsgType: true,
    showTime: false,
    timeFormat: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  }
) => {
  const {
    callback,
    showMsgType,
    showTime,
    timeFormat,
  }: {
    callback: (type: Type, message: string, ...optionalParams: any[]) => void;
    showMsgType: boolean;
    showTime: boolean;
    timeFormat: string;
  } = {
    callback: () => null,
    showMsgType: true,
    showTime: false,
    timeFormat: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    ...opts,
  };
  const real = {
    debug: console.debug,
    error: console.error,
    info: console.info,
    log: console.log,
    warn: console.warn,
  };

  function logger(
    type: Type,
    message?: any,
    ...optionalParams: any[]
  ) {
    const [fn, label]: [
      (message?: any, ...optionalParams: any[]) => void,
      string
    ] = (() => {
      switch (type) {
        case "log":
          return [real.log, "LOG"];
        case "error":
          return [real.error, "ERR"];
        case "warn":
          return [real.warn, "WRN"];
        case "info":
          return [real.info, "INF"];
        case "debug":
          return [real.debug, "BUG"];
      }
    })();

    const msg = `${
      showTime
        ? `[ ${format(new Date(), timeFormat)} ] `
        : ""
    }${showMsgType ? `[ ${label} ] ` : ""}${message}`;
    callback(type, msg, optionalParams);
    fn(msg, ...optionalParams);

    return msg;
  }

  console.log = (message?: any, ...optionalParams: any[]) => {
    return logger("log", message, ...optionalParams);
  };

  console.error = (message?: any, ...optionalParams: any[]) => {
    return logger("error", message, ...optionalParams);
  };

  console.warn = (message?: any, ...optionalParams: any[]) => {
    return logger("warn", message, ...optionalParams);
  };

  console.info = (message?: any, ...optionalParams: any[]) => {
    return logger("info", message, ...optionalParams);
  };

  console.debug = (message?: any, ...optionalParams: any[]) => {
    return logger("debug", message, ...optionalParams);
  };

  const terminate = () => {
    console.log = real.log;
    console.warn = real.warn;
    console.error = real.error;
    console.info = real.info;
    console.debug = real.debug;
  };

  return terminate;
};

export default consoleback;
