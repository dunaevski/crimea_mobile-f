import React, { Component } from 'react';
import {
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components';
import { colors, sizes } from 'constants/theme';
import FilterSearch from 'components/FilterSearch';
import Results from 'components/Results';


export default class SearchResults extends Component {
    render() {
        console.log( this.props.navigation )

        return (
            <TouchableWithoutFeedback onPress={ this.props.tapBackground }>
                <React.Fragment>
                    <ScrollView
                        contentContainerStyle={ { paddingBottom: 120 } }
                        showsHorizontalScrollIndicator={ false }
                    >
                    <HeaderView>
                        <Subtitle>{ 'Результуты ' }</Subtitle>
                        <FilterSearch />
                    </HeaderView>

                        <ResultsView>
                            <Results
                                navigation={ this.props.navigation }
                                results={ this.props.results }
                            />
                        </ResultsView>
                    </ScrollView>
                </React.Fragment>
            </TouchableWithoutFeedback>
        );
    }
}

const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  margin-left: ${ sizes.margin }px;
  margin-right: ${ sizes.margin }px;
`;

const ResultsView = styled.View`
  display: flex;
  align-items: center;
`;

const Subtitle = styled.Text`
  color: ${ colors.black };
  font-weight: bold;
  font-size: ${ sizes.bigTitle }px;
`;

