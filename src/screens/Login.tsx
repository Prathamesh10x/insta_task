import {View, Text, Input, InputField, AddIcon, Button, ButtonText, Image} from '@gluestack-ui/themed';
import React,{useState} from 'react';
import {TouchableOpacity} from 'react-native';

import Home from './Home';


const Login = ({navigation}: any) => {
  
  const [username, setUsername] = useState('');
  const [errormsg, setErrorMsg] = useState('');
  const allowedUsernames = ['user1', 'user2', 'user3', 'user4', 'user5'];

  const handleLogin = () => {
    if (allowedUsernames.includes(username)) {
    
      navigation.navigate('Home');
      setUsername('');
    } else {
    
      setErrorMsg('Invalid Username')
    }
  }

  return (
    <View padding={10} flex={1} justifyContent="center" backgroundColor="white">
      <View alignItems='center'>
        <Image
          source={require('../assets/instaLogo.png')}
          alt="insta-logo"
          height={50}
          width={150}
        />
      </View>
      <View>
        <Input
          variant="outline"
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          marginBottom={10}>
          <InputField
            placeholder=" Username"
            borderRadius={7}
            lineHeight={20}
            autoCapitalize={'none'}
            onChangeText={text => {
              setUsername(text);
              setErrorMsg('');
            }}
          />
        </Input>
        {errormsg ? <Text>{errormsg}</Text> : null}
        <TouchableOpacity style={{backgroundColor: '#3483eb', borderRadius: 7}}>
          <Button onPress={handleLogin}>
            <ButtonText>Log In</ButtonText>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
