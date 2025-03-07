import { getElement, ComponentInterface } from '@stencil/core';
import store, { type DyteUIStore } from './ui-store';

export function SyncWithStore() {
  return function (proto: ComponentInterface, propName: keyof DyteUIStore) {
    const { connectedCallback } = proto;

    proto.connectedCallback = function () {
      const host = getElement(this);
      const value = host[propName];

      if (!value) {
        const storeValue = store.state[propName];

        if (storeValue) {
          host[propName] = storeValue;
        }

        store.onChange(propName, (newValue) => {
          host[propName] = newValue;
        });
      }

      return connectedCallback?.call(this);
    };
  };
}
