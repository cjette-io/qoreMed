import React, { useState, useEffect } from 'react'
import { Animated, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'


import Cigarette from '../../assets/icons/Cigarrete.png'
import Alcohol from '../../assets/icons/alcohol.png'
import Drugs from '../../assets/icons/drugs.png'

import moment from 'moment'

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../api'

import FabSubstance from './component/FabSubstance'

const Substances = ({ navigation, route }) => {

    const Patient_ID = route.params

    const [SubstancesData, setSubstancesHistoryData] = useState([])



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
        console.log(Patient_ID)
        let token;
        token = await AsyncStorage.getItem('userToken');

        fetch(URL + "api/v1/patients/" + Patient_ID + "/history/substance", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {


                console.log(JSON.stringify(json))
                  setSubstancesHistoryData(json)

            })
            .catch((error) => {

                console.log(error);

            });
        });
        return unsubscribe;

    }, [navigation])


    const userTap = () => {
        navigation.navigate('SubstanceAddScreen',Patient_ID)
    }


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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Substances Use</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>

            <View style={styles.container}>

                <View style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%', height: 80, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>

                        <View style={{ flex: 1 }}>

                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={2} style={{ fontSize: 20 }}>Cigarette</Text>
                                <Text numberOfLines={2} style={{ fontSize: 15 }}>-{SubstancesData.sticks_daily} for the past {SubstancesData.years_smoking} years</Text>
                            </View>

                            <View style={{ marginTop: 2 }}>
                                {/* <Text>Date: {moment(item.date).format('l')}</Text> */}

                            </View>



                        </View>



                        <View style={{ justifyContent: "center", alignItems: 'center' }}>
                            <Image source={Cigarette} style={{height:40, width:40}}></Image>
                        </View>

                    </View>


                </View>

                <View style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%', height: 80, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>

                        <View style={{ flex: 1 }}>

                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={2} style={{ fontSize: 20 }}>Alcohol</Text>
                                <Text numberOfLines={2} style={{ fontSize: 15 }}>-{SubstancesData.drinks_weekly} for the past {SubstancesData.years_drinking}</Text>
                            </View>

                            <View style={{ marginTop: 2 }}>
                                {/* <Text>Date: {moment(item.date).format('l')}</Text> */}

                            </View>



                        </View>



                        <View style={{ justifyContent: "center", alignItems: 'center' }}>
                            <Image source={Alcohol} style={{height:40, width:40}}></Image>
                        </View>

                    </View>


                </View>

                <View style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%', height: 80, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>

                        <View style={{ flex: 1 }}>

                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={2} style={{ fontSize: 20 }}>Drugs</Text>
                                <Text numberOfLines={2} style={{ fontSize: 15 }}>-{SubstancesData.drugs}</Text>
                            </View>

                            <View style={{ marginTop: 2 }}>
                                {/* <Text>Date: {moment(item.date).format('l')}</Text> */}

                            </View>



                        </View>



                        <View style={{ justifyContent: "center", alignItems: 'center' }}>
                            <Image source={Drugs} style={{height:40, width:40}}></Image>
                        </View>

                    </View>


                </View>

                <FabSubstance tap={userTap} />

            </View>
        </>
    )
}

export default Substances

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    deleteBox: {
        backgroundColor: '#008FFB',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '90%',

    },
})
