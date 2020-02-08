import React, { Component } from "react";
import styled from "styled-components";
import AnimatedLottieView from "lottie-react-native";
import { Animated, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

class AnimateIcon extends Component {
  state = {
    top: new Animated.Value(0),
    opacity: new Animated.Value(0)
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isActive) {
      Animated.timing(this.state.top, { toValue: 0, duration: 0 }).start();
      Animated.timing(this.state.opacity, { toValue: 1 }).start();

      this.animation.play();
    } else {
      Animated.timing(this.state.top, {
        toValue: screenHeight,
        duration: 0
      }).start();
      Animated.timing(this.state.opacity, { toValue: 0 }).start();

      this.animation.loop = false;
    }
  }

  render() {
    return (
      <AnimatedContainer
        style={{ top: this.state.top, opacity: this.state.opacity }}
      >
        <AnimatedLottieView
          source={this.props.animation}
          autoPlay={false}
          loop={this.props.loop}
          ref={animation => {
            this.animation = animation;
          }}
        />
      </AnimatedContainer>
    );
  }
}

export default AnimateIcon;

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
