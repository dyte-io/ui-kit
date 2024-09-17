import { DesignTokens } from './design-tokens';
import { StyleProps, UIRoot } from './root';
import { Config } from './config';

export interface UIStyles {
  [selector: string]: StyleProps;
}

/**
 * A UI Config object defines the UI of the meeting
 */
export interface UIConfig {
  designTokens?: DesignTokens;
  styles?: UIStyles;
  root?: UIRoot;
  config?: Config;
}
