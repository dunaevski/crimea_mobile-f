import React from 'react';
import styled from 'styled-components';
import { NotificationIcon } from 'components/Icons';
import { colors, sizes } from 'constants/theme';

const NotificationButton = () => (
    <Container>
        <NotificationIcon />
        <Bubble>
            <Text>3</Text>
        </Bubble>
    </Container>
);

export default NotificationButton;

const Container = styled.View`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

const Bubble = styled.View`
  width: 16px;
  height: 16px;
  background: ${ colors.textGray }; 
  position: absolute;
  top: 0;
  right: 5px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
`;

const Text = styled.Text`
  color: white;
  font-size: ${ sizes.smallText }px;
  font-weight: 700;
`;
