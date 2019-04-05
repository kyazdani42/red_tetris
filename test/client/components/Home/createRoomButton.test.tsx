// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { CreateRoomButton, mapStateToProps, mapDispatchToProps } from '../../../../src/client/components/Home/CreateRoom';
import { createRoom, setCreateModal } from '../../../../src/client/redux/actions';

describe('testing the component', () => {
  const props = {
    dispatchCreateRoom: () => null,
    dispatchSetModal: () => null,
    displayModal: true,
  };
  const wrapper = shallow(<CreateRoomButton {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('checks that join button exists', () => {
    expect(wrapper.find('.name-modal').exists()).toBeTruthy();
  })
  it('checks that join button doesn\'t exists', () => {
    wrapper.setProps({ displayModal: false });
    expect(wrapper.find('.name-modal').exists()).toBeFalsy();
  })
});

describe('testing mapStateToProps', () => {
  const state: any = { app: { createModal: 'modal' } };
  it('test the mapping', () => {
    const expected = { displayModal: 'modal' };
    expect(mapStateToProps(state)).toEqual(expected);
  })
})

describe('testing mapDispatchToProps', () => {
  const dispatch = jest.fn();
  const mapper = mapDispatchToProps(dispatch);
  it('checks the keys', () => {
    expect(Object.keys(mapper)).toEqual(['dispatchCreateRoom', 'dispatchSetModal']);
  })
  it('checks the dispatch functions', () => {
    mapper.dispatchCreateRoom('test');
    expect(dispatch).toHaveBeenCalledWith(createRoom('test'))
    mapper.dispatchSetModal(true);
    expect(dispatch).toHaveBeenCalledWith(setCreateModal(true));
  })
})