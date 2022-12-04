/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import * as ReactIs from 'react-is';

import { getOverrides } from '../helpers/overrides';

import {
  StyledHeadingRoot,
  StyledHeadingContent,
  StyledHeadingContentRow,
  StyledHeadingEndEnhancerContainer,
  StyledHeadingEndEnhancerDescriptionContainer,
  StyledHeadingMainHeading,
  StyledHeadingSubHeading,
} from './styled-components';
import type { HeadingProps } from './types';

// @ts-ignore
function RenderNode(props) {
  const { component, ...restProps } = props;
  const Component = component;
  if (!Component) {
    return null;
  }
  if (typeof Component === 'string') {
    return Component;
  }
  if (ReactIs.isValidElementType(Component)) {
    return <Component {...restProps} />;
  }
  return Component;
}

// @ts-ignore
function isMaxLinesValid(maxLines) {
  return maxLines === 1 || maxLines === 2;
}

const ListHeading = React.forwardRef<HTMLLIElement, HeadingProps>((props: HeadingProps, ref) => {
  const { overrides = {}, maxLines } = props;
  const EndEnhancer = props.endEnhancer;
  const EndEnhancerDescription = props.endEnhancerDescription;
  const SubHeading = props.subHeading;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledHeadingRoot);
  const [Content, contentProps] = getOverrides(overrides.Content, StyledHeadingContent);
  const [HeadingContainer, headingContainerProps] = getOverrides(
    overrides.HeadingContainer,
    StyledHeadingMainHeading
  );
  const [SubHeadingContainer, subHeadingContainerProps] = getOverrides(
    overrides.SubHeadingContainer,
    StyledHeadingSubHeading
  );
  const [EndEnhancerContainer, endEnhancerContainerProps] = getOverrides(
    overrides.EndEnhancerContainer,
    StyledHeadingEndEnhancerContainer
  );
  const [EndEnhancerDescriptionContainer, endEnhancerDescriptionContainerProps] = getOverrides(
    overrides.EndEnhancerDescriptionContainer,
    StyledHeadingEndEnhancerDescriptionContainer
  );

  const isEndEnhancerString = typeof EndEnhancer === 'string';

  if (__DEV__) {
    if (isEndEnhancerString && EndEnhancerDescription) {
      console.warn('endEnhancerDescription will not be rendered if endEnhancer is not a string');
    }
    if (maxLines && !isMaxLinesValid(maxLines)) {
      console.warn('maxLines must be 1 or 2.');
    }
  }

  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <Root
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      {...rootProps}
    >
      {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
      <Content {...contentProps}>
        {/* ----- Top Row -------------------------- */}
        <StyledHeadingContentRow>
          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          <HeadingContainer
            $maxLines={isMaxLinesValid(maxLines) ? maxLines : 1}
            {...headingContainerProps}
          >
            <RenderNode component={props.heading} />
          </HeadingContainer>

          {EndEnhancer && (
            // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
            <EndEnhancerContainer $isText={isEndEnhancerString} {...endEnhancerContainerProps}>
              <RenderNode component={EndEnhancer} />
            </EndEnhancerContainer>
          )}
        </StyledHeadingContentRow>

        {/* ----- Bottom Row ----------------------- */}
        {(Boolean(SubHeading) || EndEnhancerDescription) && (
          <StyledHeadingContentRow>
            {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
            <SubHeadingContainer
              $maxLines={isMaxLinesValid(maxLines) ? maxLines : 1}
              {...subHeadingContainerProps}
            >
              <RenderNode component={SubHeading} />
            </SubHeadingContainer>

            {Boolean(EndEnhancerDescription) && isEndEnhancerString && (
              // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
              <EndEnhancerDescriptionContainer {...endEnhancerDescriptionContainerProps}>
                <RenderNode component={EndEnhancerDescription} />
              </EndEnhancerDescriptionContainer>
            )}
          </StyledHeadingContentRow>
        )}
      </Content>
    </Root>
  );
});
ListHeading.displayName = 'ListHeading';

export default ListHeading;
