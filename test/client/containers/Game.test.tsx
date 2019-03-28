// tslint:disable
import { shallow } from 'enzyme';
import * as React from 'react';
import { Redirect } from 'react-router';

import { GameContainer, GameComponent, mapStateToProps } from '../../../src/client/containers/GameContainer';

describe('testing the component', () => {
  it('doesn\'t render the components but redirect when socket is null', () => {
    const wrapper = shallow(<GameContainer socket={null} />);
    expect(wrapper.containsMatchingElement(<Redirect to="/" />)).toBeTruthy();
  });
  it('renders the component when socket is declared', () => {
    const wrapper = shallow(<GameContainer socket={{} as any}/>);
    expect(wrapper.containsMatchingElement(<GameComponent />)).toBeTruthy();
  })
  it('smoke tests the component', () => {
    const wrapper = shallow(<GameContainer socket={{} as any} />);
    expect(wrapper.update()).toMatchSnapshot();
  })
});

describe('testing GameComponent', () => {
  it('smoke tests the component', () => {
    const wrapper = shallow(<GameComponent />);
    expect(wrapper.update()).toMatchSnapshot();
  })
})

describe('testing mapStateToProps', () => {
  const state = {
    app: {
      socket: 1
    }
  };
  it('tests the mapping', () => {
    const expected = {
      socket: 1
    };
    expect(mapStateToProps(state)).toEqual(expected);
  });
})