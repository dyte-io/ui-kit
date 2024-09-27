import { useEffect, useState } from 'react';
import { DyteUIKitStore } from '..';
import { States } from '@dytesdk/ui-kit';

export const useDyteUIKitStore = () => {
    const [states, setStates] = useState<States>(DyteUIKitStore.state);
    useEffect(() => {
        if(!DyteUIKitStore){
            return () => {};
        }
        const componentPropsCleanupFn = DyteUIKitStore.onChange('*', () => {
            setStates({...DyteUIKitStore.state});
        });
        return () => {
            componentPropsCleanupFn();
        };
      }, [DyteUIKitStore]);
      return states;
}