import {GluestackUIProvider, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import { SafeAreaView } from 'react-native';
import Login from './src/screens/Login';
import { Suspense } from 'react';
import StackNavigation from './src/navigator/StackNavigation';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Suspense>
        <SafeAreaView style={{flex: 1}}>
         
            <StackNavigation />
       
        </SafeAreaView>
      </Suspense>
    </GluestackUIProvider>
  );
}
