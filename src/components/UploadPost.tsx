import {
  Button,
  ButtonText,
  FormControlLabel,
  Image,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import {FormControlLabelText} from '@gluestack-ui/themed';
import {View, Text, FormControl} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import { TouchableOpacity} from 'react-native';
import Footer from './Footer';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import Posts from './Posts';
import {usePostContext} from '../context/PostContext';
import {Alert} from 'react-native';

const UploadPost = () => {
  const navigation = useNavigation();

  const [selectImg, setSelectImg] = useState('');
  const [caption, setCaption] = useState('');
  const [showImageOptions, setShowImageOptions] = useState(false);

  const toggleImageOptions = () => {
    setShowImageOptions(!showImageOptions);
  };

  const {addPost} = usePostContext();

  const pickImg = async (fromCamera: string) => {
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
  };

  const handleImageSelection = response => {
    if (response.assets && response.assets.length > 0) {
      setSelectImg(response.assets[0].uri);
    }
  };

  // const handleSubmit = () => {
  //         navigation.navigate('Posts', {caption});
  // }
  const handleImage = () => {
  
    if (caption && selectImg) {
      const newPost = {
        id: Date.now(), 
        name: 'Ian Mathews',
        imgSrc: [selectImg],
        Likes: 0,
        caption: caption,
      };
      addPost(newPost);
      navigation.goBack(); 
    } else {
    
      Alert.alert('Please select an image and add a caption');
    }
  };
  return (
    <>
      <View p={10}>
        <FormControl size="md">
          <FormControlLabel mb="$1" mt={10}>
            <FormControlLabelText>Caption</FormControlLabelText>
          </FormControlLabel>
          <Input borderRadius={10}>
            <InputField
              type="text"
              placeholder="Caption"
              onChangeText={setCaption}
            />
          </Input>
        </FormControl>
        {selectImg ? (
          <View mt={10}>
            <Image source={{uri: selectImg}} alt="profile" />
          </View>
        ) : null}
        <TouchableOpacity onPress={toggleImageOptions}>
          <Text color="$blue600">Choose Image</Text>
        </TouchableOpacity>
        {showImageOptions && (
          <View
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <TouchableOpacity
              onPress={() => pickImg(true)}
              style={{
                backgroundColor: '#3d85eb',
                marginBottom: 10,
                padding: 6,
                borderRadius: 5,
              }}>
              <Text color="white">Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pickImg(false)}
              style={{backgroundColor: '#3d85eb', padding: 6, borderRadius: 5}}>
              <Text color="white">Choose from Library</Text>
            </TouchableOpacity>
          </View>
        )}
        <FormControl marginTop={20}>
          <Button bg="$darkBlue600" onPress={handleImage}>
            <ButtonText fontSize="$sm" fontWeight="$medium">
              Submit
            </ButtonText>
          </Button>
        </FormControl>
      </View>

      <Footer></Footer>
    </>
  );
};

export default UploadPost;
