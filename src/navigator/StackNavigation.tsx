import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Story from '../components/Story';
import Profile from '../components/Profile';
import UploadPost from '../components/UploadPost';
import EditProfile from '../components/EditProfile';
import Posts from '../components/Posts';
import Stories from '../components/Stories';
import {PostProvider} from '../context/PostContext';

import ProfileBody from '../components/ProfileBody';
import PostDetail from '../components/PostDetail';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <PostProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Story" component={Story} />
          <Stack.Screen name="Stories" component={Stories} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="UploadPost" component={UploadPost} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ProfileBody" component={ProfileBody} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </PostProvider>
  );
};

export default StackNavigation;
