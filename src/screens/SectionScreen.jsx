import React, { Component } from 'react';
import styled from 'styled-components';
import { Linking, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { PlayIcon } from 'components/Icons';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { colors, sizes } from 'constants/theme';


@observer
class SectionScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <StatusBar hidden />
          <Cover>
            <Image source={section.image} />
            <PlayWrapper>
              <TouchableOpacity
                  underlayColor="transparent"
                  activeOpacity={ 0.7 }
                  onPress={ () => {
                    navigation.navigate('Video');
                  } }
              >
                <PlayView>
                  <PlayIcon style={ { marginLeft: -10 } } />
                </PlayView>
              </TouchableOpacity>
            </PlayWrapper>
            <Wrapper>
              <Logo source={ section.logo } />
              <Subtitle>{ section.subtitle }</Subtitle>
            </Wrapper>
            <Title>{ section.title }</Title>
            <Caption>{ section.caption }</Caption>
          </Cover>
          <TouchableOpacity
              style={ {
                position: 'absolute',
                top: 20,
                right: 20,
              } }
              activeOpacity={ 0.7 }
              onPress={ () => {
                navigation.goBack();
              } }
          >
            <CloseView>
              <Ionicons
                  name="ios-close"
                  size={ 36 }
                  color={ colors.blue }
                  style={ { marginTop: -2 } }
              />
            </CloseView>
          </TouchableOpacity>
          <Content>
            <WebView
              source={{ html: section.content + htmlStyles }}
              scalesPageToFit={false}
              scrollEnabled={false}
              ref={webView => (this.webView = webView)}
              onNavigationStateChange={event => {
                if (event.url !== "about:blank") {
                  this.webView.stopLoading();
                  Linking.openURL(event.url);
                }
              }}
            />
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default SectionScreen;

const htmlStyles = `
<style>
   * {
      font-family: -apple-system, Roboto;
      margin: 0;
      padding: 0;
      font-size: 30px;
      font-weight: normal;
      color: ${ colors.textGray };
      line-height: 40px;
    }
    body {
          background-color: ${ colors.white };
    }
    h2 {
      font-size: 40px;
      text-transform: uppercase;
      color: ${ colors.textGray2 };
      font-weight: 600;
      margin-top: 50px;
    }
  
    p {
      margin-top: 20px;
    }
  
    a {
      color: ${ colors.blue };
      font-weight: 600;
      text-decoration: none;
    }
  
    strong {
      font-weight: 700;
    }
    img {
      width: 100%;
      border-radius: 10px;
      margin-top: 20px;
    }
    </style>
`;

const Content = styled.View`
  height: 1000px;
  padding: 20px;
`;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: ${ sizes.title }px;

  font-weight: bold;
  color: white;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: ${ sizes.text }px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: ${ sizes.text }px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;

const PlayWrapper = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
`;

const PlayView = styled.View`
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`;
