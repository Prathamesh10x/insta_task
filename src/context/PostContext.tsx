import React, {createContext, useContext, useState} from 'react';
import {blogs} from '../utils/blogs';

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({children}: any) => {
  const [posts, setPosts] = useState(blogs);
  const [profileData, setProfileData] = useState({
    username: 'Ian Mathews',
    bio: '26',
    image: require('../assets/Ian.jpg'),
  });

  const addPost = (post) => {
    const newPost = {...post, isNew: true};
    setPosts([newPost, ...posts]);
  };

  const removePost = postId => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

   const updateCaption = (postId, newCaption) => {
     setPosts(prevPosts => {
       
       return prevPosts.map(post => {
         if (post.id === postId) {
           return {...post, caption: newCaption};
         }
         return post;
       });
     });
   };
  const updateProfile = newProfileData => {
    setProfileData(newProfileData);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        removePost,
        updateCaption,
        profileData,
        updateProfile,
      }}>
      {children}
    </PostContext.Provider>
  );
};
