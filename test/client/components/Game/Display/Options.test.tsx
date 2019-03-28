// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { mapStateToProps, mapDispatchToProps, Options, checkbox } from '../../../../../src/client/components/Game/Display/Options';
import { setOptions } from '../../../../../src/client/redux/actions';

const props = {
  options: {
    invisible: false,
    mirror: false,
    reverse: false,
    speed: false
  },
  dispatchSetOptions: jest.fn()
};

describe('testing the options component', () => {
  it('smoke tests the component', () => {
    const wrapper = shallow(<Options {...props} />)
    expect(wrapper.update()).toMatchSnapshot();
  }) 
})

describe('testing checkbox component', () => {
  const wrapper = shallow(checkbox(true, 'test', () => null, 'displayName'));
  it('test the function', () => {
    expect(wrapper.update()).toMatchSnapshot();
  })
})

describe('testing mapStateToProps', () => {
  const state: any = {
    app: {
      options: 'options'
    }
  }
  it('test the mapping', () => {
    const expected = { options: 'options' };
    expect(mapStateToProps(state)).toEqual(expected);
  })
})

describe('testing mapDispatchToProps', () => {
  it('checks that dispatch is called', () => {
    const dispatch = jest.fn();
    const options = {
      invisible: false,
      mirror: false,
      reverse: false,
      speed: false
    };
    mapDispatchToProps(dispatch).dispatchSetOptions(options);
    expect(dispatch).toHaveBeenCalledWith(setOptions(options));
  })
})

