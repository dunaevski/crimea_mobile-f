import React from 'react';
import {
    Animated,
    Easing,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import mockData from '../mockData';
import * as _ from 'lodash';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Logo from 'components/Logo';
import Card from 'components/Card';
import BigCard from 'components/BigCard';
import Menu from 'components/Menu';
import ModalLogin from 'components/ModalLogin';
import NotificationButton from 'components/NotificationButton';
import Notifications from 'components/Notifications';
import { colors, sizes } from 'constants/theme';
import { fetchUserInfo } from 'helpers/actions/profile';
import { fetchWeather } from 'helpers/actions/mainData';
import AsyncStorage from '@react-native-community/async-storage';

@inject('UIStore', 'UserStore')
@observer
class HomeScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };
    @observable loaded = false;
    @observable scale = new Animated.Value(1);
    @observable opacity = new Animated.Value(1);
    @observable data = null;


    componentDidMount() {
        StatusBar.setBarStyle('dark-content', true);

        if (Platform.OS === 'android') {
            StatusBar.setBarStyle('light-content', true);
        }

        this.fetchUser().catch();
        this.data = _.cloneDeep(mockData);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fetchUser();
        this.toggleMenu();
    }

    async fetchUser() {
        if (this.props.UIStore.isUserLogin && !this.props.UserStore.user.isSign) {
            const response = await fetchUserInfo();
            if (response && response.results) {
                this.props.UserStore.setUser({
                    isSign: true,
                    ...response.results[0],
                });
            }

            // await AsyncStorage.removeItem('weatherInfo')
            const weatherInfo = JSON.parse(await AsyncStorage.getItem('weatherInfo'));

            if (!weatherInfo) {
                const responseWeather = await fetchWeather();
                if (responseWeather && responseWeather.now) {
                    this.props.UserStore.setWeather(responseWeather);
                    try {
                        await AsyncStorage.setItem('weatherInfo', JSON.stringify(responseWeather));
                    } catch(e) {
                        console.error(e)
                    }
                }
            } else {
                this.props.UserStore.setWeather(weatherInfo);
            }
        }
    }

    toggleMenu = () => {
        if (this.props.UIStore.isMenuOpen) {
            Animated.timing(this.scale, {
                toValue: 0.9,
                duration: 300,
                easing: Easing.in(),
            }).start();

            Animated.spring(this.opacity, {
                toValue: 0.5,
            }).start();

            StatusBar.setBarStyle('light-content', true);
        }
        else {
            Animated.timing(this.scale, {
                toValue: 1,
                duration: 300,
                easing: Easing.in(),
            }).start();

            Animated.spring(this.opacity, {
                toValue: 1,
            }).start();

            StatusBar.setBarStyle('dark-content', true);
        }
    };

    getStyle = (active) => {
        return active ? [
            colors.blue,
            colors.white,
        ] : [
            colors.white,
            colors.textGray,
        ];
    };

    @action
    handleAvatar = () => {
        const { UIStore, UserStore } = this.props;
        const user = UserStore.user;

        if (user.isSign) {
            UIStore.toggleMenu();
        }
        else {
            UIStore.toggleModalLogin();
        }
    };

    @action
    handleCity(e) {
        this.data.logos.forEach((item, index) => {
            item.active = index === e;
        });
    };

    render() {
        const { UIStore, UserStore } = this.props;
        const user = UserStore.user;

        if (_.isEmpty(this.data)) return null;
        const datas = _.cloneDeep(this.data);
        return (
            <RootView>
                <Menu navigation={ this.props.navigation } />
                <Notifications />

                <AnimatedContainer
                    style={ {
                        transform: [ { scale: this.scale } ],
                        opacity: this.opacity,
                    } }
                >
                    <SafeAreaView>
                        <ScrollView
                            style={ { height: '100%' } }
                            showsVerticalScrollIndicator={ false }
                        >
                            <TitleBar>
                                <TouchableOpacity
                                    activeOpacity={ 0.7 }
                                    onPress={ this.handleAvatar }
                                    style={ {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        marginLeft: 20,
                                    } }
                                >
                                    <Avatar source={ { uri: user.picture ? user.picture.medium : user.defaultPhoto } } />
                                </TouchableOpacity>
                                <Title>Добро пожаловать,</Title>
                                <Name>{ UIStore.isUserLogin ? UserStore.fullName : 'Анонимый Пользователь' }!</Name>
                                <TouchableOpacity
                                    activeOpacity={ 0.7 }
                                    onPress={ () => UIStore.toggleNotification() }
                                    style={ {
                                        position: 'absolute',
                                        right: 20,
                                        top: 5,
                                    } }
                                >
                                    <NotificationButton />
                                </TouchableOpacity>
                            </TitleBar>

                            <ScrollView
                                style={ {
                                    flexDirection: 'row',
                                    padding: 20,
                                    paddingLeft: 12,
                                    paddingTop: 30,
                                } }
                                horizontal={ true }
                                contentContainerStyle={ { paddingRight: 20 } }
                                showsHorizontalScrollIndicator={ false }
                            >
                                { !this.loading ? (
                                    datas.logos.map((logo, index) => (
                                        <TouchableOpacity
                                            key={ index }
                                            activeOpacity={ 0.7 }
                                            onPress={ () => this.handleCity(index) }
                                        >
                                            <Logo image={ logo.image } text={ logo.text } color={ this.getStyle(logo.active) } />
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Message>Загрузка...</Message>
                                ) }
                            </ScrollView>

                            <SubtitleView>
                                <Subtitle>{ 'Популярные места'.toUpperCase() }</Subtitle>
                                <TouchableOpacity
                                    activeOpacity={ 0.7 }
                                    onPress={ () => {
                                        this.props.navigation.push('All', {
                                            section: datas.cards,
                                        });
                                    } }
                                >
                                    <ViewAll> Показать всё </ViewAll>
                                </TouchableOpacity>
                            </SubtitleView>

                            <ScrollView
                                horizontal={ true }
                                style={ {
                                    paddingLeft: 10,
                                } }
                                showsHorizontalScrollIndicator={ false }
                            >
                                { !this.loading ? (
                                    datas.cards.map((card, index) => (
                                        <TouchableOpacity
                                            key={ index }
                                            activeOpacity={ 0.7 }
                                            onPress={ () => {
                                                this.props.navigation.push('Record', {
                                                    section: card,
                                                });
                                            } }
                                        >
                                            <Card
                                                title={ card.title }
                                                image={ card.image }
                                                caption={ card.caption }
                                                logo={ card.logo }
                                                subtitle={ card.subtitle }
                                                content={ card.content }
                                                favorite={ card.favorite }
                                            />
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Message>Loading...</Message>
                                ) }
                            </ScrollView>

                            <SubtitleView>
                                <Subtitle>{ 'Гиды'.toUpperCase() }</Subtitle>
                                <ViewAll> Показать всё </ViewAll>
                            </SubtitleView>

                            <CoursesContainer>
                                { !this.loading ? (
                                    datas.courses.map((course, index) => (
                                        <TouchableOpacity
                                            key={ index }
                                            activeOpacity={ 0.7 }
                                            onPress={ () => {
                                                this.props.navigation.push('Section', {
                                                    section: course,
                                                });
                                            } }
                                        >
                                            <BigCard
                                                key={ index }
                                                title={ course.title }
                                                subtitle={ course.subtitle }
                                                image={ course.image }
                                                logo={ course.logo }
                                                author={ course.author }
                                                avatar={ course.avatar }
                                                caption={ course.caption }
                                            />
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Message>Загрузка...</Message>
                                ) }
                            </CoursesContainer>
                        </ScrollView>
                    </SafeAreaView>
                </AnimatedContainer>
                <ModalLogin />
            </RootView>
        );
    }
}

export default HomeScreen;

const Message = styled.Text`
  margin: 20px;
  color: ${ colors.textGray2 };
  font-size: ${ sizes.text }px;
  font-weight: 500;
`;

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
`;

const SubtitleView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${ sizes.margin }px;
`;

const Subtitle = styled.Text`
  color: ${ colors.textGray2 };
  margin-left: ${ sizes.margin }px;
  font-weight: 600;
  font-size: ${ sizes.text }px;
  text-transform: uppercase;
`;

const ViewAll = styled.Text`
  margin-right: ${ sizes.margin }px;
  color: ${ colors.blue };
`;

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${ colors.white };
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: ${ sizes.text }px;
  color: ${ colors.textGray2 };
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: ${ sizes.caption }px;
  color: ${ colors.textGray };
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
