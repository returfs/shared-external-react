import { cn } from 'src/lib';
import {
  focusNeutralTwoHundredEightHundredBgColors,
  hoverNeutralTwoHundredEightHundredBgColors,
  neutralNineHundredBgColors,
  neutralTwoHundredEightHundredBgColors,
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

export const surfaceBorderBgColors = neutralTwoHundredEightHundredBgColors;

export const surfaceActiveBgColors = neutralTwoHundredEightHundredBgColors;
