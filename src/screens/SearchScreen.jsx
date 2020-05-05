import React, { Component } from 'react';
import { observable } from 'mobx';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Keyboard, SafeAreaView } from 'react-native';
import SearchBar from 'components/SearchBar';
import SearchCategory from 'components/SearchCategory';
import SearchResults from 'components/SearchResults';
import { cards } from '../mockData';

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
        this.searchValue = searchText;
    };

    render() {
        return (
            <SafeAreaView>
                <Container>
                    <SearchContainer>
                        <SearchBar
                            searchValue={ this.searchValue }
                            onChangeSearch={ this.onChangeSearch }
                        />
                    </SearchContainer>

                    { this.searchValue ? (
                        <SearchResults
                            tapBackground={ this.tapBackground }
                            navigation={ this.props.navigation }
                            results={ cards }
                        />
                    ) : (
                        <SearchCategory
                            navigation={ this.props.navigation }
                            tapBackground={ this.tapBackground } />
                    ) }
                </Container>
            </SafeAreaView>
        );
    }
}

const Container = styled.View`
  margin-top: 10px;
`;

const SearchContainer = styled.View`
  align-items: center;
  padding-bottom: 10px;
`;
