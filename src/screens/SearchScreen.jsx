import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Dimensions, Keyboard, SafeAreaView } from 'react-native';
import SearchBar from 'components/SearchBar';
import { action, observable } from 'mobx';

const SCREEN_WIDTH = Dimensions.get('window').width;

@inject('UIStore')
@observer
export default class SearchScreen extends Component {
    static navigationOptions = {
        headerShown: false,
    };
    @observable isSuccessful = false;
    @observable isLoading = false;
    @observable searchValue = '';

    tapBackground = () => {
        Keyboard.dismiss();
    };

    onChangeSearch = searchText => {
        console.log(this)
        this.searchValue = searchText;
    };

    render() {
        return (
            <SafeAreaView>
                <Container>
                    <SearchBar
                        searchValue={ this.searchValue }
                        onChangeSearch={ this.onChangeSearch }
                    />
                </Container>
            </SafeAreaView>
        );
    }
}

const Container = styled.View`
  align-items: center;
`;

const Text = styled.Text`
 width: 100px;
 height: 100px;
color: black;
`;

