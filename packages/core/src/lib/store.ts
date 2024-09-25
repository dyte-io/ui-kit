import { createStore, ObservableMap } from '@stencil/store';
import { States } from '../types/props';
import { getUserPreferences } from '../utils/user-prefs';

const DyteUIKitStore: ObservableMap<States> & {
  setComponentProps?: (newProps: States['componentProps']) => void;
} = createStore<States>({
  prefs: getUserPreferences(),
  componentProps: {
    meeting: null,
  },
});

DyteUIKitStore.setComponentProps = (newProps: States['componentProps']) => {
  DyteUIKitStore.state.componentProps = { ...DyteUIKitStore.state.componentProps, ...newProps };
};

(window as any).DyteUIKitStore = DyteUIKitStore;

export { DyteUIKitStore };
