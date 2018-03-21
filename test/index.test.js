const wrapper = require('./transpiled_wrapper');

describe('babel-plugin-transform-object-from-entries-plugin', () => {
  it('should be a function', () => {
    expect(wrapper.objectFromEntries).toBeDefined();
  });

  it('should return an object', () => {
    expect(wrapper.objectFromEntries([]).toString()).toEqual('[object Object]');
  });

  it('should return an object with key and value', () => {
    const actual = [[1, 2], [3, 4], ['A', 'B']];
    const expected = { 1: 2, 3: 4, A: 'B' };
    expect(wrapper.objectFromEntries(actual)).toBe(expected);
  });
});
