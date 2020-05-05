import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, sizes } from 'constants/theme';
import { Ionicons } from '@expo/vector-icons';
import SmallCategory from 'components/SmallCategory';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class MediumCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <ImageView>
                    <Image source={ this.props.image } />
                    <IconView>
                        <Ionicons
                            name={ this.props.isFavorite ? 'ios-heart' : 'ios-heart-empty' }
                            size={ 24 }
                            color={ this.props.isFavorite ? colors.pink : colors.white }
                        />
                    </IconView>
                </ImageView>

                <TextView>
                    <SmallCategory text={ this.props.category } sm={ true } />
                    <Text numberOfLines={1}>{ this.props.title }</Text>
                    <SubText numberOfLines={2} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab atque...</SubText>
                    <City>{ this.props.caption }</City>
                    <Location>220m </Location>
                </TextView>
            </Container>
        );
    }
}

const Container = styled.View`
  background: white;
  width: ${ SCREEN_WIDTH * 0.9 }px;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const ImageView = styled.View`
  width: 35%;
`;

const Image = styled.Image`
  width: ${ SCREEN_WIDTH * 0.3 }px;
  height: ${ SCREEN_WIDTH * 0.3 }px;
  border-radius: 10px;
`;

const IconView = styled.View`
  position: absolute;
  right: 8px;
  top: 8px;
`;

const TextView = styled.View`
  width: 65%;
  margin-left: 15px;
`;

const Text = styled.Text`
  margin-top: 5px;
  font-weight: bold;
  font-size: ${ sizes.caption }px;
`;

const SubText = styled.Text`
  width: 90%;
  margin-top: 3px;
  margin-bottom: 5px;
  color: ${ colors.textGray2 };
  font-size: ${ sizes.smallText }px;
`;

const Location = styled.Text`
  position: absolute;
  bottom: 0;
  right: 5px;
  color: ${ colors.textGray2 };
`;

const City = styled.Text`
  position: absolute;
  bottom: 0;

  color: ${ colors.textGray };
`;
