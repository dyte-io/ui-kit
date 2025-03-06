import { Plugin } from 'vue';
import { defineCustomElements } from '@dytesdk/ui-kit/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    defineCustomElements();
  },
};
