import {
  View,
  Text,
  Image,
  FormControl,
  FormControlLabel,
  InputField,
  Input,
  FormControlLabelText,
  ButtonText,
  Button,
} from '@gluestack-ui/themed';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';

import React, {useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import { usePostContext } from '../context/PostContext';

const EditProfile = ({route, navigation}: any) => {
    const {profileData, updateProfile} = usePostContext();
  
  const {initialData} = route.params;
  
const [selectImg, setSelectImg] = useState(profileData.image);
  const [username, setUsername] = useState(profileData.username);
  const [bio, setBio] = useState(profileData.bio);
  const [showImageOptions, setShowImageOptions] = useState(false);

  const toggleImageOptions = () => {
    setShowImageOptions(!showImageOptions);
  };

  const imgs = (fromCamera: boolean) => {
    let options = {
      mediaType: 'photo' as MediaType,

      storageOptions: {
        path: 'image',
      },
    };
    if (fromCamera) {
      launchCamera(options, response => {
        handleImageSelection(response);
      });
    } else {
      launchImageLibrary(options, response => {
        handleImageSelection(response);
      });
    }
    setShowImageOptions(false);
  };
 const handleImageSelection = response => {
      if (response.assets && response.assets.length > 0) {
        setSelectImg(response.assets[0].uri);
      }
      // setSelectImg(response.assets[0].uri);
      // console.log(response.assets[0].uri);
    };
  

  return (
    <View p={10}>
      <View flexDirection="column" alignItems="center">
        <Image source={selectImg} alt="profile" borderRadius={50} />
        <TouchableOpacity onPress={toggleImageOptions}>
          <Text color="$blue600">Edit Picture</Text>
        </TouchableOpacity>
      </View>
      {showImageOptions && (
        <View
          flexDirection="column"
          justifyContent="center"
          alignItems="center">
          <TouchableOpacity
            onPress={() => imgs(true)}
            style={{
              backgroundColor: '#3d85eb',
              marginBottom: 10,
              padding: 6,
              borderRadius: 5,
            }}>
            <Text color="white">Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => imgs(false)}
            style={{backgroundColor: '#3d85eb', padding: 6, borderRadius: 5}}>
            <Text color="white">Choose from Library</Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <FormControl size="md">
          <FormControlLabel mb="$1">
            <FormControlLabelText>Username</FormControlLabelText>
          </FormControlLabel>
          <Input borderRadius={10}>
            <InputField
              type="text"
              placeholder="Username"
              onChangeText={text => setUsername(text)}
              value={username}
            />
          </Input>
          <FormControlLabel mb="$1" mt={10}>
            <FormControlLabelText>Bio</FormControlLabelText>
          </FormControlLabel>
          <Input borderRadius={10}>
            <InputField
              type="text"
              placeholder="Bio"
              onChangeText={text => setBio(text)}
              value={bio}
            />
          </Input>
        </FormControl>
        <FormControl flexDirection="row" justifyContent="center" mt={20}>
          <Button
            bg="$darkBlue600"
            onPress={() => {
              updateProfile({...profileData, username, bio, image: selectImg});
              navigation.navigate('Profile', {
                updatedData: {...initialData, image: selectImg, username, bio},
              });
            }}>
            <ButtonText fontSize="$md" fontWeight="$medium">
              Save
            </ButtonText>
          </Button>
        </FormControl>
      </View>
    </View>
  );
};

export default EditProfile;
