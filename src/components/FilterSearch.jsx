import React, { Component } from 'react';
import styled from 'styled-components';
import { sizes, colors } from 'constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';


class FilterSearch extends Component {
    render() {
        return (
            <FilterButtonView>
                <MaterialCommunityIcons name="filter-variant" size={ 18 } color={ colors.blue } />
                <FilterText>Фильтр</FilterText>
            </FilterButtonView>
        );
    }
}


const FilterButtonView = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: ${ sizes.margin }px;
`;

const FilterText = styled.Text`
  color: ${ colors.textGray };
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
`;

export default FilterSearch;
