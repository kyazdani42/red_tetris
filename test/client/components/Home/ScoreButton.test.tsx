// tslint:disable
import * as React from 'react';
import { shallow } from 'enzyme';

import { ScoreButton, mapDispatchToProps } from '../../../../src/client/components/Home/ScoreButton';
import { getScores } from '../../../../src/client/redux/actions';

describe('testing the component', () => {
  const props = {
    dispatchGetScores: jest.fn()
  };
  const wrapper = shallow(<ScoreButton {...props} />);
  it('smoke tests the component', () => {
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('simulate the click', () => {
    wrapper.simulate('click');
    expect(props.dispatchGetScores).toHaveBeenCalled();
  })
});

describe('testing mapDispatchToProps', () => {
  const dispatch = jest.fn();
  const mapper = mapDispatchToProps(dispatch);
  it('checks the keys', () => {
    expect(Object.keys(mapper)).toEqual(['dispatchGetScores']);
  })
  it('checks the dispatch functions', () => {
    mapper.dispatchGetScores();
    expect(dispatch).toHaveBeenCalledWith(getScores());
  })
})