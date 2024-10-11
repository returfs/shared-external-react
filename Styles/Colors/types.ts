export enum ColorKey {
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Gray = 'gray',
  Green = 'green',
  Blue = 'blue',
  Indigo = 'indigo',
  Violet = 'violet',
  Purple = 'purple',
  Pink = 'pink',
}

export type Color = {
  [key in ColorKey]: string;
};
