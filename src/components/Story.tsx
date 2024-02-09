import {View, Text, Image, Input, InputField} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {Users} from '../utils/Users';

const Story = ({route}: any) => {
  const {item, index} = route.params;

  const [current, setCurrent] = useState(index);
  const [content, setContent] = useState(Users);

 
  

  
  const [load, setLoad] = useState(false);

  const {height, width} = Dimensions.get('window');

  const navigation = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.goBack();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigation, current]);

  const progress = useRef(new Animated.Value(0)).current;
  const start = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration:  5000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        next();
      }
    });
  };

  const resetProgress = () => {
    progress.setValue(0);
  };

  const next = () => {
    if (current !== content.length - 1) {
      let tempdata = [...content];
      tempdata[current].finish = 1;
      setContent(tempdata);
      setCurrent(current + 1);
      resetProgress();
      //   progress.setValue(0);
      setLoad(false);
      start();
    } else {
      close();
    }
  };
  const prev = () => {
    if (current - 1 >= 0) {
      let tempdata = [...content];
      tempdata[current].finish = 0;
      setContent(tempdata);
      resetProgress();
      setCurrent(current - 1);
      setLoad(false);
    } else {
      close();
    }
  };

  const close = () => {
    // resetProgress();
    setLoad(false);
  };

  const handleLongPress = () => {
    // (progress as Animated.Value).stopAnimation(value => {
    //   setLastProgress(value); 
    // });
  };

  return (
    <View flex={1} backgroundColor="#1a1c1b" padding={10}>
      <View position="absolute" top={3} flexDirection="row">
        <View flex={1} flexDirection="row" height={3}>
          <Animated.View
            style={{
              flex: progress,
              height: 3,

              backgroundColor: 'rgba(255,255,255,1)',
            }}></Animated.View>
        </View>
      </View>
      <View flexDirection="row" alignItems="center">
        <Image
          source={content[current].imgSrc}
          alt={content[current].name}
          height={40}
          width={40}
          borderRadius={50}
          marginRight={10}
        />
        <Text color="white">{Users[current].name}</Text>
      </View>
      <View>
        <View maxHeight={400} marginTop={40}>
          <Image
            source={content[current].imgSrc}
            onLoadEnd={() => {
              resetProgress();
              start();
            }}
            alt={content[current].name}
            borderRadius={5}
            marginRight={10}
            w={'$full'}
            h={'$full'}
          />
        </View>
        <View
          width={width}
          height={height}
          // backgroundColor="white"
          position="absolute"
          top={0}
          flexDirection="row"
          justifyContent="space-between">
          <TouchableOpacity
            style={{width: '50%', height: '100%'}}
            onPress={() => {
              prev();
            }}
            // onLongPress={() => {
            //   handleLongPress();
            // }}
            // onPressOut={() => {
            //   start();
            // }}
            >
            <View></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '50%', height: '100%'}}
            onPress={() => {
              next();
            }}
            // onLongPress={() => {
            //   handleLongPress();
            // }}
            // onPressOut={() => {
            //   start();
            // }}
            >
            <View></View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        flexDirection="row"
        alignItems="center"
        position="absolute"
        bottom={10}
        left={10}
        right={10}>
        <Input
          variant="outline"
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          marginBottom={10}
          borderRadius={20}
          flex={1}>
          <InputField placeholder="Send Message" lineHeight={20} />
        </Input>
        <View marginLeft={10}>
          <Feather name="send" color="white" size={28} />
        </View>
      </View>
    </View>
  );
};

export default Story;
