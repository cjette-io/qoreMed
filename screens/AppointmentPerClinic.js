import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'

import { Button, Menu, Divider, Provider } from 'react-native-paper';
// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';


//Dummy Database

import { AppointmentPerClinicDB } from '../dummyData/db'

// dummy picture
import Avatar from '../assets/images/icon_man.png'

const AppointmentPerClinic = ({ navigation }) => {

    const [inOutVisibility, setinOutVisibility] = useState(false)
    const [clickDots, setClickDots] = React.useState(null)
    const [visible, setVisible] = React.useState(false);
    const [apcDB, setapcDB] = useState([])

    // //ini firstLoad
    useEffect(() => {

    }, [])



    const btnInOut = () => {
        setinOutVisibility(!inOutVisibility)

    }

    const openMenu = (i) => {

        setClickDots(i)
        console.log(i)
    };

    const closeMenu = () => {
       
        setClickDots(!clickDots)
    };



    return (
        <Provider>
        
            <SafeAreaView
                style={{ padding: 10, backgroundColor: 'white' }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IconION name="arrow-back" size={20} color='black' />
                        </TouchableOpacity>

                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Angat Medical Clinic</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>
            <View style={styles.container}>

                <View style={{ alignItems: 'flex-end' }}>
                    {!inOutVisibility ? (
                        <TouchableOpacity onPress={() => btnInOut()} style={{ padding: 10, alignItems: 'center' }}>
                            <Octicons color='#008FFB' name="sign-in" size={30}></Octicons>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Doctor Is in</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => btnInOut()} style={{ padding: 10, alignItems: 'center' }}>
                            <Octicons color='red' name="sign-out" size={30}></Octicons>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Doctor Is out</Text>
                        </TouchableOpacity>
                    )}

                </View>

                {/* mapping kang time muna */}

                <View>
                    <View>
                        <Text style={{ padding: 5, fontWeight: 'bold', fontFamily: 'NunitoSans-Bold', fontSize: 16, color: '#999', }}>8:00 am - 12:00 pm</Text>
                    </View>


                    <View style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%',   height: 100 }}>
                        <View style={{marginBottom:5, flexDirection: 'row',justifyContent: 'space-between'}}>
                            <Text style={{padding:5, fontWeight:'bold',fontSize:14}}>1.</Text>
                            <Text style={{padding:5, backgroundColor:'gray', borderRadius:5,color:'white'}}>Pending</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                           
                           
                           
                            <View style={{ flexDirection: 'row', flex: 1, }}>

                                <View style={{ justifyContent: 'center' }}>
                                    <Image source={Avatar} style={{ width: 40, height: 40 }}></Image>
                                </View>

                                <TouchableOpacity onPress={() => navigation.navigate('PatientProfile')} style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Jennifer Aniston</Text>
                                    <Text style={{ fontFamily: 'NunitoSans-Light', fontSize: 12, color: '#999', }}>Reason: Second Opinion</Text>
                                </TouchableOpacity>

                            </View>
                            <View>

                            <Menu
                              visible={clickDots == 1 ? true : false}
                                onDismiss={closeMenu}
                                anchor={<TouchableOpacity onPress={() => openMenu(1)}><IconMCI name="dots-vertical" size={20}></IconMCI></TouchableOpacity>}>
                                <Menu.Item onPress={() => { }} title="Confirm" />
                                <Menu.Item onPress={() => { }} title="Cancel" />

                            </Menu>
                               
                            </View>
                        </View>
                    </View>







                </View>








            </View>
   
        </Provider>
    )
}

export default AppointmentPerClinic

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,

    }
})


