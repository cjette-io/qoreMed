import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Animated, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import FabMens from './component/FabMens'
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import notes from '../../assets/icons/note.png'


import moment from 'moment'

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../api'


const MenstrualHistory = ({ navigation, route }) => {

    const Patient_ID = route.params
    const [MenstrualHistoryData, setMenstrualHistoryData] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log(Patient_ID)
            let token;
            token = await AsyncStorage.getItem('userToken');

            fetch(URL + "api/v1/patients/" + Patient_ID + "/history/menstrual-history", {
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
                    setMenstrualHistoryData(json)

                })
                .catch((error) => {

                    console.log(error);

                });

        });
        return unsubscribe;
    }, [navigation])



    const userTap = () => {
      navigation.navigate('MensAddEdit',Patient_ID)
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Menstrual History</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>
            <View style={{flex:1, padding:10}}>

                <View style={{
                    
                    flexDirection: 'row',
                    justifyContent: 'space-between'}}>
                    <Text style={styles.label}>Menarche (Age of first menstruation)</Text>
                    <Text>{MenstrualHistoryData?.menarche}</Text>
                </View>

                <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={styles.label}>Interval</Text>
                    <Text>{MenstrualHistoryData?.interval}</Text>
                </View>


                <View style={{ marginVertical:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={styles.label}>Average Days Duration</Text>
                    <Text>{MenstrualHistoryData?.average_duration}</Text>
                </View>


                <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={styles.label}>Cycle Duration</Text>
                    <Text>{MenstrualHistoryData?.cycle_duration}</Text>
                </View>

                
                <View style={{marginVertical:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={styles.label}>Dysmenorrhea</Text>
                    <Text>{MenstrualHistoryData?.dysmenorrhea}</Text>
                </View>

                <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text numberOfLines={2} style={[styles.label,{width:'90%'}]}>Average Amount of Napkins/Diapers/Cheesecloth</Text>
                    <Text>{MenstrualHistoryData?.average_napkins}</Text>
                </View>

                <View style={{marginVertical:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={[styles.label,{width:'50%'}]}>Last Normal Menstruation Period (LMP)</Text>
                    <Text>{moment(MenstrualHistoryData?.last_normal_from).format('ll')}-{moment(MenstrualHistoryData?.last_normal_to).format('ll')}</Text>
                </View>

                <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={[styles.label,{width:'50%'}]}>Previous Normal Menstruation Period</Text>
                    <Text>{moment(MenstrualHistoryData?.previous_normal_from).format('ll')}-{moment(MenstrualHistoryData?.previous_normal_to).format('ll')}</Text>
                </View>

                <View style={{marginVertical:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={styles.label}>Age of Menopause</Text>
                    <Text>{MenstrualHistoryData?.menopause}</Text>
                </View>


                <FabMens tap={userTap} />

            </View>

        </>
    )
}

export default MenstrualHistory

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold'
    }
})
