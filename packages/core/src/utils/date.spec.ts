import { differenceInMinutes, elapsedDuration } from './date';

const minutes = (mins: number) => mins * 60 * 1000;

const baseDate = new Date(0);

const addMinutes = (mins: number) => new Date(baseDate.getTime() + minutes(mins));
const addHours = (hours: number) => new Date(baseDate.getTime() + minutes(hours * 60));
const addDays = (days: number) => new Date(baseDate.getTime() + minutes(days * 24 * 60));

describe('differnceInMinutes()', () => {
  it('should calculate minutes correctly', () => {
    for (let i = 50; i < 200; i += 50) {
      const newDate = addMinutes(i);
      expect(differenceInMinutes(baseDate, newDate)).toBe(i);
    }
  });
});

describe('elapsedDuration()', () => {
  let newDate;

  it("should show 'just now' when minutes < 2", () => {
    newDate = addMinutes(0);
    expect(elapsedDuration(baseDate, newDate)).toBe('just now');

    newDate = addMinutes(1);
    expect(elapsedDuration(baseDate, newDate)).toBe('just now');

    newDate = addMinutes(2);
    expect(elapsedDuration(baseDate, newDate)).toBe('2m ago');
  });

  it("should show minutes '%dm ago' when minutes < 60", () => {
    for (let i = 10; i < 60; i += 12) {
      newDate = addMinutes(i);
      expect(elapsedDuration(baseDate, newDate)).toBe(`${i}m ago`);
    }
    newDate = addMinutes(64);
    expect(elapsedDuration(baseDate, newDate)).toBe('about 1h ago');
  });

  it("should show hours '%dh ago' when hours < 24", () => {
    for (let i = 2; i < 25; i += 4) {
      newDate = addHours(i);
      expect(elapsedDuration(baseDate, newDate)).toBe(`${i}h ago`);
    }
  });

  it("should show days '%dd ago' when days < 7", () => {
    for (let i = 2; i < 7; i += 2) {
      newDate = addDays(i);
      expect(elapsedDuration(baseDate, newDate)).toBe(`${i}d ago`);
    }
  });

  it("should show weeks '%dw ago' when days > 7", () => {
    for (let i = 7; i < 50; i += 7) {
      newDate = addDays(i);
      expect(elapsedDuration(baseDate, newDate)).toBe(`${i / 7}w ago`);
    }
  });
});
