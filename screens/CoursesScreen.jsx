import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

function mapStateToProps(state) {
    return {};
}

class CoursesScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    render() {
        return (
            <Container>
                <Text> Courses Screen </Text>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(CoursesScreen);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
