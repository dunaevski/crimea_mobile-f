import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

function mapStateToProps(state) {
  return {};
}

class ProjectsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <Text> Projects Screen </Text>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ProjectsScreen);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
