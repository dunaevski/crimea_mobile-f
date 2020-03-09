import React, { Component } from 'react';
import styled from 'styled-components';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Dimensions, Keyboard, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

@inject('UIStore')
@observer
export default class SearchBar extends Component {
    @observable iconEmail = require('./../../assets/icon-search.png');

    @action
    clearSearch = () => {
        this.props.onChangeSearch('');
    };

    render() {
        return (
            <SafeAreaView>
                <Container>
                    <Ionicons name="ios-search" size={ 30 } color="#546bfb" />
                    <TextInput
                        placeholder="Type Here..."
                        onChangeText={ this.props.onChangeSearch }
                        value={ this.props.searchValue }
                    />
                    <TouchableWithoutFeedback onPress={ this.clearSearch }>
                        <Ionicons name="ios-close" size={ 44 } color="#546bfb" />
                    </TouchableWithoutFeedback>
                </Container>
            </SafeAreaView>
        );
    }
}

const Container = styled.View`
  width: ${ SCREEN_WIDTH * 0.9 }px;
  height: 44px;
  background-color: white;
  border: 1px solid #dbdfea;
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 15px;
`;

const TextInput = styled.TextInput`
  height: 44px;
  width: 80%;
  font-size: 15px;
  color: #3c4560;
`;
