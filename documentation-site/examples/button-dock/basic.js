// @flow
import * as React from 'react';
import {ButtonDock} from 'baseui/button-dock';
import {Button, KIND} from 'baseui/button';
import {styled} from 'baseui';

const StyledIphone6 = styled('div', {
  width: '375px',
  height: '667px',
  border: '1px solid #ECECEC',
  borderRadius: '12px',
  backgroundColor: '#ECECEC',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const ScrollableContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
  paddingTop: '8px',
  paddingRight: '8px',
  paddingBottom: '8px',
  paddingLeft: '8px',
  backgroundColor: 'white',
});

const Content = () => {
  return (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  );
};

export default function Example() {
  return (
    <StyledIphone6>
      <ScrollableContent tabIndex={0}>
        {[...Array(6)].map((_) => (
          <Content />
        ))}
      </ScrollableContent>
      <ButtonDock
        primaryAction={<Button>Primary Action</Button>}
        dismissiveAction={
          <Button kind={KIND.tertiary}>Dismiss</Button>
        }
        secondaryActions={[
          <Button kind={KIND.secondary} key="first">
            Secondary Action 1
          </Button>,
          <Button kind={KIND.secondary} key="second">
            Secondary Action 2
          </Button>,
        ]}
      />
    </StyledIphone6>
  );
}
