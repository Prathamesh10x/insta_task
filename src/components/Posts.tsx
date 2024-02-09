import {
  View,
  Text,
  Image,
  RefreshControl,
  Fab,
  FabLabel,
  ActionsheetBackdrop,
  InputField,
} from '@gluestack-ui/themed';

import React, {useCallback, useEffect, useState} from 'react';
import {Actionsheet} from '@gluestack-ui/themed';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from '@gluestack-ui/themed';
import {ActivityIndicator, Dimensions, ImageSourcePropType} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {FlatList} from '@gluestack-ui/themed';
import Stories from './Stories';
import {blogs} from '../utils/blogs';
import UploadPost from './UploadPost';
import {usePostContext} from '../context/PostContext';
import {ActionsheetContent} from '@gluestack-ui/themed';
import {ActionsheetItem} from '@gluestack-ui/themed';
import {ActionsheetItemText} from '@gluestack-ui/themed';
import {Input} from '@gluestack-ui/themed';

const Posts = () => {
  const {posts, removePost, updateCaption, addPost} = usePostContext();

  const [postss, setPostss] = useState(blogs);

  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const scrwidth = Dimensions.get('window').width;

  const [currentIndx, setCurrentIndx] = useState(0);

  const [actionSheet, setActionSheet] = useState(false);
  const [deletePostId, setDeletePostId] = useState();
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [editedCaption, setEditedCaption] = useState('');
  const [newlyAddedPostIds, setNewlyAddedPostIds] = useState([]);

  const handleClose = () => {
    setActionSheet(!actionSheet);
  };
  useEffect(() => {
    if (posts) {
      setPostss([...posts, ...postss]);
      const newlyAddedIds = posts
        .filter(post => !postss.find(p => p.id === post.id))
        .map(post => post.id);
      setNewlyAddedPostIds(newlyAddedIds);
    }
  }, [posts]);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = [...postss, ...blogs];
      setPostss(newData);
      setLoading(false);
    }, 1000);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * blogs.length);
      const newData = blogs.slice(randomIndex, randomIndex + 10);
      setPostss(newData);

      setRefreshing(false);
    }, 1000);
  }, []);

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

  const handleDelete = postId => {
    removePost(postId);
    setActionSheet(false);
  };
  function handleDeletePostId(deletepostId: any) {
    setDeletePostId(deletepostId);
  }
  const handleEdit = () => {
    setIsEditingCaption(true);
    setEditedCaption(
      posts.find(post => post.id === deletePostId)?.caption || '',
    );
    setActionSheet(false);
  };

  const handleDone = () => {
    updateCaption(deletePostId, editedCaption);
    setIsEditingCaption(false);
  };

  const renderActionsheet = () => {
    if (newlyAddedPostIds.includes(deletePostId)) {
      return (
        <Actionsheet isOpen={actionSheet} onClose={handleClose} zIndex={999}>
          <ActionsheetBackdrop />
          <ActionsheetContent h="$40" zIndex={999}>
            <ActionsheetItem onPress={() => handleDelete(deletePostId)}>
              <ActionsheetItemText>Delete</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleEdit}>
              <ActionsheetItemText>Edit</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Cancel</ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>
      );
    } else {
      return (
        <Actionsheet isOpen={actionSheet} onClose={handleClose} zIndex={999}>
          <ActionsheetBackdrop />
          <ActionsheetContent h="$32" zIndex={999}>
            <ActionsheetItem >
              <ActionsheetItemText>Archive</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Cancel</ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>
      );
    }
  };

  return (
    <>
      <FlatList
        data={postss}
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
                  handleDeletePostId(item.id);
                }}>
                <Entypo name="dots-three-vertical" />
              </TouchableOpacity>
            </View>
            <View maxHeight={300} marginTop={10}>
              <FlatList
                data={item.imgSrc}
                keyExtractor={(image, index) => index.toString()}
                onScroll={e => {
                  const x = e.nativeEvent.contentOffset.x;
                  setCurrentIndx(Math.round(x / scrwidth));
                }}
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
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
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
              {item.imgSrc.length > 1 && (
                <View
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  flex={1}>
                  {item.imgSrc.map((data, index) => (
                    <View
                      width={currentIndx === index ? 12 : 8}
                      height={currentIndx === index ? 12 : 8}
                      backgroundColor={
                        currentIndx === index ? '$blue500' : 'grey'
                      }
                      borderRadius={currentIndx === index ? 8 : 4}
                      marginLeft={2}></View>
                  ))}
                </View>
              )}
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
              {isEditingCaption ? (
                <>
                  <Input width={'$1/2'}>
                    <InputField
                      value={editedCaption}
                      onChangeText={text => setEditedCaption(text)}
                      placeholder="Edit caption"
                    />
                  </Input>
                  <TouchableOpacity onPress={handleDone}>
                    <Feather name="check" size={20} />
                  </TouchableOpacity>
                </>
              ) : (
                // Render the caption text
                <Text fontWeight="700">
                  {item.name} <Text>{item.caption}</Text>
                </Text>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={Stories}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
      {renderActionsheet()}
    </>
  );
};

export default Posts;
