import React, { Component } from "react";
import styled from "styled-components";
import Project from "components/Project";
import { Animated, PanResponder } from "react-native";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class ProjectsScreen extends Component {
  static navigationOptions = {
    headerShown: false
  };
  @observable pan = new Animated.ValueXY();
  @observable scale = new Animated.Value(0.9);
  @observable translateY = new Animated.Value(44);
  @observable thirdScale = new Animated.Value(-50);
  @observable thirdTranslateY = new Animated.Value(1);
  @observable index = 0;
  @observable opacity = new Animated.Value(0);
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

      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.pan.x,
          dy: this.pan.y
        }
      ]),

      onPanResponderRelease: () => {
        const positionY = this.pan.y.__getValue();
        Animated.timing(this.opacity, { toValue: 0 }).start();

        if (positionY > 200) {
          Animated.timing(this.pan, {
            toValue: {
              x: 0,
              y: 1000
            }
          }).start(() => {
            this.pan.setValue({
              x: 0,
              y: 0
            });
            this.scale.setValue(0.9);
            this.translateY.setValue(44);
            this.thirdScale.setValue(0.8);
            this.thirdTranslateY.setValue(-50);
            this.index = this.getNextIndex(this.index);
          });
        } else {
          Animated.spring(this.pan, {
            toValue: {
              x: 0,
              y: 0
            }
          }).start();

          Animated.spring(this.scale, { toValue: 0.9 }).start();
          Animated.spring(this.translateY, { toValue: 44 }).start();

          Animated.spring(this.thirdScale, { toValue: 0.8 }).start();
          Animated.spring(this.thirdTranslateY, { toValue: -50 }).start();
        }
      }
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
        <AnimatedMask style={{ opacity: this.opacity }} />
        <Animated.View
          style={{
            transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
          }}
          {...this._panResponder.panHandlers}
        >
          <Project
            title={projects[this.index].title}
            image={projects[this.index].image}
            author={projects[this.index].author}
            text={projects[this.index].text}
            canOpen={true}
            openCard={this.openCard}
            closeCard={this.closeCard}
          />
        </Animated.View>

        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [{ scale: this.scale }, { translateY: this.translateY }]
          }}
        >
          <Project
            title={projects[this.getNextIndex(this.index)].title}
            image={projects[this.getNextIndex(this.index)].image}
            author={projects[this.getNextIndex(this.index)].author}
            text={projects[this.getNextIndex(this.index)].text}
            canOpen={true}
            openCard={this.openCard}
            closeCard={this.closeCard}
          />
        </Animated.View>

        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -3,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.thirdScale },
              { translateY: this.thirdTranslateY }
            ]
          }}
        >
          <Project
            title={projects[this.getNextIndex(this.index + 1)].title}
            image={projects[this.getNextIndex(this.index + 1)].image}
            author={projects[this.getNextIndex(this.index + 1)].author}
            text={projects[this.getNextIndex(this.index + 1)].text}
            canOpen={true}
            openCard={this.openCard}
            closeCard={this.closeCard}
          />
        </Animated.View>
      </Container>
    );
  }
}

export default ProjectsScreen;

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
  background: #f0f3f5;
`;

const Text = styled.Text``;

const projects = [
  {
    title: "Price Tag",
    image: require("./../../assets/background5.jpg"),
    author: "Liu Yi",
    text:
      "Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China.Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China.Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China."
  },
  {
    title: "The DM App - Ananoumous Chat",
    image: require("./../../assets/background6.jpg"),
    author: "Chad Goodman",
    text:
      "Design+Code was the first resource I used when breaking into software. I went from knowing nothing about design or code to building a production ready app from scratch. "
  },
  {
    title: "Nikhiljay",
    image: require("./../../assets/background7.jpg"),
    author: "Nikhil D'Souza",
    text:
      "Recently finished the React course by @Mengto, and I 10/10 would recommend. I already rewrote my personal website in @reactjs and I'm very excited with it."
  }
];