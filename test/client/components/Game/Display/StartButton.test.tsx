// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { StartButton, mapStateToProps } from '../../../../../src/client/components/Game/Display/StartButton'

const props = { color: 'testColor' };

describe('testing nextBlock', () => {
  const props: any = {
    socket: { emit: jest.fn() },
    options: { test: 'truetest' }
  };
  const wrapper = shallow(<StartButton {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  })
  it('simulate the click', () => {
    wrapper.simulate('click');
    expect(props.socket.emit).toHaveBeenCalledWith('start', { test: 'truetest' });
  })
})

describe('testing mapStateToProps', () => {
  const state: any = {
    app: {
      options: 'options'
    }
  };
  it('checks the mapping', () => {
    const expected = {
      options: 'options'
    }
    expect(mapStateToProps(state)).toEqual(expected);
  })
});
