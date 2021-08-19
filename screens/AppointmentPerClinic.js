import React, { useState, useEffect } from 'react'
import {RefreshControl, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Button, Menu, Divider, Provider } from 'react-native-paper';
// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';


// dummy picture
import Avatar from '../assets/images/icon_man.png'
// Url Based
import URL from '../api'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const AppointmentPerClinic = ({ route, navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      loadAppointmentQueue()
      wait(2000).then(() => setRefreshing(false));
    }, []);
    const { clinic_id, clinic_name } = route.params
    const [inOutVisibility, setinOutVisibility] = useState(false)

    const [clickDots, setClickDots] = React.useState(null)


    const [token, setToken] = useState('')
    const [appointmentData, setappointmentData] = useState([])

    useEffect(() => {
        loadAppointmentQueue()
           }, [])

    async function loadAppointmentQueue() {
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
                // setqueues(json[0].queues)
                // setStartTime(json[0].formatted_start_time)
                // setEndTime(json[0].formatted_end_time)
                // setpeople_waiting(json[0].people_waiting)


                let Appointment = []
                json.map((item, i) => {
                    Appointment.push(
                        {
                            id: item.id,
                            people_waiting: item.people_waiting,
                            time: item.formatted_start_time + ' - ' + item.formatted_end_time,
                            is_virtual: item.is_virtual == false ? '(On-Site Consultation)' : '(Virtual Consultation)',
                            queues: item.queues
                        }
                    )
                })



                setappointmentData(Appointment)

                // console.log(JSON.stringify(Appointment))

                // if (json.length > 0) {
                //     Appointment.push(
                //         {
                //         branch_external_id : json[0].branch_external_id,
                //         people_waiting : json[0].people_waiting,
                //         }
                //     )
                // }

            })
    }




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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>{clinic_name}</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                vertical
                showsVerticalScrollIndicator={false}
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                >

                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
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

                <View>
                    {appointmentData.map((event, i) => {
                        return (
                            <View key={i + '-' + event.id}>
                             <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
                                    <Text style={{ padding: 5, fontWeight: 'bold', fontFamily: 'NunitoSans-Bold', fontSize: 13, color: '#999', }}>{event.time} - {event.is_virtual}</Text>
                                    <Text style={{ backgroundColor: '#e91e63', fontWeight: 'bold', fontFamily: 'NunitoSans-Bold', fontSize: 13, color: 'white', padding: 4, borderRadius: 5 }}>{event.people_waiting} Waiting</Text>
                                </View>


                                {event.queues.map((item,i) => {
                            return (
                            <>
                            <View key={i} style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%',   height: 100, marginVertical:5 }}>
                        <View style={{marginBottom:5, flexDirection: 'row',justifyContent: 'space-between'}}>
                            <Text style={{padding:5, fontWeight:'bold',fontSize:14}}>{item.queue_no}.</Text>
                            <Text style={{padding:5, backgroundColor: item.status == 'pending' ? 'gray' : item.status == 'confirmed' ? '#ffa726'  : item.status == 'arrived' ? '#ff7043' : item.status == 'serving' ? '#29b6f6' : item.status == 'completed' ? 'green' : 'red', borderRadius:5,color:'white'}}>{item.status}</Text>
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
                              visible={clickDots == item.id ? true : false}
                                onDismiss={closeMenu}
                                anchor={<TouchableOpacity onPress={() => openMenu(item.id)}><IconMCI name="dots-vertical" size={20}></IconMCI></TouchableOpacity>}>

                                {item.status == 'pending' ? (
                                    <>
                                    <Menu.Item onPress={() => { }} title="Confirm" />
                                    <Menu.Item onPress={() => { }} title="Cancel" />    
                                    </>
                                     ) : 
                                    item.status == 'confirmed' ? (
                                        <>
                                        <Menu.Item onPress={() => { }} title="Check In" />
                                        <Menu.Item onPress={() => { }} title="Cancel" />    
                                        </>
                                    )

                                    :
                                    item.status == 'arrived' ? (
                                        <>
                                        <Menu.Item onPress={() => { }} title="Serve" />
                                        <Menu.Item onPress={() => { }} title="Cancel" />    
                                        </>
                                    )
                                    :

                                    item.status == 'serving' ? (
                                        <>
                                        <Menu.Item onPress={() => { }} title="Finish" />
                                        <Menu.Item onPress={() => { }} title="Skip" />
                                        <Menu.Item onPress={() => { }} title="Cancel" />    
                                        </>
                                    )
                                    :
                                    (null)
                                }

                                

                            </Menu>
                               
                            </View>
                        </View>
                        
                    </View>
                  
                            </>
                    
                            )
                        })}


                            </View>
                        )
                    })}

                </View>






            </ScrollView>
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