import React, { Component } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { colors, sizes } from 'constants/theme';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

const SCREEN_WIDTH = Dimensions.get('window').width;

@observer
class LoginForm extends Component {
    @observable iconEmail = require('./../../assets/icon-email.png');
    @observable iconPassword = require('./../../assets/icon-password.png');

    focusEmail = () => {
        this.iconEmail = require("./../../assets/icon-email-animated.gif");
        this.iconPassword = require("./../../assets/icon-password.png");
    };

    focusPassword = () => {
        this.iconEmail = require("./../../assets/icon-email.png");
        this.iconPassword = require("./../../assets/icon-password-animated.gif");
    };

    render() {
        return (
            <>
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
                    onPress={ this.props.handleSubmitLogin }
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
                        onPress={ this.props.handleToRegistration }
                    >
                        <SignUp>Создать</SignUp>
                    </TouchableOpacity>
                </SignUpView>
            </>
        );
    }
}

export default LoginForm;


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
  margin-top: 10px;
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
