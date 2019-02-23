import * as React from 'react';

import { BlockStyle, NextBlockStyle } from './styles';

interface Props {
  color: string;
}

export const NextBlock: React.SFC<Props> = ({ color }) => (
  <NextBlockStyle color={color} />
);

export const Block: React.SFC<Props> = ({ color }) => (
  <BlockStyle color={color} />
);
