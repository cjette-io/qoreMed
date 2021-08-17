import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ClinicInformation, ClinicAddress,ClinicContactPerson, ClinicHIC } from '../screens/ClinicTabs';

const Tab = createMaterialTopTabNavigator();

const TopNav = ({route, navigation}) => {

  const {id} = route.params

 
    return (
        <View style={{flex: 1}}>
        
        <Tab.Navigator
         tabBarOptions={{
            labelStyle: { fontSize: 12 },
        //  tabStyle: { width: 100 },

        allowFontScaling: true,
        keyboardHidesTabBar: false,
       
        
         }}
        >
        <Tab.Screen name="CLINIC INFO"
         children={()=><ClinicInformation id={id}/>} />
        
        <Tab.Screen name="ADDRESS" 
          children={()=><ClinicAddress id={id}/>} />
        
     
        <Tab.Screen
         name="CONTACT PERSON"
         children={()=><ClinicContactPerson id={id}/>}
        
         />
        <Tab.Screen name="HCI INFO"
        children={()=><ClinicHIC id={id}/>}
     />
        
      </Tab.Navigator>

     
      </View>
    )
}

export default TopNav

const styles = StyleSheet.create({})
