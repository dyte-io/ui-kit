import { createStore } from '@stencil/store';
import { States } from '../types/props';
import { getUserPreferences } from '../utils/user-prefs';

const { state, onChange } = createStore<States>({
  prefs: getUserPreferences(),
});

export default state;
export { onChange };
