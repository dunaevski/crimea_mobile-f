import React from 'react';
import styled from 'styled-components';
import {
    Animated,
    Dimensions,
    ScrollView,
    Linking,
    TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, sizes } from 'constants/theme';
import { article } from '../mockData';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const { width, height } = Dimensions.get('window');


@observer
class RecordScreen extends React.Component {
    @observable viewAllContent = false;
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

    viewAll = () => {
        this.viewAllContent = !this.viewAllContent;
    };

    render() {
        const { navigation } = this.props;

        return (
            <Container>
                <ScrollView>
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
                            <ContainerView>
                                { this.renderRatings(article.rating) }
                                <RatingNumber>{ article.rating }</RatingNumber>
                                <RatingReview>({ article.reviews } просмотров )</RatingReview>
                            </ContainerView>

                            <ContainerView>
                                <Feather
                                    name="map-pin"
                                    size={ 20 }
                                    color={ colors.textGray2 }
                                    style={ { marginRight: 20 } }
                                />
                                <RatingNumber>Набережная имени Ленина</RatingNumber>
                                <RatingReview>2.0 км</RatingReview>
                            </ContainerView>
                            <TouchableWithoutFeedback onPress={ ()=>{ Linking.openURL('https://yandex.ru/maps/?ll=34.163703%2C44.489885&mode=routes&rtext=~44.490335%2C34.163227&rtt=auto&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fll%3D34.163%252C44.490%26spn%3D0.012%252C0.013%26text%3D%25D0%25A0%25D0%25BE%25D1%2581%25D1%2581%25D0%25B8%25D1%258F%252C%2520%25D0%25A0%25D0%25B5%25D1%2581%25D0%25BF%25D1%2583%25D0%25B1%25D0%25BB%25D0%25B8%25D0%25BA%25D0%25B0%2520%25D0%259A%25D1%2580%25D1%258B%25D0%25BC%252C%2520%25D0%25AF%25D0%25BB%25D1%2582%25D0%25B0%252C%2520%25D0%25BD%25D0%25B0%25D0%25B1%25D0%25B5%25D1%2580%25D0%25B5%25D0%25B6%25D0%25BD%25D0%25B0%25D1%258F%2520%25D0%25B8%25D0%25BC%25D0%25B5%25D0%25BD%25D0%25B8%2520%25D0%2592.%25D0%2598.%2520%25D0%259B%25D0%25B5%25D0%25BD%25D0%25B8%25D0%25BD%25D0%25B0&z=16.08')}}>
                                <MapImage source={ require('../../assets/map.png') } />
                            </TouchableWithoutFeedback>
                            <TextView>
                                {
                                    this.viewAllContent ? (
                                        <ArticleText>{ article.description }</ArticleText>
                                    ) : (
                                        <>
                                            <TouchableOpacity onPress={ this.viewAll }>
                                                <ArticleText>
                                                    { article.description.split('').slice(0, 180) }...
                                                    { <ReadMore>Показать больше</ReadMore> }
                                                </ArticleText>
                                            </TouchableOpacity>
                                        </>
                                    )
                                }
                            </TextView>
                        </ArticleContainer>
                    </Container>
                </ScrollView>
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
  max-height: 400px;
`;

const MapImage = styled.Image`
  width: ${ width }px;
  height: ${ width / 2 }px;
  margin-top: ${ sizes.margin }px;
  margin-left: ${ -sizes.padding * 2 }px;
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

const ContainerView = styled.View`
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

const TextView = styled.View`
  margin-top: ${ sizes.margin }px;
  font-size: ${ sizes.smallText * 1.2 }px;
  line-height: ${ sizes.smallText * 2 }px;
`;

const ArticleText = styled.Text`
  color: ${ colors.textGray2 };
`;

const ReadMore = styled.Text`
  color: ${ colors.blue };
`;

export default RecordScreen;
