import React from 'react';
import styled from 'styled-components';

import {
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { colors, sizes } from 'constants/theme';
import { cards, article } from '../mockData';
import Results from 'components/Results';

const { width, height } = Dimensions.get('window');


class RecordScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => (
                <SafeAreaView>
                    <Header>
                        <TouchableOpacity
                            style={ {
                                width: sizes.smallText * 3,
                                height: sizes.smallText * 3,
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            } }
                            onPress={ () => navigation.goBack() }
                        >
                            <Ionicons
                                name="ios-arrow-back"
                                size={ sizes.title }
                                color={ colors.white }
                            />
                        </TouchableOpacity>
                    </Header>
                </SafeAreaView>
            ),
            headerTransparent: true,
        };
    };

    render() {
        return (
            <ScrollView>
                <Container>
                    <ImagesView>
                        <Image
                            source={ { uri: article.preview } }
                        />
                        <TextView>
                            <Title>{ article.title }</Title>
                            <SubTitle>({ article.reviews } reviews)</SubTitle>
                        </TextView>
                    </ImagesView>

                    <Container>
                        <ResultsContainer>
                            <Results
                                navigation={ this.props.navigation }
                                results={ cards }
                            />
                        </ResultsContainer>
                    </Container>
                </Container>
            </ScrollView>
        );
    }
}


const Header = styled.View`
  flex: 0;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  justify-content: space-between;
  padding: ${ sizes.padding }px;
`;

const Container = styled.View`
  flex: 1;
`;

const ImagesView = styled.View`
`;

const TextView = styled.View`
  position: absolute;
  bottom: ${ sizes.margin }px;
  left: ${ sizes.margin }px;
`;

const Image = styled.Image`
  width: ${ width }px;
  height: ${ width }px;
  border-bottom-left-radius: ${ sizes.radius }px;
  border-bottom-right-radius: ${ sizes.radius }px;
`;

const ResultsContainer = styled.View`
 display: flex;
 align-items: center;
 background-color: ${ colors.white };
`;

const Avatar = styled.Image`
  width: ${ sizes.padding * 2 }px;
  height: ${ sizes.padding * 2 }px;
  border-radius: ${ sizes.padding }px;
`;

const Title = styled.Text`
  font-size: ${ sizes.title }px;
  color: ${ colors.white };
  font-weight: bold;
  margin-bottom: ${ sizes.margin / 2 }px;
`;

const SubTitle = styled.Text`
  color: ${ colors.textGray2 };
  margin-bottom: ${ sizes.margin / 2 }px;
`;

export default RecordScreen;
