// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { Music, handleAudio, mapDispatchToProps, mapStateToProps } from '../../../src/client/containers/Music';

describe('testing the component', () => {
  const props = {
    isPlaying: false,
    dispatchSetIsPlaying: jest.fn()
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

describe('testing handleAudio', () => {
  const pauseFn = jest.fn();
  const playFn = jest.fn();
  const document = {
    getElementById: () => ({
      pause: pauseFn,
      play: playFn
    })
  };
  it('triggers the play when isPlaying is false', () => {
    const handler = handleAudio(document, false, () => null);
    handler();
    expect(playFn).toHaveBeenCalled();
  })
  it('triggers the pause when isPlaying is true', () => {
    const handler = handleAudio(document, true, () => null);
    handler();
    expect(pauseFn).toHaveBeenCalled();
  })
})

describe('testing funToProps', () => {
  it('tests mapStateToProps', () => {
    const state: any = {
      app: {
        musicPlaying: true
      }
    };
    const expected = {
      isPlaying: true
    };
    expect(mapStateToProps(state)).toEqual(expected);
  })
  it('tests mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchSetIsPlaying();
    expect(dispatch).toHaveBeenCalled();
  })
})