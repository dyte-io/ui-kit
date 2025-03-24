import { DyteI18n, getInitialStates, IconPack, Size, UIConfig, uiStore } from '@dytesdk/ui-kit';
import { DyteUIStore } from '@dytesdk/ui-kit/dist/types/utils/sync-with-store/ui-store';
import { useEffect, useState } from 'react';

const callbackMap = new Map<keyof DyteUIStore, Set<Function>>();

uiStore.use({
  set: (propName, newValue) => {
    const callbacks = callbackMap.get(propName);
    if (callbacks) {
      callbacks.forEach((callback) => callback(newValue));
    }
  },
});

function subscribe<T extends keyof DyteUIStore>(
  propName: T,
  callback: (value: DyteUIStore[T]) => void
) {
  if (!callbackMap.has(propName)) {
    callbackMap.set(propName, new Set());
  }
  callbackMap.get(propName)?.add(callback);
  return () => {
    callbackMap.get(propName)?.delete(callback);
  };
}

export function useDyteUIStates() {
  const [states, setStates] = useState(getInitialStates());

  useEffect(() => {
    return subscribe('states', (newStates) => {
      setStates(newStates);
    });
  }, []);

  return states;
}

export function useDyteUISize() {
  const [size, setSize] = useState<Size>();

  useEffect(() => {
    return subscribe('size', (newSize) => {
      setSize(newSize);
    });
  }, []);

  return size;
}

export function useDyteUIConfig() {
  const [config, setConfig] = useState<UIConfig>();

  useEffect(() => {
    return subscribe('config', (newConfig) => {
      setConfig(newConfig);
    });
  }, []);

  return config;
}

export function useDyteIconPack() {
  const [iconPack, setIconPack] = useState<IconPack>();

  useEffect(() => {
    return subscribe('iconPack', (newIconPack) => {
      setIconPack(newIconPack);
    });
  }, []);

  return iconPack;
}

export function useDyteLang() {
  const [lang, setLang] = useState<DyteI18n>();

  useEffect(() => {
    return subscribe('t', (newLang) => {
      setLang(newLang);
    });
  }, []);

  return lang;
}
