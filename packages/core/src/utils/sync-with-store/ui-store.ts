import { createStore } from '@stencil/store';
import { defaultIconPack, DyteI18n, IconPack, States, useLanguage } from '../../exports';
import { Meeting } from '../../types/dyte-client';
import { getUserPreferences } from '../user-prefs';

export interface DyteUIStore {
  meeting: Meeting | undefined;
  iconPack: IconPack;
  t: DyteI18n;
  states: States;
}

const initialState: States = {
  meeting: 'idle',
  prefs: getUserPreferences(),
};

const uiStore = createStore<DyteUIStore>({
  meeting: undefined,
  t: useLanguage(),
  iconPack: defaultIconPack,
  states: initialState,
});

export default uiStore;
