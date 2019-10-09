import consoleback from "../src/index";

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

    console.log("Hi!");
    console.info("Informative...");
    console.warn("Hold up.");
    console.error("ERROR!!!");
    console.debug("Debug this!");
  });

  it("accepts callback", () => {
    const log: string[] = [];

    consoleback({
      callback: (type, message, optionalParams) => log.push(message)
    });

    expect(log.length).toEqual(0);
    expect(log.find(v => v === "Test")).toBeFalsy();

    console.log("Test");

    expect(log).toContain("[ LOG ] Test");
  });

  it("logs time", () => {
    consoleback({ showTime: true });

    console.log("The time is...");
  });
});
