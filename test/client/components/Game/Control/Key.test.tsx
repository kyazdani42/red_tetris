// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import Key from '../../../../../src/client/components/Game/Control/Key';

describe('testing the component', () => {
  const props = {
    emitter: jest.fn(),
    type: ' ',
    keyPressed: null
  };
  const wrapper = shallow(<Key {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('checks that key dispatch the emitter', () => {
    wrapper.simulate('click');
    expect(props.emitter).toHaveBeenCalled();
  });
  it('verify the src with space', () => {
    const image = wrapper.find('.key-img');
    expect(image.prop('src')).toEqual('/assets/iconspace.png');
  })
  it('verify the src with test', () => {
    wrapper.setProps({ type: 'test'});
    const image = wrapper.find('.key-img');
    expect(image.prop('src')).toEqual('/assets/icontest.png');
  })
  it('checks that keyPress is false', () => {
    const image = wrapper.find('.key-img');
    expect(image.prop('isPressed')).toBeFalsy();
  });
  it('checks that keyPress is true', () => {
    wrapper.setProps({ keyPressed: ' '});
    const image = wrapper.find('.key-img');
    expect(image.prop('isPressed')).toBeTruthy()
  });
});

