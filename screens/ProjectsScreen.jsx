import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Project from "../components/Project";
import { Animated, PanResponder } from "react-native";

function mapStateToProps(state) {
  return {};
}

class ProjectsScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 }
        }).start();
      }
    });
  }

  state = {
    pan: new Animated.ValueXY()
  };

  render() {
    return (
      <Container>
        <Animated.View
          style={{
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y }
            ]
          }}
          {...this._panResponder.panHandlers}
        >
          <Project
            title="PriceTag"
            image={require("../assets/background5.jpg")}
            author="Me"
            text="Избегайте добавления каких-либо побочных эффектов или подписок в этом методе. Вместо этого используйте componentDidMount()."
          />
        </Animated.View>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ProjectsScreen);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;

const Text = styled.Text``;
