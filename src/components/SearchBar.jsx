import React, { Component } from 'react';
import styled from 'styled-components';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Dimensions, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, sizes } from 'constants/theme';

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
                    <TextInput
                        placeholder="Поиск..."
                        onChangeText={ this.props.onChangeSearch }
                        value={ this.props.searchValue }
                    />
                    { this.props.searchValue ? (
                        <TouchableWithoutFeedback onPress={ this.clearSearch }>
                            <Ionicons name="ios-close" size={ 32 } color={ colors.blue } />
                        </TouchableWithoutFeedback>
                    ) : (
                        <Ionicons name="ios-search" size={ 24 } color={ colors.blue } />
                    ) }
                </Container>
            </SafeAreaView>
        );
    }
}

const Container = styled.View`
  width: ${ SCREEN_WIDTH - sizes.padding * 2 }px;
  height: 44px;
  background-color: white;
  border: 1px solid ${ colors.borderWhite };  
  border-radius: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

const TextInput = styled.TextInput`
  height: 44px;
  width: 80%;
  font-size: ${ sizes.text }px;
  color: ${ colors.textGray }; 
`;
