import React, { useState, useEffect } from 'react'
import { Animated, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, Dimensions } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FabMedicationHistory from './component/FabMedicationHistory'
// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'


import moment from 'moment'

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../api'

const { height, width } = Dimensions.get('window');
const cardWidth = width / 3 * 0.90

const MedicalHistory = ({ navigation, route }) => {

    const Patient_ID = route.params
    const [MedicalData, setMedicalData] = useState([])

    useEffect(async () => {

        const unsubscribe = navigation.addListener('focus', async() => {
        
            let token;
        token = await AsyncStorage.getItem('userToken');

        fetch(URL + "api/v1/patients/" + Patient_ID + "/history/medical-history", {
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
                //   setSubstancesHistoryData(json)
                setMedicalData(json)

            })
            .catch((error) => {

                console.log(error);

            });
        });

        
        return unsubscribe;

     

    }, [navigation])

    const userTap = () => {
        navigation.navigate('MedicalHistoryAddScreen',Patient_ID)
    }
  

    return (
        <>
            <SafeAreaView
                style={{ padding: 10, backgroundColor: 'white', }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IconION name="arrow-back" size={20} color='black' />
                        </TouchableOpacity>

                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Medical History</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>

            <View style={styles.container}>
            <View style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%',}}>
                <Text style={{ fontSize:18, fontWeight: 'bold' }}>Health Condition</Text>
            <View style={{marginTop:10}}>
                {MedicalData.map((item, index) => {
                    return (<>
                        <Text style={{fontSize:15}} key={index}>
                                - {item.name } {item.name == 'Other' ? ': '+item.pivot.specify : item.name == 'Cancer' ? item.pivot.specify == null ? '' : ': '+item.pivot.specify : item.name == 'Kidney Diseases' ? item.pivot.specify == null ? '' : ': '+item.pivot.specify : ''}
                            </Text>
                    </>)
                })}
            </View>
            </View>

            <FabMedicationHistory tap={userTap} />
            </View>
        </>
    )
}

export default MedicalHistory
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