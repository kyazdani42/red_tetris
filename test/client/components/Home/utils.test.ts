// tslint:disable
import { handleClick, getTimeout } from '../../../../src/client/components/Home/utils';

describe('testing handleClick', () => {
  it('check that the function has been called', () => {
    const fn = jest.fn();
    handleClick(fn)({ currentTarget: { style: { opacity: '' } } });
    expect(fn).toHaveBeenCalledWith(true);
  });
});

describe('testing getTimeout', () => {
  it('checks the target', () => {
    const target = { style: { opacity: '0' } };
    getTimeout(target)();
    expect(target.style.opacity).toEqual('1');
  });
});
