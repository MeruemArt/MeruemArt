import assert from "node:assert/strict";
import test from "node:test";
import { getSeasonalEffect } from "../src/utils/seasonal-effect.js";

test("explicit previews never stack and snow wins if both are requested", () => {
  const halloweenDate = new Date(2026, 9, 31);
  const christmasDate = new Date(2026, 11, 25);

  assert.equal(getSeasonalEffect(halloweenDate, new URLSearchParams("snow=1")), "snow");
  assert.equal(getSeasonalEffect(christmasDate, new URLSearchParams("halloween=1")), "halloween");
  assert.equal(getSeasonalEffect(halloweenDate, new URLSearchParams("snow=1&halloween=1")), "snow");
});

test("natural Halloween and Christmas windows stay separate", () => {
  assert.equal(getSeasonalEffect(new Date(2026, 9, 23), new URLSearchParams()), null);
  assert.equal(getSeasonalEffect(new Date(2026, 9, 24), new URLSearchParams()), "halloween");
  assert.equal(getSeasonalEffect(new Date(2026, 10, 1), new URLSearchParams()), "halloween");
  assert.equal(getSeasonalEffect(new Date(2026, 10, 2), new URLSearchParams()), null);
  assert.equal(getSeasonalEffect(new Date(2026, 11, 1), new URLSearchParams()), "snow");
  assert.equal(getSeasonalEffect(new Date(2027, 0, 6, 23, 59), new URLSearchParams()), "snow");
  assert.equal(getSeasonalEffect(new Date(2027, 0, 7), new URLSearchParams()), null);
});
