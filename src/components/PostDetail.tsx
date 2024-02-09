
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  
  
} from '@gluestack-ui/themed';
import {TouchableOpacity, Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons  from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo';
import { usePostContext } from '../context/PostContext';

const PostDetail = ({route}) => {
  const {postData} = route.params;
  const {posts}= usePostContext();

  const [likes, setLikes] = useState({});
  const [currentIndx, setCurrentIndx] = useState(0);
const [actionSheet, setActionSheet] = useState(false);
  const scrwidth = Dimensions.get('window').width;

  const newPosts = posts.filter(post => post.isNew);

  const handleLike = postId => {
    setLikes(prevLikes => {
      const newLikes = {...prevLikes};
      if (newLikes[postId]) {
        // If already liked, dislike
        newLikes[postId] = false;
      } else {
        // If not liked, like
        newLikes[postId] = true;
      }
      return newLikes;
    });
  };

  return (
    <>
      
       

      <FlatList
        data={newPosts}
        renderItem={({item}: any) => (
          <View marginVertical={10}>
            <View
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              paddingHorizontal={10}>
              <View flexDirection="row" alignItems="center">
                <Image
                  source={item.imgSrc[0]}
                  alt={item.name}
                  height={30}
                  width={30}
                  borderRadius={50}
                  marginRight={10}
                />
                <Text>{item.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setActionSheet(true);
                  // handleDeletePostId(item.id);
                }}>
                <Entypo name="dots-three-vertical" />
              </TouchableOpacity>
            </View>
            <View maxHeight={300} marginTop={10}>
              <FlatList
                data={item.imgSrc}
                keyExtractor={(image, index) => index.toString()}
                
                renderItem={({item: image, index}) => (
                  <Image
                    key={index}
                    source={image}
                    alt={item.name}
                    w={scrwidth}
                    h={300}
                    objectFit="cover"
                  />
                )}
               
                
              />
            </View>

            <View
              flexDirection="row"
              //   justifyContent="space-between"
              paddingHorizontal={10}
              paddingVertical={8}>
              <View flexDirection="row" flex={1}>
                <TouchableOpacity onPress={() => handleLike(item.id)}>
                  <AntDesign
                    name={likes[item.id] ? 'heart' : 'hearto'}
                    size={28}
                    color={likes[item.id] ? 'red' : 'black'}
                  />
                </TouchableOpacity>

                <EvilIcons name="comment" size={33} />
                <Feather name="send" size={26} />
              </View>

              <View flex={1} alignItems="flex-end">
                <Feather name="bookmark" size={28} />
              </View>
            </View>
            <View paddingHorizontal={10}>
              <Text>
                {likes[item.id]
                  ? `Liked by ${item.Likes + 1} people`
                  : item.Likes > 0
                  ? `Liked by ${item.Likes} people`
                  : null}
              </Text>
            </View>
            <View
              paddingHorizontal={10}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text fontWeight="700">
                {item.name} <Text>{item.caption}</Text>
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default PostDetail;




