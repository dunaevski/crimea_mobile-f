import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from 'screens/HomeScreen';
import SectionScreen from 'screens/SectionScreen';
import CoursesScreen from 'screens/CoursesScreen';
import ProjectsScreen from 'screens/ProjectsScreen';
import VideoScreen from 'screens/VideoScreen';
import SearchScreen from 'screens/SearchScreen';
import { colors } from 'constants/theme'

const activeColor = colors.blue;
const inactiveColor = colors.textGray2;

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen,
    Video: VideoScreen
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
            name="ios-albums"
            size={ 28 }
            color={ focused ? activeColor : inactiveColor }
        />
    ),
};

const ProjectStack = createStackNavigator({
  Project: ProjectsScreen
});

ProjectStack.navigationOptions = {
  tabBarLabel: "Projects",
  tabBarIcon: ({ focused }) => (
      <Ionicons
          name="ios-folder"
          size={ 28 }
          color={ focused ? activeColor : inactiveColor }
      />
  )
};


const TabNavigator = createBottomTabNavigator({
    HomeStack,
    SearchStack,
    CoursesStack,
    ProjectStack,
}, {
    swipeEnabled: true,
    tabBarOptions: {
        allowFontScaling: true,
        showLabel: false,
        style: { height: 45 },
    },
});

export default TabNavigator;
