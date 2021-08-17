import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IconMCI from 'react-native-vector-icons/MaterialIcons';

import { Appointment, NoticeBoard } from './components/Home';

import Covid from '../assets/images/covid.jpg'
import logo from '../assets/images/doctoricon.png'
import Hospital from '../assets/images/clinic.png'
import LogoQoreMed from '../assets/logo/QoreMed_Logo-Landscape-Full-Color-Text.png'

// Url Based
import URL from '../api'

const HomeScreen = ({ navigation }) => {

    const [userFName, setuserFName] = useState('');
    const [userPhoto, setUserPhoto] = useState('')


    const [clinicList, setClinicList] = useState([])
    const [appointmentToday, setappointmentToday] = useState([])


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

                        setuserFName(json.userable.profile.title + ' ' + json.first_name + ' ' + json.last_name),
                            setUserPhoto(json.photo_url)

                    })
                    .catch((error) => {

                        console.log(error);

                    });

            }


        }, 500);
    }, [])

    useEffect(async () => {
        let token;
        token = await AsyncStorage.getItem('userToken');

        fetch(URL + 'api/v1/clinics', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {

                let MappedClinicData = []
                let response = json.data;
                let promises = [];
                let Appointment = [];
                if (response.length > 0) {


                    //Mapping muna :)
                    response.map((item, i) => {

                        //Fetch kada sched_today
                        let individual_clinicID = item.id
                        promises.push(
                            fetch(URL + 'api/v1/clinics/' + individual_clinicID + '/appointments/today', {
                                method: 'GET',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer ' + token
                                }
                            })
                                .then((response) => response.json())
                                .then((json) => {

                                    if (json.length > 0) {
                                        Appointment.push(
                                            {
                                            branch_external_id : json[0].branch_external_id,
                                            people_waiting : json[0].people_waiting,
                                            }
                                        )
                                    }

                                })

                        )

                        //Pushing na didi 
                        MappedClinicData.push({
                            clinic_id: item.id,
                            clinic_name: item.name,
                            clinic_address: item.address.full_address,
                        });


                    })



                }


                Promise.all(promises).then(() => {
                
                     console.log(JSON.stringify(Appointment))

                    setClinicList(MappedClinicData)
                    setappointmentToday(Appointment)



                });

            })
            .catch((error) => {

                console.log(error);

            });

    }, [])


    const display = () => {
        console.log(JSON.stringify(appointmentToday))
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
                        <Image source={LogoQoreMed} style={{ height: 40, width: 160 }}></Image>
                    </View>

                    <TouchableOpacity onPress={() => display()}>
                        <EvilIcons name="bell" size={25} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <View style={styles.container}>
                <ScrollView
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


                        <View>
                            {clinicList.map((item, i) => {
                                const ClinicID = item.clinic_id
                                return (
                                    <>
                                        <TouchableOpacity
                                        key={i}
                                            onPress={() => navigation.navigate('AppointmentPerClinic')}
                                            style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%', marginTop: 10, justifyContent: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                                    <Image source={Hospital} style={{ width: 45, height: 45, }}></Image>
                                                    <View style={{ marginLeft: 5, flex: 1, paddingRight: 20 }}>
                                                        <Text numberOfLines={1} style={{ fontFamily: 'NunitoSans-Bold', fontSize: 18 }}>{item.clinic_name}</Text>
                                                        <Text numberOfLines={2} style={{ fontSize: 14, fontFamily: 'NunitoSans-Light', color: '#999', }}>{item.clinic_address}</Text>
                                                    </View>
                                                </View>

                                                {appointmentToday.filter(item => item.branch_external_id.includes(ClinicID)).map((item, i) => {
                                                    return (
                                                        <View style={{ backgroundColor: 'rgba(0,143,251,0.2)', borderRadius: 5 }}>
                                                            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 18, padding: 5, borderRadius: 5, }}> {item.people_waiting} </Text>

                                                        </View>

                                                    )
                                                })}


                                            </View>
                                        </TouchableOpacity>
                                    </>
                                )
                            })}



                        </View>

























                    </View>





                    {/* NoticeBoard */}

                    <View style={{}}>
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontFamily: 'NunitoSans-Light', color: '#999', fontSize: 18 }}>Notice Board</Text>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
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
        marginBottom: 60
        // backgroundColor: 'white'
    }
})
