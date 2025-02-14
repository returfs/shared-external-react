import { cn } from 'src/lib';
import {
  focusNeutralTwoHundredEightHundredBgColors,
  hoverNeutralTwoHundredEightHundredBgColors,
  neutralNineHundredBgColors,
  neutralThreeHundredOverSeventySevenHundredOverSeventyBgColors,
} from '../Background';
import { neutralThreeHundredOverSeventySevenHundredOverSeventyBorderColors } from '../Border';

export const surfaceBgAndBorderColors = cn(
  neutralNineHundredBgColors,
  neutralThreeHundredOverSeventySevenHundredOverSeventyBorderColors,
);

export const surfaceBgColors = cn(' shadow-2xl', neutralNineHundredBgColors);

export const surfaceFocusBgColors = focusNeutralTwoHundredEightHundredBgColors;

export const surfaceHoverBgColors = hoverNeutralTwoHundredEightHundredBgColors;

export const surfaceBorderColors =
  neutralThreeHundredOverSeventySevenHundredOverSeventyBorderColors;

export const surfaceBorderBgColors =
  neutralThreeHundredOverSeventySevenHundredOverSeventyBgColors;

export const surfaceActiveBgColors =
  neutralThreeHundredOverSeventySevenHundredOverSeventyBgColors;
