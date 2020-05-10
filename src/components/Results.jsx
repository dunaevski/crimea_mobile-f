import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, sizes } from 'constants/theme';
import { Dimensions, TouchableOpacity } from 'react-native';
import { article } from '../mockData';
import MediumCard from 'components/MediumCard';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


export default class Results extends Component {
    render() {
        if (this.props.results) {
            return this.props.results.map((result, index) => {
                return (
                    <TouchableOpacity
                        key={ index }
                        activeOpacity={ 0.7 }
                        onPress={ () => {
                            this.props.navigation.push('Record', {
                                article,
                            });
                        } }
                    >
                        <MediumCard
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
                    <NotFoundImage source={ this.props.picture } />
                    <NoResultsTitle> Ничего не найдено </NoResultsTitle>
                    <NoResultsSubTitle>
                        { this.props.text }
                    </NoResultsSubTitle>
                </NoSearchResults>
            );
        }
    }
}

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
