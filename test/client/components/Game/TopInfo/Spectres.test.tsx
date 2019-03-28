// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { Spectres } from '../../../../../src/client/components/Game/TopInfo/Spectres';

describe('testing the component', () => {
  const props = {
    data: {

    }
  };
  const wrapper = shallow(<Spectres {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
});

