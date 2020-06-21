import React from 'react';
import styled from 'styled-components';
import {
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors, sizes } from 'constants/theme';

import { cards, article } from '../mockData';
import { inject } from 'mobx-react';
import SearchResults from 'components/SearchResults';
import FilterSearch from 'components/FilterSearch';
import Results from 'components/Results';


const { width, height } = Dimensions.get('window');


@inject('UserStore')
class ProfileScreen extends React.Component {
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
                        <TouchableOpacity>
                            <Ionicons
                                name="ios-more"
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
        const { UserStore } = this.props;
        const user = UserStore.user;
        return (
            <ScrollView>
                <Container>
                    <Image
                        source={ { uri: article.preview } }
                    />

                    <InfoContainer>
                        <Avatar source={ { uri: user.picture.large || user.defaultPhoto } } />
                        <TextView>
                            <Title>{ UserStore.fullName }</Title>
                            <SubTitle>
                                <Feather
                                    name="map-pin"
                                    size={ 20 }
                                    color={ colors.textGray2 }
                                    style={ { marginRight: 100 } }
                                />
                                { `  ${ user.location.state }, ${ user.location.city }` }

                            </SubTitle>
                        </TextView>
                    </InfoContainer>

                    <HeaderView>
                        <Subtitle>{ 'Избарнное ' }</Subtitle>
                        <ViewAll> Показать всё </ViewAll>
                    </HeaderView>

                    <ResultsView>
                        <Results
                            picture={require('./../../assets/notFound2.png')}
                            text={'Вы ещё ничего не добавлили в избранное 😌'}
                            navigation={ this.props.navigation }
                            results={ cards.splice(0, 3) }
                        />
                    </ResultsView>
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
`;

const InfoContainer = styled.View`
  margin-top: -20px;
  margin-bottom: 60px;
  height: 100px;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${ colors.white };

`;

const TextView = styled.View`
  align-items: center;
  flex-direction: column;
  margin-top: ${ sizes.margin }px;
`;

const Image = styled.Image`
  width: ${ width }px;
  height: 220px;
`;


const Avatar = styled.Image`
  width: ${ width / 3 }px;
  height: ${ width / 3 }px;
  margin-top: -${ width / 3 / 2 }px;;
  border-radius: ${ sizes.padding }px;
`;

const Title = styled.Text`
  font-size: ${ sizes.title }px;
  color: ${ colors.black };
  font-weight: bold;
`;

const SubTitle = styled.Text`
  margin-top: 5px;
  color: ${ colors.textGray };
`;

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
  font-size: ${ sizes.caption }px;
`;

const ViewAll = styled.Text`
  color: ${ colors.blue };
`;


export default ProfileScreen;
