// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { JoinButton, mapStateToProps, mapDispatchToProps } from '../../../../src/client/components/Home/JoinButton';
import { setModal, joinRoom } from '../../../../src/client/redux/actions';

describe('testing the component', () => {
  const props = {
    dispatchJoinRoom: () => () => null,
    dispatchSetModal: () => null,
    displayModal: true,
    roomId: 'test-id'
  };
  const wrapper = shallow(<JoinButton {...props} />);
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
  const state: any = { app: { modal: 'modal' } };
  const ownProps = { roomId: 'roomIdTest' };
  it('test the mapping', () => {
    const expected = { displayModal: 'modal', roomId: 'roomIdTest' };
    expect(mapStateToProps(state, ownProps)).toEqual(expected);
  })
})

describe('testing mapDispatchToProps', () => {
  const dispatch = jest.fn();
  const mapper = mapDispatchToProps(dispatch);
  it('checks the keys', () => {
    expect(Object.keys(mapper)).toEqual(['dispatchJoinRoom', 'dispatchSetModal']);
  })
  it('checks the dispatch functions', () => {
    mapper.dispatchJoinRoom('test')('innerTest');
    expect(dispatch).toHaveBeenCalledWith(joinRoom({ room: 'test', playerName: 'innerTest' }));
    mapper.dispatchSetModal(true);
    expect(dispatch).toHaveBeenCalledWith(setModal(true));
  })
})