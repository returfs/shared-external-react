import { forwardRef, Ref } from 'react';
import { cn } from '../../../lib';
import { ThemeProvider } from '../../../state';
import { neutralNineHundredBgColors } from '../../../styles';
import { nineFiftyTwoHundredTextColors } from '../../../styles/colors/Text';
import { EntranceProps } from './types';

const Entrance = forwardRef<HTMLDivElement, EntranceProps>(
  ({ themeColor, ...props }, ref: Ref<HTMLDivElement>) => {
    return (
      <ThemeProvider colorKey={themeColor}>
        <div
          {...props}
          ref={ref}
          className={cn(
            'h-full',
            neutralNineHundredBgColors,
            nineFiftyTwoHundredTextColors[themeColor],
            props.className,
          )}
        >
          {props.children}
        </div>
      </ThemeProvider>
    );
  },
);

export default Entrance;
