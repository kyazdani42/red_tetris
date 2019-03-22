// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { GameController } from '../../../../../src/client/components/Game/Control/GameController';

describe('testing the component', () => {
  const props = {
    keyPressed: null,
    dispatchHandleKey: jest.fn()
  };
  const wrapper = shallow(<GameController {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
});
