import React, { useState, useEffect } from 'react'
import { Animated, ActivityIndicator, Image, FlatList, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import FabAddPatient from './components/FabAddPatient'
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'

import PatientEmpty from '../assets/images/PatientDoctor.jpg'
import notes from '../assets/icons/note.png'



//Size Screen

const { width, height } = Dimensions.get("window");
const widthSize = width;
const heightSize = height;
const cardWidth = width / 2 - 20;

import URL from '../api'


const PatientsList = ({ navigation }) => {

    const [PatientDataList, setPatientDataList] = useState([])
    const [loading, setLoading] = useState(true)
    React.useEffect(async () => {

        const unsubscribe = navigation.addListener('focus', async () => {
            // setLoading(true)
            let token;
            token = await AsyncStorage.getItem('userToken');
            fetch(URL + 'api/v1/patients', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    // console.log(JSON.stringify(json));
                    setPatientDataList(json.data)
                    setLoading(false)

                })
                .catch((error) => {

                    console.log(error);

                });


        });
        return unsubscribe;
    }, [navigation]);

    // useEffect(async() => {
    //     let token;
    //     token = await AsyncStorage.getItem('userToken');

    //     fetch(URL + 'api/v1/patients', {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             Authorization: 'Bearer ' + token
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((json) => {
    //             //  console.log(JSON.stringify(json));
    //              setPatientDataList(json.data)

    //         })
    //         .catch((error) => {

    //             console.log(error);

    //         });

    // },[])

    const GotoProfile = (PatientID) => {
        navigation.navigate('PatientProfile', PatientID)
    }

    const userTap = () => {
        // navigation.navigate('MedicationAddScreen', Patient_ID)
        navigation.navigate('PatientAddScreen')
    }



    const PatientListItem = () => {


        const renderItem = ({ item, i }) => {


            const rightSwipe = (progress, dragX) => {
                const scale = dragX.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                });
                return (
                    <TouchableOpacity onPress={() => alert(item.id)} activeOpacity={0.6}>
                        <View style={styles.deleteBox}>
                            <Entypo name="trash" size={20} color="white" />
                            <Animated.Text style={{ color: 'white', fontWeight: 'bold' }}>
                                Delete
                            </Animated.Text>
                        </View>
                    </TouchableOpacity>
                );
            };

            const LeftSwipe = (progress, dragX) => {
                const scale = dragX.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                });
                return (
                    <TouchableOpacity activeOpacity={0.6}>
                        <View style={styles.deleteBox}>
                            <AntDesign name="edit" size={20} color="white" />
                            <Animated.Text style={{ color: 'white', fontWeight: 'bold' }}>
                                Edit
                            </Animated.Text>
                        </View>
                    </TouchableOpacity>
                );
            };

            return (

                <View key={i + '-' + item.id} >
                    <Swipeable renderLeftActions={LeftSwipe} renderRightActions={rightSwipe}>

                        <TouchableOpacity onPress={() => GotoProfile(item.id)} style={{ padding: 10, backgroundColor: 'white', borderRadius: 5, width: '100%', marginBottom: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>

                                <View style={{flexDirection:'row'}}>
                                    <Image source={{uri : item.photo_url}} style={{width:40, height:40, borderRadius:40}} />

                                    <View style={{left:5}}>

                                        <View style={{ flex: 1 }}>
                                            <Text numberOfLines={2} style={{ fontSize: 16, fontWeight: 'bold' }}>{item.full_name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{color:'gray'}}>{item.profile.gender}</Text>
                                            </View>
                                        </View>



                                    </View>
                                </View>

                                <View>
                                    
                                </View>




                            </View>


                        </TouchableOpacity>
                    </Swipeable>
                </View>



            )
        }





        return (
            <View style={{ flex: 1 }}>

                <FlatList


                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={PatientDataList}
                    vertical
                    showsVerticalScrollIndicator={false}

                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}

                />
            </View>
        )
    }


    if (loading == true) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2196f3" />
            </View>
        )
    }


    return (
        < >
            <SafeAreaView
                style={{ padding: 10, backgroundColor: 'white' }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IconION name="arrow-back" size={20} color='black' />
                        </TouchableOpacity> */}

                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Patient List</Text>
                    </View>

                    <TouchableOpacity>
                        <EvilIcons name="search" size={25} />
                    </TouchableOpacity>


                </View>
            </SafeAreaView>
            <View style={[styles.container, { justifyContent: PatientDataList.length < 1 ? 'center' : null }]}>


                {PatientDataList.length < 1 ? (
                    <View>
                        <Image source={PatientEmpty} style={{ width: '100%', height: 200 }} />
                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>No Available Patient</Text>
                        <Text style={{ textAlign: 'center', marginTop: 2 }}>To add, just tap the plus button</Text>
                    </View>
                ) : PatientListItem()}



                <FabAddPatient tap={userTap} />
            </View>
        </>
    )
}

export default PatientsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // backgroundColor: 'rgba(240,86,34,0.1)'
    },
    deleteBox: {
        backgroundColor: '#008FFB',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '90%',

    },
})
