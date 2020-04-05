import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import CourseSection from 'components/CourseSection';
import Courses from 'components/Courses';
import { sections } from '../mockData';
import { colors, sizes } from 'constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

@observer
class CoursesScreen extends Component {
    static navigationOptions = {
        title: 'Courses',
        headerShown: false,
    };

    render() {
        return (
            <Container>
                <ScrollView>
                    <Hero>
                        <Background source={ require('./../../assets/background12.jpg') } />
                        <LinearGradient
                            colors={ [
                                'rgba(0, 0, 0, 0)',
                                'rgba(0, 0, 0, 0.5)',
                            ] }
                            style={ {
                                position: 'absolute',
                                width: SCREEN_WIDTH,
                                height: 460,
                            } }
                        />
                        <Logo source={ require('./../../assets/logo-react.png') } />
                        <Caption>12 Sections</Caption>
                        <Title>React Native for Designers</Title>
                        <Sections>
                            <SectionScrollView
                                horizontal={ true }
                                showsHorizontalScrollIndicator={ false }
                            >
                                { sections.map((section, index) => (
                                    <CourseSection
                                        key={ index }
                                        title={ section.title }
                                        image={ section.image }
                                        progress={ section.progress }
                                    />
                                )) }
                            </SectionScrollView>
                        </Sections>
                        <Author>
                            <Avatar source={ require('./../../assets/avatar.jpg') } />
                            <Name>Taught by Meng To</Name>
                        </Author>
                    </Hero>
                    <Subtitle>Latest Courses</Subtitle>
                    <Courses />
                </ScrollView>
            </Container>
        );
    }
}


export default CoursesScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${ colors.white }; 
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Hero = styled.View`
  height: 460px;
  background: ${ colors.textGray }; 
`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: ${ SCREEN_WIDTH }px;
  height: 460px;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  margin-top: 50px;
  margin-left: 20px;
  align-self: center;
`;

const Caption = styled.Text`
  font-size: ${ sizes.text }px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${ colors.textGray2 }; 
  margin-top: 20px;
  margin-left: 20px;
`;

const Title = styled.Text`
  font-size: ${ sizes.bigTitle }px;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  margin-left: 20px;
  width: 220px;
`;

const Sections = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const SectionScrollView = styled.ScrollView`
  padding: 10px 0;
`;

const Author = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  margin-left: 20px;
`;

const Avatar = styled.Image`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background: white;
`;

const Name = styled.Text`
  margin-left: 8px;
  color: ${ colors.textGray2 };  
`;

const Subtitle = styled.Text`
  font-size: ${ sizes.text }px;
  text-transform: uppercase;
  font-weight: 600;
  color: ${ colors.textGray2 };
  margin: 20px 0 0 20px;
`;
