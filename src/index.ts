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
    warn: console.warn
  };
  console.log = (message?: any, ...optionalParams: any[]) => {
    const msg = `${showTime ? `[ ${new Date().toISOString()} ] ` : ""}${
      showMsgType ? `[ LOG ] ` : ""
    }${message}`;
    callback("log", msg, optionalParams);
    real.log(msg, ...optionalParams);
  };

  console.error = (message?: any, ...optionalParams: any[]) => {
    const msg = `${showTime ? `[ ${new Date().toISOString()} ] ` : ""}${
      showMsgType ? `[ ERR ] ` : ""
    }${message}`;
    callback("error", msg, optionalParams);
    real.error(msg, ...optionalParams);
  };

  console.warn = (message?: any, ...optionalParams: any[]) => {
    const msg = `${showTime ? `[ ${new Date().toISOString()} ] ` : ""}${
      showMsgType ? `[ WRN ]` : ""
    }${message}`;
    callback("warn", msg, optionalParams);
    real.warn(msg, ...optionalParams);
  };
};

export = consoleback;
