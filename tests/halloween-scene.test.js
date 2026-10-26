import assert from "node:assert/strict";
import test from "node:test";
import { getBatFrame, getLanternFrame } from "../src/utils/halloween-scene.js";

const bat = {
  startProgress: 0.1,
  crossings: 8,
  leftward: false,
  baseY: 0.3,
  bobs: 20,
  bobAmplitude: 0.02,
  bobPhase: 0,
  flaps: 480,
  flapPhase: 0,
  depth: 0.5,
};

test("bats cross the viewport and flap during the 120-second cycle", () => {
  const early = getBatFrame(bat, 0, 1000, 800);
  const later = getBatFrame(bat, 0.01, 1000, 800);

  assert.notEqual(later.x, early.x);
  assert.notEqual(later.flap, early.flap);
});

test("lanterns stay near the bottom and their light flickers", () => {
  const lantern = { x: 0.12, bobs: 24, bobPhase: 0, flickers: 600, depth: 0.7 };
  const steady = getLanternFrame(lantern, 0, 1000, 800);
  const later = getLanternFrame(lantern, 0.01, 1000, 800);

  assert.equal(steady.x, 120);
  assert.ok(steady.y > 600 && steady.y < 800);
  assert.notEqual(later.flicker, steady.flicker);
});
