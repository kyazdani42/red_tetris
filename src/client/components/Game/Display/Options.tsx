import * as React from 'react';
import { connect } from 'react-redux';

import { setOptions } from '../../../actions/actions';
import { State } from '../../../store';
import { OptionLabelWrapper, OptionsWrapper } from './styles';

interface Props {
  options: Options;
  dispatchSetOptions: (options: Options) => void;
}

const handleDispatch = (params: Props) => (option: { name: string; on: boolean }) =>
  params.dispatchSetOptions({ ...params.options, [option.name]: option.on });

export const Options: React.SFC<Props> = ({ options, dispatchSetOptions }) => {
  const dispatch = handleDispatch({ options, dispatchSetOptions });
  return (
    <OptionsWrapper>
      {checkbox(options.invisible, 'invisible', dispatch)}
      {checkbox(options.mirror, 'mirror', dispatch)}
      {checkbox(options.reverse, 'reverse', dispatch)}
    </OptionsWrapper>
  );
};

const checkbox = (
  checked: boolean,
  name: string,
  dispatch: (option: { name: string; on: boolean }) => void
) => (
  <OptionLabelWrapper>
    <label>{name}</label>
    <input type="checkbox" checked={checked} onChange={() => dispatch({ name, on: !checked })} />
  </OptionLabelWrapper>
);

const mapStateToProps = (state: State) => ({
  options: state.app.options
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchSetOptions: (options: Options) => dispatch(setOptions(options))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
