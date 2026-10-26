const TAU = Math.PI * 2;

export function getBatFrame(bat, progress, width, height, tiltX = 0, tiltY = 0, pulse = 0) {
  const radius = bat.depth * 36 + 24;
  const size = radius * 2;
  let x = (((bat.startProgress + bat.crossings * progress) % 1) * (width + size)) - radius;
  if (bat.leftward) x = width - x;

  const depth = bat.depth * 40;

  return {
    x: x + tiltX * depth,
    y: bat.baseY * height
      + Math.sin(bat.bobs * TAU * progress + bat.bobPhase) * bat.bobAmplitude * height
      + depth * tiltY
      - (size + height) * pulse * (bat.depth * 0.6 + 0.8),
    radius,
    flap: Math.sin(TAU * progress * bat.flaps + bat.flapPhase),
    alpha: (bat.depth * 0.5 + 0.3) * (1 - 0.6 * pulse),
  };
}

export function getLanternFrame(lantern, progress, width, height, tiltX = 0, tiltY = 0, pulse = 0) {
  const radius = lantern.depth * 14 + 20;
  const angle = progress * TAU;

  return {
    x: lantern.x * width + tiltX * lantern.depth * 30,
    y: height - 120 - radius * 1.4
      + Math.sin(lantern.bobs * angle + lantern.bobPhase) * radius * 0.25
      + lantern.depth * 30 * tiltY,
    radius,
    flicker: (Math.sin(angle * lantern.flickers) * 0.2 + 0.8) * (1.5 * pulse + 1),
  };
}
