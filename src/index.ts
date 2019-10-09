import { format } from "date-fns";

const consoleback = (
  opts: {
    callback?: (type: string, message: any, ...optionalParams: any[]) => void;
    showMsgType?: boolean;
    showTime?: boolean;
  } = {
    callback: () => null,
    showMsgType: true,
    showTime: false
  }
) => {
  const {
    callback,
    showMsgType,
    showTime
  }: {
    callback: (type: string, message: string, ...optionalParams: any[]) => void;
    showMsgType: boolean;
    showTime: boolean;
  } = {
    callback: () => null,
    showMsgType: true,
    showTime: false,
    ...opts
  };
  const real = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
    debug: console.debug
  };
  console.log = (message?: any, ...optionalParams: any[]) => {
    const msg = `${
      showTime
        ? `[ ${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")} ] `
        : ""
    }${showMsgType ? `[ LOG ] ` : ""}${message}`;
    callback("log", msg, optionalParams);
    real.log(msg, ...optionalParams);
  };

  console.error = (message?: any, ...optionalParams: any[]) => {
    const msg = `${
      showTime
        ? `[ ${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")} ] `
        : ""
    }${showMsgType ? `[ ERR ] ` : ""}${message}`;
    callback("error", msg, optionalParams);
    real.error(msg, ...optionalParams);
  };

  console.warn = (message?: any, ...optionalParams: any[]) => {
    const msg = `${
      showTime
        ? `[ ${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")} ] `
        : ""
    }${showMsgType ? `[ WRN ] ` : ""}${message}`;
    callback("warn", msg, optionalParams);
    real.warn(msg, ...optionalParams);
  };

  console.info = (message?: any, ...optionalParams: any[]) => {
    const msg = `${
      showTime
        ? `[ ${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")} ] `
        : ""
    }${showMsgType ? `[ INF ] ` : ""}${message}`;
    callback("info", msg, optionalParams);
    real.info(msg, ...optionalParams);
  };

  console.debug = (message?: any, ...optionalParams: any[]) => {
    const msg = `${
      showTime
        ? `[ ${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")} ] `
        : ""
    }${showMsgType ? `[ BUG ] ` : ""}${message}`;
    callback("debug", msg, optionalParams);
    real.debug(msg, ...optionalParams);
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

export = consoleback;
