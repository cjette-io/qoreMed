import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, MainContentScreen,BottomTab } from './navigation'
import { AuthContext } from './context';
import Loader from './assets/images/preloader.gif'

const App = () => {

  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };

      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };


    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signInSocialAuth: async (DoctorData) => {

      const userToken = String(DoctorData[0].token);
      const data = DoctorData[0].data;
      const socialType = DoctorData[0].socialAuth;

      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userData', data);
        await AsyncStorage.setItem('LoginType', socialType);
      } catch (e) {
        console.log(e);
      }
       console.log('DATA: ', data);
       console.log('LoginType: ', socialType);
      dispatch({ type: 'LOGIN', token: userToken });
    },

    signInManualAuth : async (DoctorManualData) => {
      const userToken = String(DoctorManualData[0].token);
      const loginType = DoctorManualData[0].loginType;
     
      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('LoginType', loginType);
      
      } catch (e) {
        console.log(e);
      }
      console.log(userToken)
      dispatch({ type: 'LOGIN', token: userToken });

    }



  }), []);

  useEffect(() => {

    setTimeout(async () => {

      let token;

      try {
        token = await AsyncStorage.getItem('userToken');

      } catch (e) {
        console.log(e);
      }
      console.log('TOKEN: ', token);

      dispatch({ type: 'RETRIEVE_TOKEN', token: token });


    }, 500);



  }, []);

  if (loginState.isLoading) {
    return (
      <View
      style={{
          ...StyleSheet.absoluteFill,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "white"
      }}
  >
      <Image source={Loader}
          style={{
              width: 300,
              height: 300
          }}
      ></Image>
  </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken == null ?  Auth() : BottomTab()}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App
