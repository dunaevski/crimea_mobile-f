import React from 'react';
import styled from 'styled-components';
import { colors, sizes } from 'constants/theme';
import { Ionicons } from '@expo/vector-icons';

const Category = props => (
    <Container>
        <Ionicons name={ props.icon } size={ 36 } color={ colors.blue } />
        <View>
            <Text>{ props.text }</Text>
            <Subtitle>{ props.subtitle }</Subtitle>
        </View>
        <Next>
            <Ionicons name='ios-arrow-forward' size={ 26 } color={ colors.textGray2 } style={{marginRight: 100}}/>

        </Next>
    </Container>
);

export default Category;

const Container = styled.View`
  background: white;
  height: 60px;
  padding: 12px 16px 12px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 20px;
`;

const View = styled.View`
  margin-left: 25px;
`;

const Next = styled.View`
 position: absolute;
 right: -75px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: ${ sizes.text }px;
`;

const Subtitle = styled.Text`
  font-weight: 600;
  font-size: ${ sizes.smallText }px;
  color: ${ colors.textGray2 };
  margin-top: 5px;
`;
