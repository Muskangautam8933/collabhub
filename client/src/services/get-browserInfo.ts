import { UAParser } from "ua-parser-js";

export type BrowserInfo = ReturnType<typeof getBrowserInfo>;

export default function getBrowserInfo() {
  const parser = new UAParser(); // ✅ create instance
  const result = parser.getResult(); // ✅ parse UA

  return {
    browser: result.browser.name,
    browserVersion: result.browser.version,
    os: result.os.name,
    osVersion: result.os.version,
    deviceType: result.device.type || "desktop",
    userAgent: navigator.userAgent,
    language: navigator.language,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}
