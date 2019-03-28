// tslint:disable
import { shallow } from 'enzyme';
import * as React from 'react';
import { Redirect } from 'react-router';

import { RoomContainer, RoomComponent, getRoomRows, mapStateToProps } from '../../../src/client/containers/RoomContainer';

describe('testing the component', () => {
  const getProps = (rooms: any, socket: any, playerName: any) => ({
    rooms,
    socket,
    playerName
  });
  it('returns the room component when socket is null', () => {
    const props = getProps([], null, null);
    const wrapper = shallow(<RoomContainer {...props} />);
    expect(wrapper.containsMatchingElement(<RoomComponent rooms={props.rooms} />)).toBeTruthy();
  });
  it('returns a redirection with the expected url when socket is not null', () => {
    const props = getProps([], { nsp: 'test' }, 'player');
    const wrapper = shallow(<RoomContainer {...props} />);
    expect(wrapper.containsMatchingElement(<Redirect to="test[player]" />)).toBeTruthy();
  })
  it('smoke tests the component', () => {
    const props = getProps([{ id: 1 }, { id: 2 }], null, null);
    const wrapper = shallow(<RoomComponent {...props} />);
    expect(wrapper.update()).toMatchSnapshot();
  })
});

describe('testing getRoomRows', () => {
  const getElements = (i: number) => {
    const els = [];
    for (let x = 0; x < i; x++) {
      els.push({ name: 'room' + x, players: 1, ownerName: x.toString(20) as any, running: Boolean(x % 2) });
    }
    return els;
  };
  it('returns the number of elements in the array mapped to nodes', () => {
    const elements = getElements(10);
    const nodes = getRoomRows(elements);
    expect(nodes.length).toBe(10);
  });
  it('checks the first element has the correct attributed key', () => {
    const elements = getElements(1);
    const nodes = getRoomRows(elements);
    expect(nodes[0].key).toEqual('room-_room0_0');
  });
})

describe('testing mapStateToProps', () => {
  const state: any = {
    app: {
      rooms: [],
      socket: 'testSocket',
      playerName: 'testPlayer'
    }
  };
  it('tests the function', () => {
    expect(mapStateToProps(state)).toEqual(state.app);
  })
})
