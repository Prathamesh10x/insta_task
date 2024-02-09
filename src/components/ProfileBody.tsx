import {Image, View} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {usePostContext} from '../context/PostContext';
import { useNavigation } from '@react-navigation/native';



const ProfileBody = () => {
  const {posts} = usePostContext();
const navigation = useNavigation();
  const [activeIcon, setActiveIcon] = useState('grid-on');
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const iconwidth = width / 2;

  const handleIcon = iconname => {
    setActiveIcon(iconname);
  };
const newPosts = posts.filter(post => post.isNew);
  const getBorderStyle = iconName => {
    return {
      width: iconwidth,
      alignItems: 'center',
      borderBottomWidth: activeIcon === iconName ? 2 : 0,
      borderBottomColor: 'black',
    };
  };

  return (
    <>
      <View flexDirection="row">
        <TouchableOpacity
          onPress={() => handleIcon('grid-on')}
          style={getBorderStyle('grid-on')}>
          <MatIcon name="grid-on" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIcon('person-pin')}
          style={getBorderStyle('person-pin')}>
          <MatIcon name="person-pin" size={30} />
        </TouchableOpacity>
      </View>
      {activeIcon === 'grid-on' && (
        <View flexDirection="row" flexWrap="wrap">
          {newPosts.map(postData => (
            <TouchableOpacity
              key={postData.id}
              onPress={() => navigation.navigate('PostDetail', {postData})}>
              <View width={width / 3}>
                <Image
                  source={postData.imgSrc[0]}
                  alt={`img_${postData.id}`}
                  width={width / 3}
                  height={width / 3}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default ProfileBody;
