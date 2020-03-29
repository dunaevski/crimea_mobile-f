import React from 'react';
import styled from 'styled-components';
import { colors, sizes } from 'constants/theme';

const SmallCategory = props => (
    <Container>
        <Text>{ props.text }</Text>
    </Container>
);

export default SmallCategory;

const Container = styled.View`
  background: ${ colors.blue };
  height: 35px;
  border-radius: ${ 35 / 2 }px;
  padding: ${ sizes.margin / 2 }px;
  margin-right: ${ sizes.margin / 1.5 }px;
`;

const Text = styled.Text`
  color: ${ colors.white };
`;
