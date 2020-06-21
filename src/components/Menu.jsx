import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import {
    Animated,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MenuItems from 'components/MenuItems';
import { article, menuItems as items } from '../mockData';
import Switch from 'components/Switch';
import { observable } from 'mobx';
import { colors, sizes } from 'constants/theme';
import { BlurView } from 'expo-blur';
import { SvgUri } from 'react-native-svg';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

let cardWidth = SCREEN_WIDTH;
if (SCREEN_WIDTH > 500) {
    cardWidth = 500;
}


@inject('UIStore', 'UserStore')
@observer
class Menu extends React.Component {
    @observable dark = false;
    top = new Animated.Value(SCREEN_HEIGHT);

    componentDidMount() {
        this.toggleMenu();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.UIStore.isMenuOpen) {
            StatusBar.setBarStyle('light-content', true);
        }
        else {
            StatusBar.setBarStyle('dark-content', true);
        }
        this.toggleMenu();
    }

    toggleMenu = () => {
        if (this.props.UIStore.isMenuOpen) {
            Animated.spring(this.top, {
                toValue: 0,
            }).start();
        }
        else {
            Animated.spring(this.top, {
                toValue: SCREEN_HEIGHT,
            }).start();
        }
    };

    handleMenu = index => {
        switch (index) {
            case 0:
                this.props.navigation.push('Profile');
                this.props.UIStore.toggleMenu();
                break;
            case 1:
                this.props.navigation.push('Favorite');
                this.props.UIStore.toggleMenu();
                break;
            case 2:
                this.props.navigation.push('Settings');
                this.props.UIStore.toggleMenu();
                break;
            case 3:
                this.props.UIStore.toggleMenu();
                this.props.UserStore.setUser({
                    isSign: false,
                });
                break;
        }
    };

    setDark = () => {
        this.dark = !this.dark;
    };

    render() {
        const { UIStore, UserStore } = this.props;
        const isMenuOpen = UIStore.isMenuOpen;
        const weatherInfo = UserStore.weatherInfo;
        return (
            <AnimatedContainer style={ { top: this.top } }>
                <TouchableWithoutFeedback
                    onPress={ () => {
                        UIStore.toggleMenu();
                    } }
                >
                    <BlurView
                        titnt="default"
                        intensity={ 100 }
                        style={ {
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                        } }
                    />
                </TouchableWithoutFeedback>
                <Container>
                    <Cover>
                        <Image source={ require('./../../assets/background2.jpg') } />
                        <Title> { UserStore.fullName } </Title>
                        <Subtitle>Крым в Твоих руках</Subtitle>
                    </Cover>
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => {
                            UIStore.toggleMenu();
                        } }
                        style={ {
                            position: 'absolute',
                            top: 120,
                            left: '50%',
                            marginLeft: -22,
                            zIndex: 1,
                        } }
                    >
                        <CloseView>
                            <Ionicons name="ios-close" size={ 44 } color={ colors.blue } />
                        </CloseView>
                    </TouchableOpacity>
                    <Content>
                        { items.map((item, index) => (
                            <TouchableOpacity
                                key={ index }
                                activeOpacity={ 0.7 }
                                onPress={ () => {
                                    this.handleMenu(index);
                                } }
                            >
                                <MenuItems
                                    icon={ item.icon }
                                    title={ item.title }
                                    text={ item.text }
                                />
                            </TouchableOpacity>
                        )) }
                        {/*<Switch*/ }
                        {/*    value={ this.dark }*/ }
                        {/*    onValueChange={ value => {*/ }
                        {/*        this.setDark(value);*/ }
                        {/*    } }*/ }
                        {/*/>*/ }
                        { weatherInfo.fact && (
                            <WeatherView>
                                <TempText style={ { fontWeight: 'bold' } }>
                                    { ' ' }
                                    Погода в Ялте{ ' ' }
                                </TempText>
                                <TempView>
                                    <SvgUri
                                        width="50"
                                        height="50"
                                        uri={ `https://yastatic.net/weather/i/icons/blueye/color/svg/${ weatherInfo.fact.icon }.svg` }
                                    />
                                    <TempText> { weatherInfo.fact.temp }° </TempText>
                                    <TempText> Воздух </TempText>
                                </TempView>

                                <TempView>
                                    <SvgUri
                                        width="40"
                                        height="40"
                                        uri="https://image.flaticon.com/icons/svg/3050/3050850.svg"
                                    />
                                    <TempText> { weatherInfo.fact.temp_water }° </TempText>
                                    <TempText> Море </TempText>
                                </TempView>
                            </WeatherView>
                        ) }
                    </Content>
                </Container>
            </AnimatedContainer>
        );
    }
}

export default Menu;

const Container = styled.View`
  height: 700px;
  width: ${ cardWidth }px;
  background: white;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  overflow: hidden;
`;

const BackgroundContainer = styled.View`
  position: absolute;
  width: ${ SCREEN_WIDTH }px;
  height: ${ SCREEN_HEIGHT }px;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
  z-index: 100;
  align-self: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(BackgroundContainer);

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Image = styled.Image`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: ${ sizes.caption }px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: ${ sizes.text }px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  height: ${ SCREEN_HEIGHT }px;
  background: ${ colors.white };
  padding: 25px 0 0 40px;
`;

const WeatherView = styled.View`
  padding: ${ sizes.padding }px;
  border-radius: ${ sizes.radius }px;
  width: ${ SCREEN_WIDTH - sizes.padding * 4 }px;
  height: 200px;
  background-color: ${ colors.borderWhite };
  margin-top: ${ sizes.margin }px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TempView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

const TempText = styled.Text`
  font-size: ${ sizes.bigTitle }px;
  font-weight: 300;
  line-height: 50px;
  color: ${ colors.textGray };
`;
