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
import SmallCard from 'components/SmallCard';
import { article } from '../mockData';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SearchResults extends Component {
    renderResults = () => {
        if (this.props.results) {
            return this.props.results.map((result, index) => {
                return (
                    <TouchableOpacity
                        key={ index }
                        activeOpacity={ 0.7 }
                        onPress={ () => {
                            this.props.navigation.push('Category', {
                                article,
                            });
                        } }
                    >
                        <SmallCard
                            image={ result.image }
                            title={ result.title }
                            category={ result.subtitle }
                            caption={ result.caption }
                            isFavorite={ result.favorite }
                        />
                    </TouchableOpacity>
                );
            });
        }
        else {
            return (
                <NoSearchResults>
                    <NotFoundImage source={ require('./../../assets/notfound3.png') } />
                    <NoResultsTitle> Ничего не найдено </NoResultsTitle>
                    <NoResultsSubTitle>
                        Попробуйте поискать по другому или удалить фильтр
                    </NoResultsSubTitle>
                </NoSearchResults>
            );
        }
    };

    render() {
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
                            { this.renderResults() }
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

const NoSearchResults = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${ SCREEN_HEIGHT * 0.6 }px;
`;

const NoResultsTitle = styled.Text`
  color: ${ colors.textGray };
  font-weight: bold;
  font-size: ${ sizes.caption }px;
  text-align: center;
`;

const NotFoundImage = styled.Image`
 width: 250px;
 height: 200px;
`;

const NoResultsSubTitle = styled.Text`
  margin-top: ${ sizes.margin }px;
  color: ${ colors.textGray2 };
  font-weight: bold;
  font-size: ${ sizes.text }px;
  text-align: center;
  width: ${ SCREEN_WIDTH * 0.6 }px;
`;
