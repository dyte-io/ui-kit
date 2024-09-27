import { createStore, ObservableMap } from '@stencil/store';
import { States } from '../types/props';
import { getUserPreferences } from '../utils/user-prefs';
import { defaultIconPack } from './icons';
import { defaultConfig } from '../exports';
import { useLanguage } from './lang';

const DyteUIKitStore: ObservableMap<States> & {
  setComponentProps?: (newProps: States['componentProps']) => void;
} = createStore<States>({
  prefs: getUserPreferences(),
  componentProps: {
    meeting: null,
    iconPack: defaultIconPack,
    t: useLanguage(),
    config: defaultConfig,
  },
});

DyteUIKitStore.setComponentProps = (newProps: States['componentProps']) => {
  DyteUIKitStore.state.componentProps = { ...DyteUIKitStore.state.componentProps, ...newProps };
};

const storeId = 'DyteUIKitStore' + Math.random().toString().replace('.', '');

console.warn('Creating a new store:: ', storeId);

(window as any)[storeId] = DyteUIKitStore;

export { DyteUIKitStore };
