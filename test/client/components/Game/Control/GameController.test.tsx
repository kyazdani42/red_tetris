// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { GameController, mapStateToProps, mapDispatchToProps, getEmitter } from '../../../../../src/client/components/Game/Control/GameController';
import { handleKeyPress } from '../../../../../src/client/redux/actions';

describe('testing the component', () => {
  const props = {
    keyPressed: null,
    dispatchHandleKey: () => null
  };
  const wrapper = shallow(<GameController {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
});

describe('testing mapper', () => {
  it('tests the mapStateToProps', () => {
    const state: any = { app: { key: 'test' } };
    expect(mapStateToProps(state)).toEqual({ keyPressed: 'test' });
  })
  it('tests mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchHandleKey(' ');
    expect(dispatch).toHaveBeenCalledWith(handleKeyPress(' '));
  })
})

describe('testing getEmitter', () => {
  const fn = jest.fn();
  const emitter = getEmitter(fn);
  it('triggers the emitter with the key', () => {
    emitter(' ')();
    expect(fn).toHaveBeenCalledWith(' ');
  })
})
