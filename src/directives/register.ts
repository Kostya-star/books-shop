import { App } from 'vue';
import { VFocus } from './focus';
import { VTooltip } from './tooltip';

export function registerDirectives(app: App): void {
  app.directive('focus', VFocus);
  app.directive('tooltip', VTooltip);
}
