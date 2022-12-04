/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import * as ReactIs from 'react-is';
import {
  StartEnhancer as StyledStartEnhancer,
  EndEnhancer as StyledEndEnhancer,
} from './styled-components';
import { getSharedProps } from './utils';
import { getOverrides } from '../helpers/overrides';

import type { ButtonProps } from './types';

// @ts-ignore
function RenderEnhancer(props) {
  const { Enhancer, ...restProps } = props;
  if (typeof Enhancer === 'string') {
    return Enhancer;
  }
  if (ReactIs.isValidElementType(Enhancer)) {
    return <Enhancer {...restProps} />;
  }
  return Enhancer;
}

export default function ButtonInternals(props: ButtonProps) {
  const { children, overrides = {}, startEnhancer, endEnhancer } = props;
  const [StartEnhancer, startEnhancerProps] = getOverrides(
    overrides.StartEnhancer,
    StyledStartEnhancer
  );
  const [EndEnhancer, endEnhancerProps] = getOverrides(overrides.EndEnhancer, StyledEndEnhancer);
  const sharedProps = getSharedProps(props);
  return (
    <React.Fragment>
      {startEnhancer !== null && startEnhancer !== undefined && (
        // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
        <StartEnhancer {...sharedProps} {...startEnhancerProps}>
          <RenderEnhancer Enhancer={startEnhancer} />
        </StartEnhancer>
      )}
      {children}
      {endEnhancer !== null && endEnhancer !== undefined && (
        // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
        <EndEnhancer {...sharedProps} {...endEnhancerProps}>
          <RenderEnhancer Enhancer={endEnhancer} />
        </EndEnhancer>
      )}
    </React.Fragment>
  );
}
