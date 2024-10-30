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

export enum HexColorKey {
  Red = '#FF0200',
  Orange = '#FFA502',
  Yellow = '#FDFF02',
  Gray = '#808080',
  Green = '#008001',
  Blue = '#1B00FF',
  Indigo = '#4B0082',
  Violet = '#EE82EF',
  Purple = '#800180',
  Pink = '#FFC0CC',
}

export type Color = {
  [key in ColorKey]: string;
};

export enum ThemeVariant {
  Dark = 'dark',
  Light = 'light',
  SystemDefault = 'system-default',
}
