import { View, Text, Image } from '@gluestack-ui/themed'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'


import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
const Footer = () => {
    const navigation = useNavigation();
  return (
    <View position="absolute" bottom={0} left={0} backgroundColor="black">
      <View
        flexDirection="row"
        justifyContent="space-between"
        width={'$full'}
        padding={10}>
        <TouchableOpacity>
          <Entypo
            name="home"
            color="white"
            size={30}
            onPress={() => navigation.navigate('Home')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather
            name="plus-square"
            color="white"
            size={30}
            onPress={() => navigation.navigate('UploadPost')}
          />
        </TouchableOpacity>
        <TouchableOpacity >
          
          <Icon
            name="user"
            color="white"
            size={35}
            onPress={() => navigation.navigate('Profile')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Footer