import { describe, it, expect, afterEach } from "vitest";
import consoleback from "../src/index";
import { format } from 'date-fns'

const oldLog = console.log;
const oldWarn = console.warn;
const oldErr = console.error;
const oldInfo = console.info;
const oldDebug = console.debug;

afterEach(() => {
  console.log = oldLog;
  console.warn = oldWarn;
  console.error = oldErr;
  console.info = oldInfo;
  console.debug = oldDebug;
});

describe("natural-order", () => {
  it("allows logging to console", () => {
    consoleback();

    const logResult = console.log("Hi!");
    const infoResult = console.info("Informative...");
    const warnResult = console.warn("Hold up.");
    const errorResult = console.error("ERROR!!!");
    const debugResult = console.debug("Debug this!");

    expect(logResult).toEqual("[ LOG ] Hi!");
    expect(infoResult).toEqual("[ INF ] Informative...");
    expect(warnResult).toEqual("[ WRN ] Hold up.");
    expect(errorResult).toEqual("[ ERR ] ERROR!!!");
    expect(debugResult).toEqual("[ BUG ] Debug this!");
  });

  it("accepts callback", () => {
    const log: string[] = [];

    consoleback({
      callback: (type, message, optionalParams) => log.push(message),
    });

    expect(log.length).toEqual(0);
    expect(log.find((v) => v === "Test")).toBeFalsy();

    console.log("Test");

    expect(log).toContain("[ LOG ] Test");
  });

  it("logs time", () => {
    consoleback({ showTime: true, timeFormat: "yyyy-MM-dd" });

    const result = console.log("The time is...");

    expect(result).toEqual(`[ ${format(new Date(), "yyyy-MM-dd")} ] [ LOG ] The time is...`);
  });

  it("allows disabling the type label", () => {
    consoleback({ showMsgType: false });

    const result = console.log("Who knows what I am?");

    expect(result).toEqual("Who knows what I am?");
  })
});
