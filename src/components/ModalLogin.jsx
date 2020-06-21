import React, { Component } from 'react';
import styled from 'styled-components';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import {
    Animated,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { BlurView } from 'expo-blur';
import AnimateIcon from 'components/AnimateIcon';
import LoginForm from 'components/LoginForm';
import RegistrationForm from 'components/RegistrationForm';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


@inject('UIStore')
@observer
export default class ModalLogin extends Component {
    @observable email = '';
    @observable password = '';
    @observable isSuccessful = false;
    @observable isLoading = false;
    @observable isLoginForm = true;
    top = new Animated.Value(SCREEN_HEIGHT);
    scale = new Animated.Value(1.3);
    translateY = new Animated.Value(0);

    componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.UIStore.isModalLoginOpen) {
      Animated.timing(this.top, {
        toValue: 0,
        duration: 0
      }).start();

      Animated.spring(this.scale, { toValue: 1 }).start();
      Animated.timing(this.translateY, {
        toValue: 0,
        duration: 0
      }).start();
    } else {
      setTimeout(() => {
        Animated.timing(this.top, {
          toValue: SCREEN_HEIGHT,
          duration: 0
        }).start();

        Animated.spring(this.scale, { toValue: 1.3 }).start();
      }, 500);

        Animated.timing(this.translateY, {
            toValue: 1000,
            duration: 500,
        }).start();
    }
    }

    tapBackground = () => {
        Keyboard.dismiss();
        this.props.UIStore.toggleModalLogin();
    };

    @action
    handleSubmitLogin = () => {
        this.isLoading = true;

        setTimeout(() => {
            this.isLoading = false;
            this.isSuccessful = true;

            // Alert.alert("Congrats", "You are login!");

            setTimeout(() => {
                this.props.UIStore.toggleModalLogin();
                this.isSuccessful = false;
            }, 1000);
        }, 2000);
        this.props.UIStore.isUserLogin = true;
    };

    @action
    handleLogin = () => {
        this.isLoginForm = !this.isLoginForm;
    };

    render() {
        const { isModalLoginOpen } = this.props.UIStore;

        return (
            <AnimatedContainer style={ { top: this.top } }>
                <TouchableWithoutFeedback onPress={ this.tapBackground }>
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
                <AnimatedModal
                    style={ {
                        transform: [
                            { scale: this.scale },
                            { translateY: this.translateY },
                        ],
                    } }
                >
                    <Logo source={ require('./../../assets/logo.png') } />
                    { this.isLoginForm ? <LoginForm
                            onDisabledKeyboard={ this.tapBackground }
                            handleToRegistration={ this.handleLogin }
                            handleSubmitLogin={this.handleSubmitLogin}
                        /> :
                        <RegistrationForm
                            onDisabledKeyboard={ this.tapBackground }
                            handleToLogin={ this.handleLogin }
                            handleSubmitLogin={this.handleSubmitLogin}
                        /> }
                </AnimatedModal>
                <AnimateIcon
                    isActive={ this.isSuccessful }
                    loop={ false }
                    animation={ require('./../../assets/success') }
                />
        <AnimateIcon
            isActive={ this.isLoading }
            loop={ true }
            animation={ require('./../../assets/loading') }
        />
      </AnimatedContainer>
    );
  }
}

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Modal = styled.View`
  width: ${ SCREEN_WIDTH * 0.8 }px;
  height: 470px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const AnimatedModal = Animated.createAnimatedComponent(Modal);

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 15px;
`;
