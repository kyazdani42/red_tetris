// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { Music } from '../../../src/client/containers/Music';

describe('testing the component', () => {
  const props = {
    isPlaying: false,
    dispatchSetIsPlaying: () => null
  };
  const wrapper = shallow(<Music {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('checks if the source is correct', () => {
    const mus = wrapper.find('.audio-icon');
    expect(mus.prop('src')).toEqual('/assets/iconplay.png');
  })
  it('checks if the source is correct', () => {
    wrapper.setProps({ isPlaying: true })
    const mus = wrapper.find('.audio-icon');
    expect(mus.prop('src')).toEqual('/assets/iconpause.png');
  })
});

