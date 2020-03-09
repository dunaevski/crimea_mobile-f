import React from 'react';
import { Animated, Easing, Platform, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import mockData from '../mockData';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Logo from 'components/Logo';
import Card from 'components/Card';
import Course from 'components/Course';
import Menu from 'components/Menu';
import Avatar from 'components/Avatar';
import ModalLogin from 'components/ModalLogin';
import NotificationButton from 'components/NotificationButton';
import Notifications from 'components/Notifications';


@inject('UIStore')
@observer
class HomeScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };
    @observable loaded = false;
    @observable scale = new Animated.Value(1);
    @observable opacity = new Animated.Value(1);
    data = mockData;

    componentDidMount() {
        StatusBar.setBarStyle('dark-content', true);

        if (Platform.OS === 'android') {
            StatusBar.setBarStyle('light-content', true);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.toggleMenu();
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

    @action
    handleAvatar = () => {
        const { UIStore } = this.props;

        if (!UIStore.name) {
            UIStore.toggleMenu();
        }
        else {
            UIStore.toggleModalLogin();
        }
    };

    render() {
        const { UIStore } = this.props;

        return (
            <RootView>
                <Menu />
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
                                    onPress={ this.handleAvatar }
                                    style={ {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                    } }
                                >
                                    <Avatar />
                                </TouchableOpacity>
                                <Title>Добро пожаловать,</Title>
                                <Name>{ UIStore.name }!</Name>
                                <TouchableOpacity
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
                                showsHorizontalScrollIndicator={ false }
                            >
                                { !this.loading ? (
                                    this.data.logos.map((logo, index) => (
                                        <Logo key={ index } image={ logo.image } text={ logo.text } />
                                    ))
                                ) : (
                                    <Message>Loading...</Message>
                                ) }
                            </ScrollView>

                            <Subtitle>{ 'Популярные места'.toUpperCase() }</Subtitle>

                            <ScrollView
                                horizontal={ true }
                                style={ { paddingBottom: 30 } }
                                showsHorizontalScrollIndicator={ false }
                            >
                                { !this.loading ? (
                                    this.data.cards.map((card, index) => (
                                        <TouchableOpacity
                                            key={ index }
                                            onPress={ () => {
                                                this.props.navigation.push('Section', {
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
                                            />
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Message>Loading...</Message>
                                ) }
                            </ScrollView>

                            <Subtitle>{ 'Гиды'.toUpperCase() }</Subtitle>

                            <CoursesContainer>
                                { !this.loading ? (
                                    this.data.courses.map((course, index) => (
                                        <Course
                                            key={ index }
                                            title={ course.title }
                                            subtitle={ course.subtitle }
                                            image={ course.image }
                                            logo={ course.logo }
                                            author={ course.author }
                                            avatar={ course.avatar }
                                            caption={ course.caption }
                                        />
                                    ))
                                ) : (
                                    <Message>Loading...</Message>
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
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;
