import { View, Text ,Image } from '@gluestack-ui/themed'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
const YourStory = () => {
  return (
    <View flexDirection="column" alignItems="center">
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 50,
          marginRight: 10,
          padding: 3,
        }}
        // onPress={() =>
        //   navigation.navigate('Story', {
        //     item,
        //     index: data.indexOf(item),
        //   })
        // }
      >
        <Image
          source={require('../assets/Ian.jpg')}
          alt={'Ian'}
          height={70}
          width={70}
          borderRadius={50}
          position="relative"
        />
      </TouchableOpacity>
      <View position="absolute" bottom={30} right={10} >
        <AntDesign
          name="pluscircle"
          color="#2b72e3"
        //   backgroundColor="white"
          size={20}
        />
      </View>
      <Text>Your story</Text>
    </View>
  );
}

export default YourStory