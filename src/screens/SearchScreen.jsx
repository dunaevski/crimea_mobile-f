import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Dimensions, Keyboard, SafeAreaView, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import SearchBar from 'components/SearchBar';
import { observable } from 'mobx';
import { colors, sizes } from 'constants/theme';
import { category, sections, smallCategory } from '../mockData';
import SmallCategory from 'components/SmallCategory';
import CourseSection from 'components/CourseSection';
import Category from 'components/Category';

const SCREEN_WIDTH = Dimensions.get('window').width;
import { article } from '../mockData';

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

                    <TouchableWithoutFeedback
                        onPress={ this.tapBackground }>
                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 120}}
                            showsHorizontalScrollIndicator={ false }
                        >
                            <Subtitle>{ 'Популярное' }</Subtitle>

                            <ScrollView
                                style={ {
                                    height: 35,
                                    flexDirection: 'row',
                                    paddingLeft: 20,
                                } }
                                horizontal={ true }
                                showsHorizontalScrollIndicator={ false }
                            >
                                { smallCategory.map((item, index) => (
                                    <TouchableOpacity
                                        key={ index }
                                        activeOpacity={ 0.7 }
                                        onPress={ () => {
                                            alert('qwe');
                                        } }
                                    >
                                        <SmallCategory text={ item.title } />
                                    </TouchableOpacity>
                                )) }
                            </ScrollView>

                            <Subtitle>{ 'Подборки' }</Subtitle>

                            <Sections>
                                <SectionScrollView
                                    horizontal={ true }
                                    showsHorizontalScrollIndicator={ false }
                                >
                                    { sections.map((section, index) => (
                                        <TouchableOpacity
                                            key={ index }
                                            activeOpacity={ 0.7 }
                                            onPress={ () => {
                                                this.props.navigation.push('Section', {
                                                    section: section,
                                                });
                                            } }
                                        >
                                            <CourseSection
                                                title={ section.title }
                                                image={ section.image }
                                                progress={ section.progress }
                                            />
                                        </TouchableOpacity>
                                    )) }
                                </SectionScrollView>
                            </Sections>

                            <Subtitle>{ 'Выберите категорию' }</Subtitle>

                            { category.map((item, index) => (
                                <TouchableOpacity
                                    key={ index }
                                    activeOpacity={ 0.7 }
                                    onPress={ () => {
                                        this.props.navigation.push('Category', {
                                            article,
                                        });
                                    } }
                                >
                                    <Category
                                        text={ item.title }
                                        icon={ item.icon }
                                        subtitle={ item.subtitle }
                                    />
                                </TouchableOpacity>
                            )) }

                        </ScrollView>
                    </TouchableWithoutFeedback>
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

const Subtitle = styled.Text`
  color: ${ colors.textGray };
  font-weight: bold;
  font-size: ${ sizes.text }px;
  margin: ${ sizes.margin }px;
  text-transform: uppercase;
`;

const Sections = styled.View`
  flex-direction: row;
`;

const SectionScrollView = styled.ScrollView`
`;
