import React, {useEffect} from 'react';
import {Image, View} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from '@gluestack-ui/themed';
import Header from './Header';
import YourStory from './YourStory';
const data = [
//   {id: 0, name: 'Your Story', imgSrc: require('../assets/Ian.jpg'), finish: 0},
  {id: 1, name: 'Tim', imgSrc: require('../assets/Tim.jpg'), finish: 0},
  {id: 2, name: 'Annie', imgSrc: require('../assets/Annie.jpg'), finish: 0},
  {id: 3, name: 'Ian', imgSrc: require('../assets/Ian.jpg'), finish: 0},
  {id: 4, name: 'Marshal', imgSrc: require('../assets/Marshal.jpg'), finish: 0},
  {id: 5, name: 'Toa', imgSrc: require('../assets/Toa.jpg'), finish: 0},
  {id: 6, name: 'Tom', imgSrc: require('../assets/Tom.jpg'), finish: 0},
];

const Stories = () => {
  const navigation = useNavigation();

  return (
    <>
    <Header></Header>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        paddingLeft={10}>
        <View flexDirection="row">
            <YourStory />
          {data.map((item, index) => (
            <View key={index} flexDirection="column" alignItems="center">
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 50,
                  marginRight: 10,
                  padding: 3,
                }}
                onPress={() =>
                  navigation.navigate('Story', {
                    item,
                    index: data.indexOf(item),
                  })
                }>
                <Image
                  source={item.imgSrc}
                  alt={item.name}
                  height={70}
                  width={70}
                  borderRadius={50}
                />
              </TouchableOpacity>
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Stories;
