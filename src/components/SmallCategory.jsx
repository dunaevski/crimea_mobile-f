import React from 'react';
import styled from 'styled-components';
import { colors, sizes } from 'constants/theme';

const height = 35;
const smHeight = 25;
const SmallCategory = props => (
    <Container style={ {
        height: props.sm ? smHeight + 3 : height,
        padding: props.sm ? smHeight / 4 : sizes.padding / 2,
        borderRadius: props.sm ? smHeight / 5 : height / 2,
    } }>
        <Text style={ {
            fontSize: props.sm ? smHeight / 2 : 14,
        } }>{ props.text }</Text>
    </Container>
);

export default SmallCategory;

const Container = styled.View`
  background: ${ colors.blue };
  align-self: flex-start;
`;

const Text = styled.Text`
  color: ${ colors.white };
  font-weight: bold;
`;
