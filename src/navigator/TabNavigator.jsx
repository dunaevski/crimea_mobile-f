import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from 'screens/HomeScreen';
import SectionScreen from 'screens/SectionScreen';
import CoursesScreen from 'screens/CoursesScreen';
import SwipeScreen from 'screens/SwipeScreen';
import VideoScreen from 'screens/VideoScreen';
import SearchScreen from 'screens/SearchScreen';
import RecordScreen from 'screens/RecordScreen';
import CategoryScreen from 'screens/CategoryScreen';
import ProfileScreen from 'screens/ProfileScreen';
import { colors } from 'constants/theme'

const activeColor = colors.blue;
const inactiveColor = colors.textGray2;

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Record: RecordScreen,
        Section: SectionScreen,
        Video: VideoScreen,
        Profile: ProfileScreen,
    },
  {
    mode: "modal"
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName === "Section" || routeName === "Video") {
    tabBarVisible = false;
  }

  return {
      tabBarVisible,
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused }) => (
          <Ionicons
              name="ios-home"
              size={ 28 }
              color={ focused ? activeColor : inactiveColor }
          />
      ),
  };
};

const SearchStack = createStackNavigator({
        Search: SearchScreen,
        Category: CategoryScreen,
        Record: RecordScreen,
        Section: SectionScreen,
        Video: VideoScreen,
    },
);

SearchStack.navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: ({ focused }) => (
        <Ionicons
            name="ios-search"
            size={ 28 }
            color={ focused ? activeColor : inactiveColor }
        />
    ),
};

const CoursesStack = createStackNavigator({
    Courses: CoursesScreen,
});

CoursesStack.navigationOptions = {
    tabBarLabel: 'Courses',
    tabBarIcon: ({ focused }) => (
        <Ionicons
            name="ios-folder"
            size={ 28 }
            color={ focused ? activeColor : inactiveColor }
        />
    ),
};

const SwipeStack = createStackNavigator({
    Swipe: SwipeScreen,
});

SwipeStack.navigationOptions = {
    tabBarLabel: 'Swipes',
    tabBarIcon: ({ focused }) => (
        <Ionicons
            name="ios-albums"
            size={ 28 }
            color={ focused ? activeColor : inactiveColor }
        />
    ),
};


const TabNavigator = createBottomTabNavigator({
    HomeStack,
    SearchStack,
    CoursesStack,
    SwipeStack,
}, {
    swipeEnabled: true,
    tabBarOptions: {
        allowFontScaling: true,
        showLabel: false,
        style: { height: 45 },
    },
});

export default TabNavigator;
