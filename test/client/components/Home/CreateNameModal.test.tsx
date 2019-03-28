// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { CreateNameModal, handleRemoveModal, handleCreateRoom, handleKeyDown, mapStateToProps, mapDispatchToProps } from '../../../../src/client/components/Home/CreateNameModal';
import { setError } from '../../../../src/client/redux/actions';

describe('testing the component', () => {
  const props = {
    playerName: null,
    handleDispatch: jest.fn(),
    setDisplayModal: () => null,
    dispatchSetError: () => null,
    error: null
  };
  const wrapper = shallow(<CreateNameModal {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.exists('#modal-name')).toBeTruthy();
    expect(wrapper.find('.error').exists()).toBeFalsy();
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('returns the component with an error', () => {
    wrapper.setProps({ error: 'testerror' });
    expect(wrapper.find('.error').exists()).toBeTruthy();
  })
  it('returns null and dispatch the handler', () => {
    wrapper.setProps({ playerName: 'test' });
    expect(wrapper.exists('#modal-name')).toBeFalsy();
    expect(props.handleDispatch).toHaveBeenCalled();
  })
});

describe('testing handleRemoveModal', () => {
  it('calls the function', () => {
    const fn = jest.fn();
    handleRemoveModal(fn)({ target: { id: 'modal-name' } });
    expect(fn).toHaveBeenCalled();
  })
  it('doesn\'t call the function', () => {
    const fn = jest.fn();
    handleRemoveModal(fn)({ target: { id: 'lala' } });
    expect(fn).not.toHaveBeenCalled();
  })
})

describe('testing handleRemoveModal', () => {
  const getValue = (ok: boolean) => ({ target: { previousSibling: { firstChild: { nextElementSibling: { value: ok ? '1' : '' } } } } });
  it('calls the function', () => {
    const fn = jest.fn();
    const e = getValue(true);
    handleCreateRoom(fn, () => null)(e);
    expect(fn).toHaveBeenCalled();
  })
  it('doesn\'t call the function', () => {
    const fn = jest.fn();
    const e = getValue(false);
    handleCreateRoom(() => null, fn)(e);
    expect(fn).toHaveBeenCalled();
  })
})

describe('testing handleKeyDown', () => {
  const getValue = (key: string, value: string) => ({ key, target: { value } });
  it('calls the function', () => {
    const fn = jest.fn();
    const e = getValue('Enter', '');
    handleKeyDown(() => null, fn)(e);
    expect(fn).toHaveBeenCalledTimes(2);
  })
  it('calls both functions', () => {
    const e = getValue('Enter', 'something');
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    handleKeyDown(fn1, fn2)(e);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith('something');
  })
  it('only calls the second function', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const e = getValue('', '');
    handleKeyDown(fn1, fn2)(e);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).not.toHaveBeenCalled();
  })
})

describe('testing funcToProps', () => {
  it('tests mapStateToProps', () => {
    const state: any = {
      app: {
        error: 'testerror',
        playerName: 'testPlayer'
      }
    };
    const ownProps = {
      test: 'test'
    };
    const expected = {
      playerName: 'testPlayer',
      error: 'testerror',
      test: 'test'
    };
    expect(mapStateToProps(state, ownProps)).toEqual(expected);
  })
  it('tests mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchSetError(null);
    expect(dispatch).toHaveBeenCalledWith(setError(null));
  })
})