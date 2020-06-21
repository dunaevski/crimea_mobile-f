import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { sizes, colors } from 'constants/theme';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;


@observer
class BigCard extends React.Component {
    @observable cardWidth = null;

    componentDidMount() {
        this.cardWidth = this.getCourseWidth(SCREEN_WIDTH);
        Dimensions.addEventListener('change', this.adaptLayout);
    }

    getCourseWidth = () => {
        let cardWidth = SCREEN_WIDTH - 40;

        if (SCREEN_WIDTH >= 768) {
            cardWidth = (SCREEN_WIDTH - 60) / 2;
        }
        if (SCREEN_WIDTH >= 1024) {
            cardWidth = (SCREEN_WIDTH - 80) / 3;
        }

        return cardWidth;
    };

    adaptLayout = dimensions => {
        this.cardWidth = this.getCourseWidth(dimensions.window.width);
    };

    render() {
        return (
            <Container style={ { width: this.cardWidth } }>
                <Cover>
                    <Image source={ this.props.image } />
                    <Logo source={ this.props.logo } resizeMode="contain" />
                    <Title>{ this.props.title }</Title>
                    <Location>
                        <Ionicons
                            name="ios-navigate"
                            size={ 20 }
                            color={ colors.textGray2 }
                        />
                        <Subtitle>{ this.props.subtitle }</Subtitle>
                    </Location>
                </Cover>
                <Content>
                    <Avatar source={ this.props.avatar } />
                    <Caption>{ this.props.caption.length > 60 ? this.props.caption.slice(0, 60) + '...' : this.props.caption}</Caption>
                    <Author> { this.props.author ? 'Автор:' + this.props.author : this.props.delta }</Author>
                </Content>
            </Container>
        );
    }
}

export default BigCard;

const Container = styled.View`
  width: 335px;
  height: 335px;
  background: white;
  margin: 10px 10px;
  border-radius: 14px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  height: 260px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;

const Title = styled.Text`
  width: 170px;
  color: white;
  margin-left: 20px;
  font-size: ${ sizes.title }px;
  font-weight: 600;
`;

const Location = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 14px;
  margin-bottom:${ sizes.margin * 1.5 }px;
  margin-left: ${ sizes.margin }px;
`;

const Subtitle = styled.Text`
  font-size: ${ sizes.text }px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  margin-left: 10px;
`;

const Content = styled.View`
  padding-left: 67px;
  padding-right: 10px;
  justify-content: center;
  height: 75px;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 16px;
`;

const Caption = styled.Text`
  font-size: ${ sizes.text }px;
  color: ${ colors.textGray };
  font-weight: 500;
`;

const Author = styled.Text`
  font-size: ${ sizes.text }px;
  color: ${ colors.textGray2 };
  font-weight: 500;
  margin-top: 4px;
`;
