import { cn } from '../../../lib';
import {
  focusNeutralTwoHundredEightHundredBgColors,
  hoverNeutralTwoHundredEightHundredBgColors,
  neutralNineHundredBgColors,
  neutralThreeHundredOverSeventySevenHundredOverSeventyBgColors,
} from '../Background';
import { neutralThreeHundredOverSeventySevenHundredOverSeventyBorderColors } from '../Border';
import { neutralThreeHundredOverSeventySevenHundredOverSeventyDivideColors } from '../Divide';

export const surfaceBgAndBorderColors = cn(
  neutralNineHundredBgColors,
  neutralThreeHundredOverSeventySevenHundredOverSeventyBorderColors,
);

export const surfaceBgColors = cn(' shadow-2xl', neutralNineHundredBgColors);

export const surfaceFocusBgColors = focusNeutralTwoHundredEightHundredBgColors;

export const surfaceHoverBgColors = hoverNeutralTwoHundredEightHundredBgColors;

export const surfaceBorderColors =
  neutralThreeHundredOverSeventySevenHundredOverSeventyBorderColors;

export const surfaceDivideColors =
  neutralThreeHundredOverSeventySevenHundredOverSeventyDivideColors;

export const surfaceBorderBgColors =
  neutralThreeHundredOverSeventySevenHundredOverSeventyBgColors;

export const surfaceActiveBgColors =
  neutralThreeHundredOverSeventySevenHundredOverSeventyBgColors;
