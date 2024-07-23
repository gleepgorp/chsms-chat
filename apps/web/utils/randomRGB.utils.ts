export default function randomColorRGB(): string {
  const random1 = Math.floor(Math.random() * 256);
  const random2 = Math.floor(Math.random() * 256);

  const constant = 0xA3;

  const position = Math.floor(Math.random() * 3);

  let r: number, g: number, b: number;

  switch (position) {
    case 0:
      r = constant;
      g = random1;
      b = random2;
      break;
    case 1:
      r = random1;
      g = constant;
      b = random2;
      break;
    default:
      r = random1;
      g = random2;
      b = constant;
  }

  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
};