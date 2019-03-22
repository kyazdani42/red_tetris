// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { CreateNameModal } from '../../../../src/client/components/Home/CreateNameModal';

describe('testing the component', () => {
  const props = {
    playerName: null,
    handleDispatch: jest.fn(),
    setDisplayModal: () => null,
    dispatchSetError: () => null,
    error: null
  };
  const wrapper = shallow(<CreateNameModal {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.exists('#modal-name')).toBeTruthy();
    expect(wrapper.find('.error').exists()).toBeFalsy();
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('returns the component with an error', () => {
    wrapper.setProps({ error: 'testerror' });
    expect(wrapper.find('.error').exists()).toBeTruthy();
  })
  it('returns null and dispatch the handler', () => {
    wrapper.setProps({ playerName: 'test' });
    expect(wrapper.exists('#modal-name')).toBeFalsy();
    expect(props.handleDispatch).toHaveBeenCalled();
  })
});

