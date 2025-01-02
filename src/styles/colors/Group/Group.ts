import { cn } from 'src/lib';
import {
  focusNeutralOneHundredEightHundredBgColors,
  hoverNeutralOneHundredEightHundredBgColors,
  neutralNineHundredBgColors,
  neutralTwoHundredEightHundredBgColors,
} from '../Background';
import { neutralTwoHundredOverSeventySevenHundredOverSeventyBorderColors } from '../Border';

export const surfaceBgAndBorderColors = cn(
  ' shadow-2xl',
  neutralNineHundredBgColors,
  neutralTwoHundredOverSeventySevenHundredOverSeventyBorderColors,
);

export const surfaceBgColors = cn(' shadow-2xl', neutralNineHundredBgColors);

export const surfaceFocusBgColors = focusNeutralOneHundredEightHundredBgColors;

export const surfaceHoverBgColors = hoverNeutralOneHundredEightHundredBgColors;

export const surfaceBorderColors =
  neutralTwoHundredOverSeventySevenHundredOverSeventyBorderColors;

export const surfaceBorderBgColors = neutralTwoHundredEightHundredBgColors;

export const surfaceActiveBgColors = neutralTwoHundredEightHundredBgColors;
