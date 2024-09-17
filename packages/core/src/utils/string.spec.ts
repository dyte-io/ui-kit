import { getInitials } from './string';

describe('util:string:getInitials()', () => {
  test('should work with special characters as well', () => {
    expect(getInitials('Vaibhav Shinde')).toBe('VS');
    expect(getInitials('vaibhav shinde')).toBe('VS');

    expect(getInitials('Vaibhav - Participant')).toBe('VP');
    expect(getInitials('Vaibhav12 $212')).toBe('V2');
    expect(getInitials('!2 John ^Doe')).toBe('2J');
    expect(getInitials('!2 John ^Doe', 3)).toBe('2JD');
  });

  test('should work multibyte chars', () => {
    expect(getInitials('हिंदी')).toBe('ह');
    expect(getInitials('हिंदी भाषा')).toBe('हभ');

    expect(getInitials('हिंदी language')).toBe('हL');
  });
});
