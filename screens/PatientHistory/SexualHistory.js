import React, { useState, useEffect } from 'react'
import { Animated, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, Dimensions } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'

import FabSexual from './component/FabSexual'
import moment from 'moment'

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../api'

const { height, width } = Dimensions.get('window');
const cardWidth = width / 3 * 0.90

const SexualHistory = ({ navigation, route }) => {

    const Patient_ID = route.params
    const [SexualData, setSexualData ] = useState([])
    const [contraceptiveItems, setcontraceptivesItems] = useState([])

    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', async() => {
        console.log(Patient_ID)
        let token;
        token = await AsyncStorage.getItem('userToken');

        fetch(URL + "api/v1/patients/" + Patient_ID + "/history/sexual-history", {
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
                setSexualData(json)
                setcontraceptivesItems(json.contraceptive_items)

            })
            .catch((error) => {

                console.log(error);

            });
        });
        return unsubscribe;

    }, [navigation])

    const userTap = () => {
        navigation.navigate('SexualHistoryAdd',Patient_ID)
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Sexual History</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                    <View style={{ borderRadius: 10, width: cardWidth, height: cardWidth, elevation: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{SexualData == null ? '0' : SexualData.coitarche}</Text>
                        <Text style={{ color: '#999', textAlign: 'center', fontSize: 12 }}>Coitarche (Age of first coitus)</Text>

                    </View>

                    <View style={{ borderRadius: 10, width: cardWidth, height: cardWidth, elevation: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{SexualData == null ? '0' : SexualData.sexual_partners}</Text>
                        <Text style={{ color: '#999', textAlign: 'center', fontSize: 12 }}>Number of sexual partners</Text>
                    </View>

                    <View style={{ borderRadius: 10, width: cardWidth, height: cardWidth, elevation: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{SexualData == null ? '0' : SexualData.coitus_weekly}</Text>
                        <Text style={{ color: '#999', textAlign: 'center', fontSize: 12 }}>Coitus per Week</Text>
                    </View>

                </View>

                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-around' }}>

                    <View style={{ borderRadius: 10, width: cardWidth, height: cardWidth, elevation: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{SexualData == null ? '' : SexualData.dyspareunia}</Text>
                        <Text style={{ color: '#999', textAlign: 'center', fontSize: 12 }}>Dyspareunia</Text>

                    </View>

                    <View style={{ borderRadius: 10, width: cardWidth, height: cardWidth, elevation: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{SexualData == null ? '' : SexualData.bleeding}
                        </Text>
                        <Text style={{ color: '#999', textAlign: 'center', fontSize: 12 }}>Post Coital Bleeding</Text>
                    </View>

                    <View style={{ borderRadius: 10, width: cardWidth, height: cardWidth, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>

                    </View>

                </View>

                <View style={{marginTop:10}}>
                <View style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%',}}>
                    <Text style={{fontWeight: 'bold', fontSize:16}}>Contraceptives used</Text>

                   <View style={{marginTop:5}}>
                   {contraceptiveItems.map((item, index) => {
                        return(
                            <Text key={index}>
                                - {item.name}
                            </Text>
                        )
                    })}
                
                   </View>
                </View>
                </View>

            </View>

            <FabSexual tap={userTap} />

        </>
    )
}

export default SexualHistory
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