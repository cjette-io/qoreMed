import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Button, Menu, Divider, Provider } from 'react-native-paper';
// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';


//Dummy Database

import { AppointmentPerClinicDB } from '../dummyData/db'

// dummy picture
import Avatar from '../assets/images/icon_man.png'

// Url Based
import URL from '../api'

const AppointmentPerClinic = ({ navigation, route }) => {

    const {clinic_id, clinic_name} = route.params

    const [inOutVisibility, setinOutVisibility] = useState(false)
    const [clickDots, setClickDots] = React.useState(null)
    const [visible, setVisible] = React.useState(false);
    const [apcDB, setapcDB] = useState([])

    const [queues ,setqueues] = useState([])
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [people_waiting, setpeople_waiting] = useState('')

    const [token, setToken] = useState('')
    // //ini firstLoad
    useEffect( async() => {
        let token;
        token = await AsyncStorage.getItem('userToken');
        setToken(token)
        fetch(URL + 'api/v1/clinics/' + clinic_id + '/appointments/today', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {

               // console.log(JSON.stringify(json[0].queues))
                setqueues(json[0].queues)
                setStartTime(json[0].formatted_start_time)
                setEndTime(json[0].formatted_end_time)
                setpeople_waiting(json[0].people_waiting)

                // if (json.length > 0) {
                //     Appointment.push(
                //         {
                //         branch_external_id : json[0].branch_external_id,
                //         people_waiting : json[0].people_waiting,
                //         }
                //     )
                // }

            })
    }, [])



    const btnIn = () => {

        
        fetch(URL + 'api/v1/clinics/' + clinic_id + '/start-serving', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {

                console.log(JSON.stringify(json))
                if ('message' in json) {
                    alert(json.message)
                   }
                setinOutVisibility(true)

            })

    }
    const btnOut = () => {
        
        fetch(URL + 'api/v1/clinics/' + clinic_id + '/end-serving', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {

                console.log(JSON.stringify(json))
                if ('message' in json) {
                   alert(json.message)
                  }
                setinOutVisibility(false)

            })

    }

    const btnNextQue = () => {

        fetch(URL + 'api/v1/clinics/' + clinic_id + '/next-queue', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {

                console.log(JSON.stringify(json))
                if ('message' in json) {
                    alert(json.message)
                   }
               

            })

    }

    const openMenu = (i) => {

        setClickDots(i)
        console.log(i)
    };

    const closeMenu = () => {
       
        setClickDots(!clickDots)
    };



    return (
      <>
        
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>{clinic_name}</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>
            <ScrollView
            contentContainerStyle={{paddingBottom:100}}
            vertical
            showsVerticalScrollIndicator={false}
             style={styles.container}>

                <View style={{ alignItems: 'center',flexDirection:'row', justifyContent: 'flex-end' }}>
                    {inOutVisibility == false ? (
                        <>
                       
                        <TouchableOpacity onPress={() => btnIn()} style={{ padding: 10, alignItems: 'center' }}>
                            <Octicons color='#008FFB' name="sign-in" size={30}></Octicons>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Doctor Is in</Text>
                        </TouchableOpacity>
                        </>
                    ) : (
                        <>
                        <TouchableOpacity onPress={() => btnNextQue()} style={{ padding: 10, alignItems: 'center' }}>
                            <AntDesign color='black' name="user" size={30}></AntDesign>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Next Queue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => btnOut()} style={{ padding: 10, alignItems: 'center' }}>
                            <Octicons color='#008FFB' name="sign-in" size={30}></Octicons>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Doctor Is Out</Text>
                        </TouchableOpacity>
                        </>
                    )}

                </View>

                {/* mapping kang time muna */}

                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{ padding: 5, fontWeight: 'bold', fontFamily: 'NunitoSans-Bold', fontSize: 16, color: '#999', }}>{startTime} - {endTime}</Text>
                        <Text style={{ backgroundColor:'#e91e63' , fontWeight: 'bold', fontFamily: 'NunitoSans-Bold', fontSize: 16, color: 'white',padding:4, borderRadius:5 }}>{people_waiting} Waiting</Text>
                    </View>

                        {queues.map((item,i) => {
                            return (
                            <>
                            <View style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%',   height: 100, marginVertical:5 }}>
                        <View style={{marginBottom:5, flexDirection: 'row',justifyContent: 'space-between'}}>
                            <Text style={{padding:5, fontWeight:'bold',fontSize:14}}>{item.queue_no}.</Text>
                            <Text style={{padding:5, backgroundColor: item.status == 'pending' ? 'gray' : item.status == 'confirmed' ? '#ffa726'  : item.status == 'arrived' ? 'orange' : item.status == 'serving' ? '#29b6f6' : item.status == 'completed' ? 'green' : 'red', borderRadius:5,color:'white'}}>{item.status}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                           
                           
                           
                            <View style={{ flexDirection: 'row', flex: 1, }}>

                                <View style={{ justifyContent: 'center' }}>
                                    <Image source={Avatar} style={{ width: 40, height: 40 }}></Image>
                                </View>

                                <TouchableOpacity onPress={() => navigation.navigate('PatientProfile',item.reference_external_id)} style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>{item.name}</Text>
                                    <Text style={{ fontFamily: 'NunitoSans-Light', fontSize: 12, color: '#999', }}>Reason: {item.transaction_type}</Text>
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
                  
                            </>
                    
                            )
                        })}

                   







                </View>








            </ScrollView>
   
      </>
    )
}

export default AppointmentPerClinic

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,

    }
})


