// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';
import { Score } from '../../../../../src/client/components/Game/Display/Score';

const props = { score: 100 };

describe('testing nextBlock', () => {
  it('smoke tests the component', () => {
    expect(shallow(<Score {...props} />).update()).toMatchSnapshot();
  })
})

