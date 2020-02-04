import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-native";
import styled from "styled-components";

function mapStateToProps(state) {
  return {};
}

class SectionScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Text> Section Screen </Text>
        <Button
          title="Close"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps)(SectionScreen);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
