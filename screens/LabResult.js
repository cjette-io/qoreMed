import React, { useEffect, useState } from 'react'
import { FlatList, Dimensions, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Image, SafeAreaView } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


// Icon Set
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconION from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import FabLabResult from './components/FabLabResult'

import URL from '../api'
const { width, height } = Dimensions.get("window");
const cardWidth = width / 4;

const LabResult = ({ navigation, route }) => {
    const Patient_id = route.params

    const [lab_result, setlab_result] = useState([])
    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', async () => {
            // setLoading(true)
            let token;
            token = await AsyncStorage.getItem('userToken');
            fetch(URL + 'api/v1/patients/' + Patient_id + '/lab-results', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(JSON.stringify(json.data));
                    setlab_result(json.data)
                    // setLoading(false)

                })
                .catch((error) => {

                    console.log(error);

                });


        });
        return unsubscribe;
    }, [navigation])




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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Lab Results List </Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>
            <View style={{ flex: 1, padding:10 }}>


                {lab_result.map((item, index) => {
                    return (
                        <View key={index} style={{padding:10,backgroundColor:'white', borderRadius:10, elevation:10}}>
                            <View>
                                <Text style={styles.title}>Type:</Text>

                                <View>
                                    <Text>{item?.lab_type?.name}</Text>
                                    <Text>⊙ {item.name}</Text>
                                </View>
                                
                            </View>

                            <View style={{marginVertical:10}}>
                                <Text style={styles.title}>Date:</Text>

                                <View>
                                    <Text>📅 {moment(item?.date).format('LL')}</Text>
                                   
                                </View>
                                
                            </View>

                            <View>
                                <Text style={styles.title}>Remarks:</Text>

                                <View>
                                    <Text>✅ {item?.remarks}</Text>
                                   
                                </View>
                                
                            </View>

                            <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                                    <TouchableOpacity style={[styles.button,{backgroundColor:'#2196f3'}]}>
                                        <Text style={styles.buttonLabel}>Open</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.button,{marginHorizontal:5, backgroundColor:'#00bcd4'}]}>
                                        <Text style={styles.buttonLabel}>Edit</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.button, {backgroundColor:'red'}]}>
                                        <Text style={styles.buttonLabel}>Delete</Text>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
                <View>
                <FabLabResult  />
                </View>
            </View>
        </>
    )
}

export default LabResult

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize:16
    },

    button: {
        padding:5,
        justifyContent: 'center', 
        alignItems: 'center', 
        width:50, 
        borderRadius:5
    },

    buttonLabel:{
        color: 'white',
    }
})
