export const colors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

export const randomColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  return hex;
};

export const randomColorName = (): string => {

  return colors[Math.floor(Math.random() * colors.length)];
};

export const getColorCodeFromText = (tag: string) => {
  const centerIndex = Math.floor(tag.length / 2);
  const centerCharacter = tag.charAt(centerIndex - 1);
  const index = centerCharacter.charCodeAt(0) % colors.length;
  return colors[index];
};