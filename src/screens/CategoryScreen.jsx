import React from 'react';
import styled from 'styled-components';

import {
    Text,
    Animated,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { colors, sizes } from 'constants/theme';

const { width, height } = Dimensions.get('window');


class CategoryScreen extends React.Component {
    scrollX = new Animated.Value(0);

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

    renderDots = () => {
        const { navigation } = this.props;
        const article = navigation.getParam('article');

        const dotPosition = Animated.divide(this.scrollX, width);

        return (
            <DotsContainer>
                { article.images.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [
                            index - 1,
                            index,
                            index + 1,
                        ],
                        outputRange: [
                            0.5,
                            1,
                            0.5,
                        ],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={ `step-${ item }-${ index }` }
                            style={ [
                                {
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    marginHorizontal: 6,
                                    backgroundColor: colors.white,
                                },
                                { opacity },
                            ] }
                        />
                    );
                }) }
            </DotsContainer>
        );
    };

    renderRatings = rating => {
        const stars = new Array(5).fill(0);
        return stars.map((_, index) => {
            const activeStar = Math.floor(rating) >= index + 1;
            return (
                <Ionicons
                    key={ `star-${ index }` }
                    name="ios-star"
                    size={ sizes.text }
                    color={ colors[activeStar ? 'gradBlue' : 'textGray2'] }
                />
            );
        });
    };

    render() {
        const { navigation } = this.props;
        const article = navigation.getParam('article');

        return (
            <Container>
                <Images>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        showsHorizontalScrollIndicator={ false }
                        decelerationRate={ 0 }
                        scrollEventThrottle={ 16 }
                        snapToAlignment="center"
                        onScroll={ Animated.event([
                            { nativeEvent: { contentOffset: { x: this.scrollX } } },
                        ]) }
                    >
                        { article.images.map((img, index) => (
                            <Image
                                key={ `${ index }-${ img }` }
                                source={ { uri: img } }
                                resizeMode="cover"
                            />
                        )) }
                    </ScrollView>
                    { this.renderDots() }
                </Images>
                <Container>
                    <ArticleContainer>
                        <Avatar source={ { uri: article.user.avatar } } />
                        <Title>{ article.title }</Title>
                        <Rating>
                            { this.renderRatings(article.rating) }
                            <RatingNumber>{ article.rating }</RatingNumber>
                            <RatingReview>({ article.reviews } reviews)</RatingReview>
                        </Rating>

                        <ArticleText>
                            { article.description.split('').slice(0, 180) }...
                            <TouchableOpacity>
                                {/*<ReadMore> Read more</ReadMore>*/ }
                            </TouchableOpacity>

                        </ArticleText>
                    </ArticleContainer>
                </Container>
            </Container>
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

const DotsContainer = styled.View`
  flex: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 36px;
  right: 0;
  left: 0;
`;

const Container = styled.View`
  flex: 1;
`;

const Images = styled.View`
`;

const Image = styled.Image`
  width: ${ width }px;
  height: ${ width }px;
`;

const ArticleContainer = styled.View`
  padding: ${ sizes.padding * 2 }px;
  background-color: ${ colors.white };
  border-top-left-radius: ${ sizes.radius }px;
  border-top-right-radius: ${ sizes.radius }px;
  margin-top: ${ -sizes.padding / 2 }px;
`;

const Avatar = styled.Image`
  position: absolute;
  top: ${ -sizes.margin }px;
  right: ${ sizes.margin }px;
  width: ${ sizes.padding * 2 }px;
  height: ${ sizes.padding * 2 }px;
  border-radius: ${ sizes.padding }px;
`;

const Title = styled.Text`
  font-size: ${ sizes.title }px;
  font-weight: bold;
`;

const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${ sizes.margin / 2 }px;
`;

const RatingNumber = styled.Text`
  margin-left: ${ sizes.margin / 2 }px;
  color: ${ colors.gradBlue };
`;

const RatingReview = styled.Text`
  margin-left: 8px;
  color: ${ colors.textGray2 };
`;

const ArticleText = styled.Text`
  margin-top: ${ sizes.margin }px;
  font-size: ${ sizes.smallText * 1.2 }px;
  line-height: ${ sizes.smallText * 2 }px;
  color: ${ colors.textGray2 };
`;

const ReadMore = styled.Text`
  font-size: ${ sizes.smallText * 1.2 }px;
  line-height: ${ sizes.smallText * 2 }px;
  color: ${ colors.blue };
`;

export default CategoryScreen;
