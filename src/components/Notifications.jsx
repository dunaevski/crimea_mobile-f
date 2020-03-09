import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Animated, Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { notificationItems as items } from '../mockData';

let SCREEN_WIDTH = Dimensions.get('window').width;
let cardWith = SCREEN_WIDTH - 40;
if (SCREEN_WIDTH > 500) {
  cardWith = 460;
}


@inject('UIStore')
@observer
class Notifications extends React.Component {
  translateY = new Animated.Value(30);
  opacity = new Animated.Value(0);
  top = new Animated.Value(3000);

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.toggleNotif();
  }

  toggleNotif = () => {
    if (this.props.UIStore.isNotificationOpen) {
      Animated.parallel([
        Animated.spring(this.translateY, {
          toValue: 0
        }),
        Animated.timing(this.opacity, {
          toValue: 1,
          duration: 500
        }),
        Animated.timing(this.top, {
          toValue: 0,
          duration: 0
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(this.translateY, {
          toValue: 30
        }),
        Animated.timing(this.opacity, {
          toValue: 0,
          duration: 500
        }),
        Animated.timing(this.top, {
          toValue: 3000,
          duration: 0
        })
      ]).start();
    }
  };

  render() {
    const { isNotificationOpen } = this.props.UIStore;
    return (
      <AnimatedContainer style={{ top: this.top }}>
        <TouchableOpacity
            onPress={ () => this.props.UIStore.toggleNotification() }
            activeOpacity={ 0.7 }
            style={ {
              position: 'absolute',
              top: 40,
              left: '50%',
              marginLeft: -22,
              zIndex: 100,
            } }
        >
          <CloseButton style={ { elevation: 20 } }>
            <Ionicons name="ios-close" size={ 44 } color="#546bfb" />
          </CloseButton>
        </TouchableOpacity>
        <SafeAreaView>
          <ScrollView style={ { padding: 20 } }>
            <Wrapper>
              <Subtitle>New</Subtitle>
              { items.map((item, index) => (
                  <AnimatedItem
                      key={ index }
                      style={ {
                        opacity: this.opacity,
                        transform: [ { translateY: this.translateY } ],
                      } }
                  >
                    <Header>
                      <Logo source={ { uri: item.logo } } resizeMode="contain" />
                      <Title>{ item.title }</Title>
                      <DateContainer>
                        <Date>{ item.date }</Date>
                      </DateContainer>
                    </Header>
                    <Text>{ item.text }</Text>
                  </AnimatedItem>
              )) }
            </Wrapper>
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
    );
  }
}

export default Notifications;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: #f0f3f5;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const CloseButton = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const Wrapper = styled.View`
  align-self: center;
  width: ${cardWith}px;
  padding-top: 50px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  color: #b8bece;
`;

const Item = styled.View`
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  margin-top: 20px;
`;

const AnimatedItem = Animated.createAnimatedComponent(Item);

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const DateContainer = styled.View`
  background: #4775f2;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  height: 20px;
  position: absolute;
  top: 0px;
  right: 0px;
`;

const Date = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
  margin-left: 8px;
`;

const Text = styled.Text`
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  line-height: 24px;
`;
