import { getElement, ComponentInterface } from '@stencil/core';
import store, { addCallback, deleteCallback, type DyteUIStore } from './ui-store';

export function SyncWithStore() {
  return function (proto: ComponentInterface, propName: keyof DyteUIStore) {
    let onChangeCallback: any;

    type ValueType = DyteUIStore[keyof DyteUIStore];

    const { connectedCallback, disconnectedCallback } = proto;

    proto.connectedCallback = function () {
      const host = getElement(this);
      const value = host[propName as string];

      if (!value) {
        const storeValue = store.state[propName];

        if (storeValue) {
          host[propName as string] = storeValue;
        }

        onChangeCallback = (newValue: ValueType, oldValue?: ValueType) => {
          const currentValue = host[propName as string];
          if (currentValue !== oldValue) {
            // remove callback since prop/state was changed manually
            deleteCallback(propName, onChangeCallback);
            onChangeCallback = undefined;
            return;
          }
          host[propName as string] = newValue;
        };

        addCallback(propName, onChangeCallback);
      }

      return connectedCallback?.call(this);
    };

    proto.disconnectedCallback = function () {
      deleteCallback(propName, onChangeCallback);
      return disconnectedCallback?.call(this);
    };
  };
}
