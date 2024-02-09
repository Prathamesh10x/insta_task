import { View, Text, Input, InputField, Image } from '@gluestack-ui/themed'
import React from 'react'
import Evilicon from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native'



const Header = () => {
  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      height={50}
      padding={10}>
      <View>
        {/* <Text fontSize={24} color='black'>Instagram</Text> */}
        <Image
          source={require('../assets/instaLogo.png')}
          alt="insta-logo"
          height={30}
          width={110}
        />
      </View>
      <View flexDirection="row" >
        <TouchableOpacity style={{marginRight:8}}>
          <Evilicon name="heart" size={38} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="message-circle" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header