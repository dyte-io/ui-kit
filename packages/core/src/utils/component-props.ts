import { DyteUIKitStore } from '../exports';

/**
 * This function uses `this`.
 * To use the function properly,
 *  make sure to bind the function with `this` context of components
 * Usage: DyteUIKitStore.onChange('componentProps', updateComponentProps.bind(this));
 */
export function updateComponentProps() {
  const componentProps = DyteUIKitStore.get('componentProps');
  if (componentProps.meeting) {
    this.meeting = componentProps.meeting;
  }
  if (componentProps.iconPack) {
    this.iconPack = componentProps.iconPack;
  }
}
