import React, { Component } from 'react';
import styled from 'styled-components';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import {
  Animated,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { BlurView } from 'expo-blur';
import AnimateIcon from 'components/AnimateIcon';
import { colors, sizes } from 'constants/theme';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


@inject('UIStore')
@observer
class ModalLogin extends Component {
  @observable email = '';
  @observable password = '';
  @observable iconEmail = require('./../../assets/icon-email.png');
  @observable iconPassword = require('./../../assets/icon-password.png');
  @observable isSuccessful = false;
  @observable isLoading = false;
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
        duration: 500
      }).start();
    }
  }

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
  };

  focusEmail = () => {
    this.iconEmail = require("./../../assets/icon-email-animated.gif");
    this.iconPassword = require("./../../assets/icon-password.png");
  };

  focusPassword = () => {
    this.iconEmail = require("./../../assets/icon-email.png");
    this.iconPassword = require("./../../assets/icon-password-animated.gif");
  };

  tapBackground = () => {
    Keyboard.dismiss();
    this.props.UIStore.toggleModalLogin();
  };

  render() {
    const { isModalLoginOpen } = this.props.UIStore;
    return (
      <AnimatedContainer style={{ top: this.top }}>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
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
          <Text>Откройте для себя новый крым </Text>
          <Email>
            <IconEmail source={ this.iconEmail } />
            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={ email => {
                  this.email = email;
                } }
                onFocus={ this.focusEmail }
            />
          </Email>
          <Password>
            <IconPassword source={ this.iconPassword } />
            <TextInput
                placeholder="Пароль"
                secureTextEntry={ true }
                onChangeText={ password => {
                  this.password = password;
                } }
                onFocus={ this.focusPassword }
            />
          </Password>
          <ForgotView>
            <TouchableOpacity
                activeOpacity={ 0.7 }
                onPress={ this.handleSubmitLogin }
            >
              <Forgot>Забыли пароль?</Forgot>
            </TouchableOpacity>
          </ForgotView>
          <TouchableOpacity
              activeOpacity={ 0.7 }
              onPress={ this.handleSubmitLogin }
          >
            <Button>
              <ButtonText>Вход</ButtonText>
            </Button>
          </TouchableOpacity>
          <Text>Или</Text>
          <SocialView>
            <SocialIcon source={ require('./../../assets/vkIcon.png') } />
            <SocialIcon source={ require('./../../assets/googleIcon.png') } />
            <SocialIcon source={ require('./../../assets/facebookIcon.png') } />
          </SocialView>

          <SignUpView>
            <Text> Нет аккаунта? </Text>
            <TouchableOpacity
                activeOpacity={ 0.7 }
                onPress={ this.handleSubmitLogin }
            >
              <SignUp>Создать</SignUp>
            </TouchableOpacity>
          </SignUpView>
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

export default ModalLogin;

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
  height: 480px;
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

const Text = styled.Text`
  margin-top: 20px;
  font-size: ${ sizes.text }px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: ${ colors.textGray2 };
`;

const TextInput = styled.TextInput`
  border: 1px solid ${ colors.borderWhite };
  width: ${ SCREEN_WIDTH * 0.7 }px;
  height: 44px;
  border-radius: 10px;
  font-size: ${ sizes.text }px;
  color: ${ colors.textGray };
  margin-top: 20px;
  padding-left: 44px;
`;

const Button = styled.View`
  background: ${ colors.blue };
  width: ${ SCREEN_WIDTH * 0.7 }px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: ${ sizes.text }px;
  text-transform: uppercase;
`;

const ForgotView = styled.View`
  margin-top: 10px;
  margin-right: ${ sizes.margin }px;
  align-self: flex-end;
`;

const Forgot = styled.Text`
  color: ${ colors.gradBlue };
  font-weight: bold;
`;

const Email = styled.View``;

const Password = styled.View``;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 32px;
  left: 13px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 28px;
  left: 13px;
`;

const SocialView = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const SocialIcon = styled.Image`
  width: 44px;
  height: 44px;
  margin-left: 10px;
`;

const SignUpView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SignUp = styled.Text`
  margin-top: 20px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${ colors.blue };
`;
