import consoleback from "../src/index";

const oldLog = console.log
const oldWarn = console.warn
const oldErr = console.error

afterEach(() => {
  console.log = oldLog
  console.warn = oldWarn
  console.error = oldErr
})

describe("natural-order", () => {
  it("allows logging to console.log", () => {
    consoleback()

    console.log("Hi!")
  })

  it("allows logging to console.warn", () => {
    consoleback()

    console.warn("Hi!")
  })

  it("allows logging to console.error", () => {
    consoleback()

    console.error("Hi!")
  })

  it("accepts callback", () => {
    const log: string[] = [];

    consoleback({callback: (type, message, optionalParams) => log.push(message)})

    expect(log.length).toEqual(0);
    expect(log.find(v => v === "Test")).toBeFalsy()

    console.log("Test")

    expect(log).toContain("Test")
  })

  it("logs time", () => {
    consoleback({showTime: true})

    console.log("The time is...")
  })
});
