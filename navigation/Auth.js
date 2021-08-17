import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import {LoginScreen, RegisterScreen} from '../screens'

const AuthStack = createStackNavigator();
const Auth = () => (
    <AuthStack.Navigator
    screenOptions={{
      headerShown: false
    }}
   
  >
  
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
  
  
  </AuthStack.Navigator>
)
export default Auth

const styles = StyleSheet.create({})


