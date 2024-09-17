import { computeSelectors } from './utils';
import { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';

const arraysAreEqual = (result: any, expected: any) => {
  expect(result.length).toBe(expected.length);
  expected.forEach((value, index) => {
    expect(result[index]).toBe(value);
  });
};

describe('computeSelectors()', () => {
  const element = 'dyte-meeting';
  let size: Size = 'sm';

  it('should work with simple arrays', () => {
    const states: States = { meeting: 'joined' };
    const config: UIConfig = {
      root: {
        'dyte-meeting': ['dyte-header'],
      },
    };
    const selectors = computeSelectors({ element, states, config, size });
    const expected = ['dyte-meeting', 'dyte-meeting.sm'];

    arraysAreEqual(selectors, expected);
  });

  it('should work with key value pairs', () => {
    size = 'md';
    const states: States = { meeting: 'joined' };
    const config: UIConfig = {
      root: {
        'dyte-meeting': { state: 'meeting' },
      },
    };

    const selectors = computeSelectors({ element, states, config, size });
    const expected = [
      'dyte-meeting',
      'dyte-meeting.md',
      'dyte-meeting[meeting=joined]',
      'dyte-meeting[meeting=joined].md',
    ];

    arraysAreEqual(selectors, expected);
  });

  it('should work with just boolean states', () => {
    size = 'lg';
    const states: States = { activeSettings: true };
    const config: UIConfig = {
      root: {
        'dyte-meeting': { states: ['activeSettings'] },
      },
    };

    const selectors = computeSelectors({ element, states, config, size });
    const expected = [
      'dyte-meeting',
      'dyte-meeting.lg',
      'dyte-meeting.activeSettings',
      'dyte-meeting.activeSettings.lg',
    ];

    arraysAreEqual(selectors, expected);
  });

  it('should work with both key-value and boolean states', () => {
    size = 'lg';
    const states: States = { meeting: 'joined', activeSettings: true };
    const config: UIConfig = {
      root: {
        'dyte-meeting': { states: ['activeSettings'], state: 'meeting' },
      },
    };

    const selectors = computeSelectors({ element, states, config, size });
    const expected = [
      'dyte-meeting',
      'dyte-meeting.lg',
      'dyte-meeting.activeSettings',
      'dyte-meeting.activeSettings.lg',
      'dyte-meeting[meeting=joined]',
      'dyte-meeting[meeting=joined].lg',
      'dyte-meeting[meeting=joined].activeSettings',
      'dyte-meeting[meeting=joined].activeSettings.lg',
    ];

    arraysAreEqual(selectors, expected);
  });
});
