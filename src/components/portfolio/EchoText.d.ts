import type { CSSProperties, FC } from 'react';

export interface EchoTextProps {
  text?: string;
  echoes?: number;
  lag?: number;
  offset?: number;
  direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  fade?: number;
  blur?: number;
  tint?: string | false;
  echoColors?: [string, string];
  echoStyle?: 'solid' | 'outline';
  echoScale?: number;
  mode?: 'entrance' | 'pointer' | 'both';
  trail?: 'pointer' | 'auto' | 'scroll';
  clickBurst?: boolean;
  cursorRadius?: number;
  duration?: number;
  ease?: 'linear' | 'ease-out' | 'ease-in-out' | 'snappy';
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

declare const EchoText: FC<EchoTextProps>;
export default EchoText;
