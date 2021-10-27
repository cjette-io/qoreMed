import React from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity
} from 'react-native'

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import Svg, { Path } from 'react-native-svg';
import { isIphoneX } from 'react-native-iphone-x-helper';

//Stack Screen Collection
import MainContentScreen from "./Main"
import AppointmentContentScreen from "./Appointment"
import PatientsContentScreen from "./Patients"
import ClinicContentScreen from './Clinic'

// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import IconAnt from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: 'white' }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill="white"
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: 'white' }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -16,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: 'white'
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: 'white'
                }}
                activeOpacity={9}
                onPress={onPress}
            >
            
                {children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: 'white'
                    }}
                ></View>
                <BottomTabBar
                    {...props.props}
                />
            </View>
        )
    } else {
        return (
            <BottomTabBar
                {...props.props}
            />
        )
    }

}

const BottomTab = () => (


    <Tab.Navigator
        tabBarOptions={{
            //  allowFontScaling: false,
  keyboardHidesTabBar: true,
            showLabel: false,
            style: {
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
                borderTopWidth: 0,
                backgroundColor: "transparent",
                elevation: 0
            }
        }}
        tabBar={(props) => (
            <CustomTabBar
                props={props}
            />
        )}
    >
        <Tab.Screen name='Home' component={MainContentScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <IconAnt
                        name="home"
                        size={20}
                        style={{
                            color: focused ? '#EB1D27' : 'gray'
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarCustomButton
                        {...props}
                    />
                )
            }}
        />

<Tab.Screen name='Patients' component={PatientsContentScreen}
         
         options={{
            
            tabBarIcon: ({ focused }) => (
                 <Fontisto
                     name="doctor"
                     size={20}
                     style={{
                         color: focused ? '#EB1D27' : 'gray'
                     }}
                 />
             ),
             tabBarButton: (props) => (
                 <TabBarCustomButton
                     {...props}
                 />
             )
         }}
     />



          <Tab.Screen name='Appointment' component={AppointmentContentScreen}
         
            options={{
               
               tabBarIcon: ({ focused }) => (
                    <IconAnt
                        name="calendar"
                        size={20}
                        style={{
                            color: focused ? '#EB1D27' : 'gray'
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <TabBarCustomButton
                        {...props}
                    />
                )
            }}
        />

        
<Tab.Screen name='Clinic' component={ClinicContentScreen}
         
         options={{
            
            tabBarIcon: ({ focused }) => (
                 <FontAwesome5
                     name="clinic-medical"
                     size={20}
                     style={{
                         color: focused ? '#EB1D27' : 'gray'
                     }}
                 />
             ),
             tabBarButton: (props) => (
                 <TabBarCustomButton
                     {...props}
                 />
             )
         }}
     />


    </Tab.Navigator>


)


export default BottomTab
