import { handleClick } from '../../../../src/client/components/Home/utils';

describe('testing handleClick', () => {
  it('check that the function has been called', () => {
    const fn = jest.fn();
    handleClick(fn)({ currentTarget: { style: { opacity: '' } } });
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledWith(true);
  });
});
