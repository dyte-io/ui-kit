import { cloneDeep } from 'lodash-es';

export default function clone(obj: any) {
  if (structuredClone) {
    return structuredClone(obj);
  }
  return cloneDeep(obj);
}
