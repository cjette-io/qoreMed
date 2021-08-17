import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import {
    ClinicList,
    ClinicDetails,
    ClinicAdd,
    ClinicAddNew,
    ClinicAddSchedule,
    ClinicEditSchedule
} from '../screens'

import TopNav from './TopNav'

const Clinic = createStackNavigator();
const ClinicContentScreen = () => (
    <Clinic.Navigator
    screenOptions={{
      headerShown: false
    }}
   
  >
  
    <Clinic.Screen name="ClinicList" component={ClinicList} />
    <Clinic.Screen name="ClinicAddNew" component={ClinicAddNew} />
    <Clinic.Screen name="ClinicDetails" component={ClinicDetails} />
    <Clinic.Screen  options={{
      title: "EDIT CLINIC DETAILS",
      headerShown: true,
      headerTitleStyle: {
      fontSize: 14,
      
    },
    }} name="ClinicEdit" component={TopNav} />

<Clinic.Screen name="ClinicAddSchedule" component={ClinicAddSchedule} />
<Clinic.Screen name="ClinicEditSchedule" component={ClinicEditSchedule} />




    
  {/* <MainStack.Screen name="HomeScreen" component={HomeScreen} /> */}
  
  
  </Clinic.Navigator>
)
export default ClinicContentScreen

const styles = StyleSheet.create({})


