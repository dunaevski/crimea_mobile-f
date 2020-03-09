import React, { Component } from 'react';
import styled from 'styled-components';
import { Animated, Dimensions, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const tabBarHeight = 83;


@observer
class Project extends Component {
    @observable cardWidth = new Animated.Value(315);
    @observable cardHeight = new Animated.Value(460);
    @observable titleTop = new Animated.Value(20);
    @observable opacity = new Animated.Value(0);
    @observable textHeight = new Animated.Value(100);

    openCard = () => {
        if (!this.props.canOpen) return;

        Animated.spring(this.cardWidth, { toValue: screenWidth }).start();
        Animated.spring(this.cardHeight, {
            toValue: screenHeight - tabBarHeight,
        }).start();
        Animated.spring(this.titleTop, { toValue: 40 }).start();
        Animated.timing(this.opacity, { toValue: 1 }).start();
        Animated.spring(this.textHeight, { toValue: 1000 }).start();

        StatusBar.setHidden(true);
        this.props.openCard();
    };

    closeCard = () => {
        Animated.spring(this.cardWidth, { toValue: 315 }).start();
        Animated.spring(this.cardHeight, {
            toValue: 460,
        }).start();
        Animated.spring(this.titleTop, { toValue: 20 }).start();
        Animated.timing(this.opacity, { toValue: 0 }).start();
        Animated.spring(this.textHeight, { toValue: 100 }).start();

        StatusBar.setHidden(false);
        this.props.closeCard();
    };

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={ () => {
                    this.openCard();
                } }
            >
                <AnimatedContainer
                    style={ {
                        width: this.cardWidth,
                        height: this.cardHeight,
                    } }
                >
                    <Cover>
                        <Image source={ this.props.image } />
                        <AnimatedTitle style={ { top: this.titleTop } }>
                            { this.props.title }
                        </AnimatedTitle>
                        <Author>by { this.props.author }</Author>
                    </Cover>
                    <AnimatedText style={ { height: this.textHeight } }>
                        { this.props.text }
                    </AnimatedText>
                    <AnimatedLinearGradient
                        colors={ [
                            'rgba(255,255,255,0)',
                            'rgba(255,255,255,1)',
                        ] }
                        style={ {
                            position: 'absolute',
                            top: 330,
                            width: '100%',
                            height: this.textHeight,
                        } }
                    />

                    <TouchableOpacity
                        style={ {
                            position: 'absolute',
                            top: 20,
                            right: 20,
                        } }
                        onPress={ () => {
                            this.closeCard();
                        } }
                    >
                        <AnimatedCloseView style={ { opacity: this.opacity } }>
                            <Ionicons name="ios-close" size={ 32 } color="#546bfb" />
                        </AnimatedCloseView>
                    </TouchableOpacity>
                </AnimatedContainer>
            </TouchableWithoutFeedback>
        );
    }
}


export default Project;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-weight: bold;
  font-size: 24px;
  color: white;
  width: 300px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;

const AnimatedText = Animated.createAnimatedComponent(Text);
