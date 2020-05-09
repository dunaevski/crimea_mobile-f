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
import { menuItems as items } from '../mockData';
import Switch from 'components/Switch';
import { observable } from 'mobx';
import { colors, sizes } from 'constants/theme';
import { BlurView } from 'expo-blur';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

let cardWidth = SCREEN_WIDTH;
if (SCREEN_WIDTH > 500) {
    cardWidth = 500;
}


@inject('UIStore')
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

    handleMenu = () => {
        this.props.UIStore.toggleMenu();
    };

    setDark = () => {
        this.dark = !this.dark;
    };

    render() {
        const { UIStore } = this.props;
        const isMenuOpen = UIStore.isMenuOpen;
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
                        <Title> { UIStore.name } </Title>
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
                        <Switch
                            value={ this.dark }
                            onValueChange={ value => {
                                this.setDark(value);
                            } }
                        />
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
