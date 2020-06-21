import React from 'react';
import styled from 'styled-components';
import { Dimensions, TouchableOpacity } from 'react-native';
import { colors, sizes } from 'constants/theme';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const getCourseWidth = () => {
    let cardWidth = SCREEN_WIDTH - 40;

    if (SCREEN_WIDTH >= 768) {
        cardWidth = (SCREEN_WIDTH - 60) / 2;
    }
    if (SCREEN_WIDTH >= 1024) {
        cardWidth = (SCREEN_WIDTH - 80) / 3;
    }

    return cardWidth;
};

const Card = props => (
    <Container style={ { elevation: 10 } }>
        <Cover>
            <Image source={ props.image } />
            <Title>{ props.title }</Title>
            <TouchableOpacity
                style={ {
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    width: 30,
                    height: 30,
                } }
                activeOpacity={ 0.7 }

            >
                <Ionicons
                    name={ props.favorite ? 'ios-heart' : 'ios-heart-empty' }
                    size={ 24 }
                    color={ props.favorite ? colors.pink : colors.white }
                />
            </TouchableOpacity>
        </Cover>
        <Content>
            <Logo source={ props.logo } />
            <Wrapper>
                <Caption>{ props.caption }</Caption>
                <Subtitle>{ props.subtitle }</Subtitle>
            </Wrapper>
        </Content>
    </Container>
);

export default Card;

const Container = styled.View`
  background: ${ colors.white };
  width: ${ getCourseWidth() - 50 }px;
  height: 280px;
  border-radius: 14px;
  margin: 20px 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Content = styled.View`
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
`;

const Caption = styled.Text`
  color: ${ colors.textGray };
  font-size: ${ sizes.caption }px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  color: ${ colors.textGray2 };
  font-weight: 600;
  font-size: ${ sizes.text }px;
  margin-top: 4px;
`;

const Wrapper = styled.View`
  margin-left: 10px;
`;

const Cover = styled.View`
  width: 100%;
  height: 200px;
  border-radius: ${ sizes.radius }px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  color: ${ colors.white };
  font-size: ${ sizes.title }px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 20px;
  width: 150px;
`;
