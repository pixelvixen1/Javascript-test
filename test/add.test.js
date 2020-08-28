import { add } from '../solution';

test('add(a, b)', () => {
    expect(add(2, 2)).toBe(4);
});

test('add with more than 2 arguments', () => {
    expect(add(1, 2, 3)).toBe(6);
});

test('add with 10 arguments', () => {
    expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).toBe(55);
});