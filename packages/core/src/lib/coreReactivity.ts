import DyteClient from '@dytesdk/web-core';
import { forceUpdate } from '@stencil/core';
import { DyteUpdates, shouldUpdate } from './coreReactivityUpdates';

type StateSelector<T extends object, U> = (state: T) => U;

let updates;

export function DyteState<StateSlice>(
  selector: StateSelector<DyteClient, StateSlice>
): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol): void {
    let value: StateSlice;
    let object = undefined;

    function initialise() {
      const meeting = object['meeting'];
      // TEMP POC code, move DyteUpdates init to context
      if (updates === undefined) {
        updates = new DyteUpdates(meeting);
      }
      // END
      const currentState = meeting && selector(meeting);
      const listener = () => {
        const newStateSlice = meeting && selector(meeting);
        if (shouldUpdate(value, newStateSlice)) {
          value = newStateSlice;
          forceUpdate(object);
        }
      };

      if (currentState && typeof currentState === 'object' && 'addListener' in currentState) {
        (currentState as any).addListener('*', () => forceUpdate(object));
        return;
      }
      updates.addListener(listener);
    }

    Object.defineProperty(target, propertyKey, {
      get: function () {
        return value;
      },
      set: function (newValue: StateSlice) {
        value = newValue;
        if (object !== this) {
          object = this;
          initialise();
        }
      },
      enumerable: true,
      configurable: true,
    });
  };
}
