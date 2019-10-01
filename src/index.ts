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
    callback("log", message, optionalParams);
    real.log(
      `${showTime ? `[ ${new Date().toLocaleString()} ] ` : ""}${
        showMsgType ? `[ LOG ]` : ""
      }`,
      message,
      ...optionalParams
    );
  };

  console.error = (message?: any, ...optionalParams: any[]) => {
    callback("error", message, optionalParams);
    real.error(
      `${showTime ? `[ ${new Date().toLocaleString()} ] ` : ""}${
        showMsgType ? `[ ERR ]` : ""
      }`,
      message,
      ...optionalParams
    );
  };

  console.warn = (message?: any, ...optionalParams: any[]) => {
    callback("warn", message, optionalParams);
    real.warn(
      `${showTime ? `[ ${new Date().toLocaleString()} ] ` : ""}${
        showMsgType ? `[ WRN ]` : ""
      }`,
      message,
      ...optionalParams
    );
  };
};

export default consoleback;
