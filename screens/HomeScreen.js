import React, { useState, useEffect } from 'react'
import { Alert, ActivityIndicator, RefreshControl, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import Ant from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IconMCI from 'react-native-vector-icons/MaterialIcons';

import { Appointment, NoticeBoard } from './components/Home';

import Covid from '../assets/images/covid.jpg'
import logo from '../assets/images/doctoricon.png'
import Hospital from '../assets/images/clinic.png'
import LogoQoreMed from '../assets/images/ayos_doc.png'

// Url Based
import URL from '../api'

import { AuthContext } from '../context';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const HomeScreen = ({ navigation }) => {

    const { LogoutMe } = React.useContext(AuthContext);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadClinicSchedule()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [userFName, setuserFName] = useState('');
    const [userPhoto, setUserPhoto] = useState('')


    const [clinicList, setClinicList] = useState([])
    const [appointmentToday, setappointmentToday] = useState([])

    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(async () => {

            let type;

            try {
                type = await AsyncStorage.getItem('LoginType');

            } catch (e) {
                console.log(e);
            }
            // console.log('Type: ', type);

            if (type == 'Facebook') {
                let data;
                data = await AsyncStorage.getItem('userData');

                const storeData = JSON.parse(data)

                console.log(storeData.picture.data.url)
                setuserFName(storeData.name)
                setUserPhoto(storeData.picture.data.url)
            } else if (type == 'Gmail') {
                let data;
                data = await AsyncStorage.getItem('userData');
                const storeData = JSON.parse(data)
                console.log(storeData.user.photo)
                setuserFName(storeData.user.name)
                setUserPhoto(storeData.user.photo)

            } else if (type == 'manual') {

                // alert('Manual')

                let token;
                token = await AsyncStorage.getItem('userToken');

                fetch(URL + 'api/v1/user', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                })
                    .then((response) => response.json())
                    .then((json) => {
                        //console.log(json.userable.profile.title)

                        setuserFName(json.first_name + ' ' + json.last_name),
                            console.log((json.first_name + ' ' + json.last_name))
                        setUserPhoto(json.photo_url)

                    })
                    .catch((error) => {

                        console.log(error);

                    });

            }


        }, 500);
    }, [])

    useEffect(() => {
        loadClinicSchedule()

    }, [])

    async function loadClinicSchedule() {
        let token;
        token = await AsyncStorage.getItem('userToken');

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        const todays_appointment = fetch(URL + 'api/v1/clinics/appointments/all/' + date, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.json());
            })
            .catch(error => {
                console.error({ error });

            });


        todays_appointment.then(appointments => {

            // console.log(appointments);
            setClinicList(appointments);
            setLoading(false)


        })





    }


    const display = () => {
        console.log(JSON.stringify(appointmentToday))
    }


    const logout = () => {
        Alert.alert(
            "Log Out?",
            "Are you sure you want to log out?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => LogoutMe() }
            ]
        );
    }



    return (
        <>
            <SafeAreaView
                style={{ padding: 10, backgroundColor: 'white' }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* <TouchableOpacity>
                        <IconMCI name="notes" size={25} color='black' />
                    </TouchableOpacity> */}

                    <View>

                    </View>

                    <View>
                        <Image source={LogoQoreMed} style={{ height: 40, width: 135 }}></Image>
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity onPress={() => display()}>
                            <EvilIcons name="bell" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginHorizontal: 5 }}
                            onPress={() => logout()}>
                            <Ant name="logout" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 40 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    vertical
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                        <View>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 20 }}>Hello {userFName},</Text>
                            <Text style={{ fontFamily: 'NunitoSans-Light', color: '#999', }}>How are you today?</Text>
                        </View>
                        <View>
                            <Image source={{ uri: !userPhoto ? null : userPhoto }} style={{ width: 40, height: 40, borderRadius: 10 }}></Image>
                        </View>
                    </View>

                    {/* Todays appointment */}

                    <View style={{ padding: 20 }}>
                        <View >
                            <Text style={{ fontFamily: 'NunitoSans-Light', color: '#999', fontSize: 18 }}>Todays Appointment</Text>
                        </View>

                        {isLoading === true ? <View>
                            <ActivityIndicator size="large" color="#008FFB" />
                        </View> : null}

                        {clinicList.length < 1 ? (null) : (
                            <View>
                                {clinicList.map((item, i) => {

                                    const ClinicID = item.clinic_id

                                    return (
                                        <View key={i}>
                                            {item.waiting > 0 && (<TouchableOpacity
                                                onPress={() => navigation.navigate('AppointmentPerClinic', {
                                                    clinic_id: ClinicID,
                                                    clinic_name: item.clinic_name
                                                })}
                                                style={{
                                                    borderLeftWidth: 4,
                                                    borderColor: '#080123',
                                                    padding: 10,
                                                    backgroundColor: 'white',
                                                    borderRadius: 5,
                                                    elevation: 5,
                                                    width: '100%',
                                                    marginTop: 10,
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                                        <Image source={Hospital} style={{ width: 45, height: 45, }}></Image>
                                                        <View style={{ marginLeft: 5, flex: 1, paddingRight: 20 }}>
                                                            <Text numberOfLines={1} style={{ fontFamily: 'NunitoSans-Bold', fontSize: 18 }}>{item.clinic_name}</Text>
                                                            {/* <Text numberOfLines={2} style={{ fontSize: 14, fontFamily: 'NunitoSans-Light', color: '#999', }}>{item.clinic_address}</Text> */}

                                                        </View>

                                                        <View key={i} style={{ backgroundColor: 'rgba(240,86,34,0.7)', borderRadius: 5 }}>
                                                            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 18, padding: 5, borderRadius: 5, color: 'white' }}> {item.waiting} </Text>

                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>)}
                                        </View>


                                    )
                                })}
                            </View>
                        )}

                    </View>




                    {/* NoticeBoard */}

                    <View style={{}}>
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Light', color: '#999', fontSize: 18 }}>Notice Board</Text>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingRight: 20 }}
                        >
                            <View style={{ marginLeft: 8, justifyContent: 'center', }}>

                                <View style={{ height: 200, width: 150, borderRadius: 15, backgroundColor: 'white', flexDirection: 'column', }}>
                                    <View style={{ height: 100, }}>
                                        <Image source={Covid} style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, height: '100%', width: '100%' }}></Image>
                                    </View>
                                    <View style={{ top: -20, left: 10 }}>
                                        <Image source={logo} style={{ width: 40, height: 40, borderRadius: 40 }}></Image>
                                    </View>

                                    <View style={{ flex: 1, top: -20, flexDirection: 'column', padding: 10 }}>
                                        <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>Government has overlooked the labour market and caring inequalities faced by women during the pandemic. </Text>
                                        <Text style={{ marginTop: 5, fontSize: 12, color: '#999', }}>July 14 2021</Text>
                                    </View>


                                </View>


                            </View>

                            <View style={{ marginLeft: 8, justifyContent: 'center', }}>

                                <View style={{ height: 200, width: 150, borderRadius: 15, backgroundColor: 'white', flexDirection: 'column', }}>
                                    <View style={{ height: 100, }}>
                                        <Image source={Covid} style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, height: '100%', width: '100%' }}></Image>
                                    </View>
                                    <View style={{ top: -20, left: 10 }}>
                                        <Image source={logo} style={{ width: 40, height: 40, borderRadius: 40 }}></Image>
                                    </View>

                                    <View style={{ flex: 1, top: -20, flexDirection: 'column', padding: 10 }}>
                                        <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>Government has overlooked the labour market and caring inequalities faced by women during the pandemic. </Text>
                                        <Text style={{ marginTop: 5, fontSize: 12, color: '#999', }}>July 14 2021</Text>
                                    </View>


                                </View>


                            </View>
                            <View style={{ marginLeft: 8, justifyContent: 'center', }}>

                                <View style={{ height: 200, width: 150, borderRadius: 15, backgroundColor: 'white', flexDirection: 'column', }}>
                                    <View style={{ height: 100, }}>
                                        <Image source={Covid} style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, height: '100%', width: '100%' }}></Image>
                                    </View>
                                    <View style={{ top: -20, left: 10 }}>
                                        <Image source={logo} style={{ width: 40, height: 40, borderRadius: 40 }}></Image>
                                    </View>

                                    <View style={{ flex: 1, top: -20, flexDirection: 'column', padding: 10 }}>
                                        <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>Government has overlooked the labour market and caring inequalities faced by women during the pandemic. </Text>
                                        <Text style={{ marginTop: 5, fontSize: 12, color: '#999', }}>July 14 2021</Text>
                                    </View>


                                </View>


                            </View>

                        </ScrollView>
                    </View>





                </ScrollView>


            </View>
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: 'white'
    }
})
