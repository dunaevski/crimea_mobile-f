import React from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { colors, sizes } from 'constants/theme';


const MenuItems = props => (
    <Container>
        <IconView>
            <Ionicons name={ props.icon } size={ 24 } color={ colors.blue } />
        </IconView>
        <Content>
            <Title>{ props.title }</Title>
            <Text>{ props.text }</Text>
        </Content>
    </Container>
);

export default MenuItems;

const Container = styled.View`
  flex-direction: row;
  margin: 10px 0;
`;

const IconView = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  padding-left: 20px;
`;

const Title = styled.Text`
  color: ${ colors.textGray }; 
  font-size: ${ sizes.caption }px;
  font-weight: 600;
`;

const Text = styled.Text`
  color: ${ colors.textGray }; 
  font-weight: 600;
  opacity: 0.6;
`;
