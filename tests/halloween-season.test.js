import assert from "node:assert/strict";
import test from "node:test";
import { isHalloweenSeason } from "../src/utils/halloween-season.js";

test("Halloween season runs from October 24 through November 1", () => {
  assert.equal(isHalloweenSeason(new Date(2026, 9, 23)), false);
  assert.equal(isHalloweenSeason(new Date(2026, 9, 24)), true);
  assert.equal(isHalloweenSeason(new Date(2026, 9, 31)), true);
  assert.equal(isHalloweenSeason(new Date(2026, 10, 1)), true);
  assert.equal(isHalloweenSeason(new Date(2026, 10, 2)), false);
});
