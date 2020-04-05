import React from 'react';
import styled from 'styled-components';
import { sizes } from 'constants/theme';

const Logo = ({ image, text, color }) => {
    return (
        <Container style={ { backgroundColor: color[0] } }>
            <Image source={ image } resizeMode='contain' />
            <Text style={ { color: color[1] } }>
                { text }
            </Text>
        </Container>
    );
};

export default Logo;

const Container = styled.View`
  flex-direction: row;
  height: 60px;
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0,0,0, 0.10);
  align-items: center;
  margin: 0 8px;

`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: ${sizes.text}px;
  margin-left: 8px;
`;

