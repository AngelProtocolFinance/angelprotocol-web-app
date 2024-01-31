const move = () => {
  const START_VELOCITY = 45;
  const DIRECTION_DEG = 90; // ↑
  const SPREAD_DEG = 90; // \ 45 ↑ 45 /

  const directionRad = DIRECTION_DEG * (Math.PI / 180);
  const spreadRad = SPREAD_DEG * (Math.PI / 180);

  return {
    x: 0,
    y: 0,
    z: 0,
    wobble: Math.random() * 10,
    wobbleSpeed: 0.1 + Math.random() * 0.1,
    velocity: START_VELOCITY * 0.5 + Math.random() * START_VELOCITY,
    angle2D: -directionRad + (0.5 * spreadRad - Math.random() * spreadRad),
    angle3D: -(Math.PI / 4) + Math.random() * (Math.PI / 2),
    tiltAngle: Math.random() * Math.PI,
    tiltAngleSpeed: 0.1 + Math.random() * 0.3,
  };
};

type Move = ReturnType<typeof move>;
type Fetti = {
  element: HTMLElement;
  move: Move;
};

function moveFetti(fetti: Fetti, progress: number) {
  const DRAG = 0.1;

  /* eslint-disable no-param-reassign */
  fetti.move.x += Math.cos(fetti.move.angle2D) * fetti.move.velocity;
  fetti.move.y += Math.sin(fetti.move.angle2D) * fetti.move.velocity;
  fetti.move.z += Math.sin(fetti.move.angle3D) * fetti.move.velocity;
  fetti.move.wobble += fetti.move.wobbleSpeed;
  fetti.move.velocity -= fetti.move.velocity * DRAG;

  fetti.move.y += 3;
  fetti.move.tiltAngle += fetti.move.tiltAngleSpeed;

  const { x, y, z, tiltAngle, wobble } = fetti.move;
  const wobbleX = x + 10 * Math.cos(wobble);
  const wobbleY = y + 10 * Math.sin(wobble);
  const transform = `translate3d(${wobbleX}px, ${wobbleY}px, ${z}px) rotate3d(1, 1, 1, ${tiltAngle}rad)`;

  fetti.element.style.visibility = "visible";
  fetti.element.style.transform = transform;
  fetti.element.style.opacity = `${1 - progress}`;
}

/**
 * from library: https://github.com/daniel-lundin/dom-confetti/tree/master
 */
export function confetti(trigger: HTMLElement) {
  trigger.style.perspective = "none";

  //create and append particles to trigger
  const COUNT = 100;
  const COLORS = [
    "#F93F79", //red
    "#9BDD00", //green
    "#1a6ae0", //blue
    "#fce22a", //yello
  ];
  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  //create fettis and initial movement
  const fettis = Array.from({ length: COUNT }).map((_, idx) => {
    const element = document.createElement("div");
    const color = COLORS[idx % COLORS.length];
    element.style.backgroundColor = color;
    element.style.width = `${randomInt(5, 10)}px`;
    element.style.height = `${randomInt(12, 20)}px`;
    element.style.position = "absolute";
    element.style.willChange = "transform, opacity";
    element.style.visibility = "hidden";
    element.style.zIndex = "20";
    return { element, move: move() };
  });

  //append particles to trigger
  for (const fetti of fettis) {
    trigger.appendChild(fetti.element);
  }

  let startTime: number;

  //explode confetti
  const DURATION_MS = 7000;
  const STAGGER = 0.0001;
  return new Promise<void>((resolve) => {
    function update(time: number) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress =
        startTime === time ? 0 : (time - startTime) / DURATION_MS;

      for (const fetti of fettis.slice(0, Math.ceil(elapsed / STAGGER))) {
        moveFetti(fetti, progress);
      }

      if (time - startTime < DURATION_MS) {
        requestAnimationFrame(update);
        return;
      }

      //if done remove fettis
      for (const fetti of fettis) {
        if (fetti.element.parentNode !== trigger) continue;
        trigger.removeChild(fetti.element);
      }

      resolve();
    }
    requestAnimationFrame(update);
  });
}
