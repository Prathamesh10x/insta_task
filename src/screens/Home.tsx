
import React from 'react'
import Header from '../components/Header'
import Stories from '../components/Stories'
import Posts from '../components/Posts'
import { ScrollView } from '@gluestack-ui/themed'
import Footer from '../components/Footer'


const Home = () => {

  // const navigation = useNavigation();

  return (
    <>
      {/* <ScrollView showsVerticalScrollIndicator={false} backgroundColor="white"> */}
      {/* <Header /> */}
      {/* <Stories /> */}
      
      <Posts  />
      {/* </ScrollView> */}
      <Footer />
    </>
  );
}

export default Home