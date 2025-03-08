import { getElement, ComponentInterface } from '@stencil/core';
import store, { addCallback, deleteCallback, type DyteUIStore } from './ui-store';

export function SyncWithStore() {
  return function (proto: ComponentInterface, propName: keyof DyteUIStore) {
    let isUpdatingFromStore = false;
    let onChangeCallback: (newValue: any) => void | undefined;

    const { connectedCallback, componentShouldUpdate, disconnectedCallback } = proto;

    proto.connectedCallback = function () {
      const host = getElement(this);
      const value = host[propName];

      if (!value) {
        const storeValue = store.state[propName];

        if (storeValue) {
          // if no initial value, set it from store
          isUpdatingFromStore = true;
          host[propName] = storeValue;
          isUpdatingFromStore = false;
        }

        onChangeCallback = (newValue) => {
          isUpdatingFromStore = true;
          host[propName] = newValue;
          isUpdatingFromStore = false;
        };

        addCallback(propName, onChangeCallback);
      }

      return connectedCallback?.call(this);
    };

    proto.componentShouldUpdate = function (newVal, oldVal, prop: string) {
      if (prop === propName && !isUpdatingFromStore) {
        // if user updates prop after component init, delete callback
        deleteCallback(propName, onChangeCallback);
        onChangeCallback = undefined;
      }
      return componentShouldUpdate?.call(this, newVal, oldVal, prop);
    };

    proto.disconnectedCallback = function () {
      deleteCallback(propName, onChangeCallback);
      onChangeCallback = undefined;
      return disconnectedCallback?.call(this);
    };
  };
}
