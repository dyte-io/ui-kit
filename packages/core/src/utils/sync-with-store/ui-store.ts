import { createStore } from '@stencil/store';
import { Meeting } from '../../types/dyte-client';
import { useLanguage, type DyteI18n } from '../../lib/lang';
import { defaultIconPack, type IconPack } from '../../lib/icons';
import { type States } from '../../types/props';
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

type Callback<T extends any = any> = (newValue: T, oldValue?: T) => void;

const storeCallbacks = new Map<string, Set<Callback>>();

// Handling callbacks on our own since stencil store
// doesn't provide a way to cleanup store subscriptions.
uiStore.on('set', (key, newValue, oldValue) => {
  const callbacks = storeCallbacks.get(key);
  if (callbacks) {
    callbacks.forEach((callback) => callback(newValue, oldValue));
  }
});

function addCallback(key: keyof DyteUIStore, callback: Callback) {
  const callbacks = storeCallbacks.get(key) || new Set();
  callbacks.add(callback);
  storeCallbacks.set(key, callbacks);
}

function deleteCallback(key: keyof DyteUIStore, callback: Callback) {
  const callbacks = storeCallbacks.get(key);
  if (callbacks) {
    callbacks.delete(callback);
    if (callbacks.size === 0) {
      storeCallbacks.delete(key);
    }
  }
}

export default uiStore;
export { addCallback, deleteCallback };
