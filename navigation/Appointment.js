import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import {
    Calendar
} from '../screens'

const Appointment = createStackNavigator();
const AppointmentContentScreen = () => (
    <Appointment.Navigator
    screenOptions={{
      headerShown: false
    }}
   
  >
  
    <Appointment.Screen name="Calendar" component={Calendar} />
    {/* <MainStack.Screen name="HomeScreen" component={HomeScreen} /> */}
  
  
  </Appointment.Navigator>
)
export default AppointmentContentScreen

const styles = StyleSheet.create({})


