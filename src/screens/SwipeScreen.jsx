import React, { Component } from 'react';
import styled from 'styled-components';
import CustomCard from 'components/CustomCard';
import { Animated, PanResponder } from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { projects } from '../mockData';
import { colors } from 'constants/theme'


@observer
class SwipeScreen extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    pan = new Animated.ValueXY();
    scale = new Animated.Value(0.9);
    translateY = new Animated.Value(44);
    thirdScale = new Animated.Value(-50);
    thirdTranslateY = new Animated.Value(1);
    opacity = new Animated.Value(0);
    @observable index = 0;
    @observable isOpenCard = false;

    constructor(props) {
        super(props);

        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (event, gestureState) => {
                return !(gestureState.dx === 0 && gestureState.dy === 0);
            },

            onPanResponderGrant: () => {
                Animated.spring(this.scale, { toValue: 1 }).start();
                Animated.spring(this.translateY, { toValue: 0 }).start();

                Animated.spring(this.thirdScale, { toValue: 0.9 }).start();
                Animated.spring(this.thirdTranslateY, { toValue: 44 }).start();

                Animated.timing(this.opacity, { toValue: 1 }).start();
            },

            onPanResponderMove: (e, gestureState) => {
                if (!this.isOpenCard) {
                    Animated.event([
                        null,
                        {
                            dx: this.pan.x,
                            dy: this.pan.y,
                        },
                    ])(e, gestureState); // <<--- INVOKING HERE!
                }
            },

            onPanResponderRelease: () => {
                const positionY = this.pan.y.__getValue();
                Animated.timing(this.opacity, { toValue: 0 }).start();

                if (positionY > 200 && !this.isOpenCard) {
                    Animated.timing(this.pan, {
                        toValue: {
                            x: 0,
                            y: 1000,
                        },
                    }).start(() => {
                        this.pan.setValue({
                            x: 0,
                            y: 0,
                        });
                        this.scale.setValue(0.9);
                        this.translateY.setValue(44);
                        this.thirdScale.setValue(0.8);
                        this.thirdTranslateY.setValue(-50);
                        this.index = this.getNextIndex(this.index);
                    });
                }
                else {
                    Animated.spring(this.pan, {
                        toValue: {
                            x: 0,
                            y: 0,
                        },
                    }).start();

                    Animated.spring(this.scale, { toValue: 0.9 }).start();
                    Animated.spring(this.translateY, { toValue: 44 }).start();

                    Animated.spring(this.thirdScale, { toValue: 0.8 }).start();
                    Animated.spring(this.thirdTranslateY, { toValue: -50 }).start();
                }
            },
        });
    }

    getNextIndex = index => {
        let nextIndex = index + 1;
        if (nextIndex > projects.length - 1) return 0;
        return nextIndex;
    };

    openCard = () => {
        this.isOpenCard = true;
    };

    closeCard = () => {
        this.isOpenCard = false;
    };

    render() {
        return (
            <Container>
                <AnimatedMask style={ { opacity: this.opacity } } />
                <Animated.View
                    style={ {
                        transform: [
                            { translateX: this.pan.x },
                            { translateY: this.pan.y },
                        ],
                    } }
                    { ...this._panResponder.panHandlers }
                >
                    <CustomCard
                        title={ projects[this.index].title }
                        image={ projects[this.index].image }
                        author={ projects[this.index].author }
                        text={ projects[this.index].text }
                        canOpen={ true }
                        openCard={ this.openCard }
                        closeCard={ this.closeCard }
                    />
                </Animated.View>

                <Animated.View
                    style={ {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -1,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [
                            { scale: this.scale },
                            { translateY: this.translateY },
                        ],
                    } }
                >
                    <CustomCard
                        title={ projects[this.getNextIndex(this.index)].title }
                        image={ projects[this.getNextIndex(this.index)].image }
                        author={ projects[this.getNextIndex(this.index)].author }
                        text={ projects[this.getNextIndex(this.index)].text }
                        canOpen={ true }
                        openCard={ this.openCard }
                        closeCard={ this.closeCard }
                    />
                </Animated.View>

                <Animated.View
                    style={ {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -3,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [
                            { scale: this.thirdScale },
                            { translateY: this.thirdTranslateY },
                        ],
                    } }
                >
                    <CustomCard
                        title={ projects[this.getNextIndex(this.index + 1)].title }
                        image={ projects[this.getNextIndex(this.index + 1)].image }
                        author={ projects[this.getNextIndex(this.index + 1)].author }
                        text={ projects[this.getNextIndex(this.index + 1)].text }
                        canOpen={ true }
                        openCard={ this.openCard }
                        closeCard={ this.closeCard }
                    />
                </Animated.View>
            </Container>
        );
    }
}


export default SwipeScreen;

const Mask = styled.View`
  position: absolute;
  top: 0;

  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${ colors.white }; 
`;
