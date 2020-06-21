import React from 'react';
import styled from 'styled-components';

import {
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { colors, sizes } from 'constants/theme';
import { cards, article, category } from '../mockData';
import Results from 'components/Results';
import { fetchHotelsInfo, fetchHotelsPhotoId, getHotelsPhoto } from 'helpers/actions/hotels';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import LottieView from 'lottie-react-native';


const { width, height } = Dimensions.get('window');


@observer
class RecordScreen extends React.Component {
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
                    </Header>
                </SafeAreaView>
            ),
            headerTransparent: true,
        };
    };

    @observable hotels = [];

    componentDidMount() {
        const { category } = this.props.navigation.state.params;
        if (this.hotels.length === 0 && category.title === 'Отели') this.animation.play();

        if (category && category.title === 'Отели' && !this.hotels.length) {
            this.fetchHotels();
        }
    }

    componentDidUpdate() {
        const { category } = this.props.navigation.state.params;
        if (category && category.title === 'Отели' && !this.hotels.length) {
            this.fetchHotels();
        }
        // if (this.hotels.length === 0 && category.title === 'Отели' ) this.animation.play();
    }

    async fetchHotels() {
        const responseHotelsInfo = await fetchHotelsInfo();

        if (responseHotelsInfo.status === 'ok') {
            for (const hotel of responseHotelsInfo.results.hotels) {

                const responseHotelsPhotos = await fetchHotelsPhotoId(hotel.id);
                const photoIds = responseHotelsPhotos[hotel.id];

                const mainPhoto = await getHotelsPhoto(photoIds[0]);
                this.hotels.push({
                    title: hotel.label,
                    image: { uri: mainPhoto.url },
                    subtitle: 'Отели',
                    caption: `Ялта, ${ hotel.locationName }`,
                    logo: require('../../assets/yalta-logo.png'),
                    favorite: true,
                });
            }
        }
    }

    render() {
        const { category } = this.props.navigation.state.params;
        const data = _.cloneDeep(this.hotels);

        return (
            <ScrollView>
                <Container>
                    <ImagesView>
                        <Image
                            source={ { uri: article.preview } }
                        />
                        <TextView>
                            <Title>{ category.title }</Title>
                            <SubTitle>{ category.subtitle }</SubTitle>
                        </TextView>
                    </ImagesView>

                    <Container>
                        <ResultsContainer>
                            {
                                category.title === 'Отели' && !data.length ?
                                    (
                                        <LottieView
                                            source={ require('./../../assets/loader.json') }
                                            style={ {
                                                width: 200,
                                                height: 600,
                                            } }
                                            loop={ true }
                                            ref={ animation => {
                                                this.animation = animation;
                                            } }
                                        />
                                    ) :
                                    (
                                        <Results
                                            picture={ require('./../../assets/notfound3.png') }
                                            text={ 'Попробуйте поискать по другому или удалить фильтр' }
                                            navigation={ this.props.navigation }
                                            results={ this.hotels.length === 0 && category.title !== 'Отели' ? cards : data }
                                        />
                                    )
                            }
                        </ResultsContainer>
                    </Container>
                </Container>
            </ScrollView>
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

const Container = styled.View`
  flex: 1;
`;

const ImagesView = styled.View`
  max-height: 400px;
`;

const TextView = styled.View`
  position: absolute;
  bottom: ${ sizes.margin }px;
  left: ${ sizes.margin }px;
`;

const Image = styled.Image`
  width: ${ width }px;
  height: ${ width }px;
  border-bottom-left-radius: ${ sizes.radius }px;
  border-bottom-right-radius: ${ sizes.radius }px;
`;

const ResultsContainer = styled.View`
 display: flex;
 align-items: center;
 background-color: ${ colors.white };
`;

const Avatar = styled.Image`
  width: ${ sizes.padding * 2 }px;
  height: ${ sizes.padding * 2 }px;
  border-radius: ${ sizes.padding }px;
`;

const Title = styled.Text`
  font-size: ${ sizes.title }px;
  color: ${ colors.white };
  font-weight: bold;
  margin-bottom: ${ sizes.margin / 2 }px;
`;

const SubTitle = styled.Text`
  color: ${ colors.textGray2 };
  margin-bottom: ${ sizes.margin / 2 }px;
`;

export default RecordScreen;
