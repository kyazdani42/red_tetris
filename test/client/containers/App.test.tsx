// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { App } from '../../../src/client/containers/AppContainer';

describe('testing the component', () => {
  it('smoke tests the component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.update()).toMatchSnapshot();
  });
});
