import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import {
    HomeScreen,
    AppointmentPerClinic,
    PatientProfile,
    HistoryList,
    Medications,
    Vaccination,
    Procedures
} from '../screens'

const MainStack = createStackNavigator();
const MainContentScreen = () => (
    <MainStack.Navigator
    screenOptions={{
      headerShown: false
    }}
   
  >
  
    <MainStack.Screen name="HomeScreen" component={HomeScreen} />
    <MainStack.Screen name="AppointmentPerClinic" component={AppointmentPerClinic} />
    <MainStack.Screen name="PatientProfile" component={PatientProfile} />
    <MainStack.Screen name="HistoryList" component={HistoryList} />
    <MainStack.Screen name="Medications" component={Medications} />
    <MainStack.Screen name="Vaccination" component={Vaccination} />
    <MainStack.Screen name="Procedures" component={Procedures} />
    

    
    {/* <MainStack.Screen name="HomeScreen" component={HomeScreen} /> */}
  
  
  </MainStack.Navigator>
)
export default MainContentScreen

const styles = StyleSheet.create({})


