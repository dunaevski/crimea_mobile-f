import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { article, category, sections, smallCategory } from '../mockData';
import SmallCategory from 'components/SmallCategory';
import SmallCard from 'components/SmallCard';
import Category from 'components/Category';
import styled from 'styled-components';
import { colors, sizes } from 'constants/theme';

export default class SearchCategory extends Component {
    render() {
        return (
            <TouchableWithoutFeedback
                onPress={ this.props.tapBackground }>
                <ScrollView
                    contentContainerStyle={ { paddingBottom: 120 } }
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
                                style={ {
                                    marginRight: sizes.margin / 1.5,
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
                                    <SmallCard
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
        );
    }
}

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
