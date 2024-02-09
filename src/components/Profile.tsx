import {View, Text, Image, ScrollView} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Footer from './Footer';
import {useNavigation} from '@react-navigation/native';
import ProfileBody from './ProfileBody';
import {usePostContext} from '../context/PostContext';
const data = [
  {name: 'Posts', Numbers: 'postsCount'},
  {name: 'Followers', Numbers: 'followerCount'},
  {name: 'Following', Numbers: 'followingCount'},
];

const Profile = ({route}) => {
  const navigation = useNavigation();
  const {profileData, posts} = usePostContext();
  const {updatedData} = route.params || {};
const newPosts = posts.filter(post => post.isNew);
  const [counts, setCounts] = useState({
    postsCount: newPosts.length,
    followerCount: '48M',
    followingCount: '200',
  });

  

  useEffect(() => {
    // Update the post count when the posts array changes
    setCounts(prevCounts => ({...prevCounts, postsCount: newPosts.length}));
  }, [posts]);

  //   console.log(updatedData);

  return (
    <>
      <ScrollView backgroundColor="white" flex={1}>
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          p={10}>
          <Image
            key={profileData.image}
            source={profileData.image}
            alt="Profile"
            height={70}
            width={70}
            borderRadius={50}
          />

          {data.map(item => (
            <View >
              <Text textAlign="center" color="black">
                {counts[item.Numbers]}
              </Text>
              <Text color="black">{item.name}</Text>
            </View>
          ))}
        </View>
        <View p={10}>
          <View>
            <Text color="black">{profileData.username}</Text>

            <Text>{profileData.bio} </Text>
          </View>
          <View
            flexDirection="row"
            //   width={'$full'}
            justifyContent="space-around"
            alignItems="center"
            marginTop={10}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditProfile', {initialData: updatedData})
              }
              style={{backgroundColor: '#aaa', borderRadius: 10}}>
              <Text color="black" px={30} py={10}>
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor: '#aaa', borderRadius: 10}}>
              <Text color="black" px={30} py={10}>
                Share Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ProfileBody />
        </View>
      </ScrollView>
      <Footer></Footer>
    </>
  );
};

export default Profile;
