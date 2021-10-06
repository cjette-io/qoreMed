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

import URL from '../api'
const { width, height } = Dimensions.get("window");
const cardWidth = width / 4;

const Encounters = ({ navigation, route }) => {

    const [encounters, setencounters] = useState([])
    const Patient_id = route.params
    useEffect(async () => {
        let token;
        token = await AsyncStorage.getItem('userToken');
        fetch(URL + 'api/v1/patients/' + Patient_id + '/encounters', {
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
                setencounters(json.data)
            })
            .catch((error) => {

                console.log(error);

            });
    }, [])

    function EncounterList() {

        const renderItem = ({ item, i }) => {
            return (
                <View
                    marginVertical={5}
                    key={i}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize:16}}>Clinic: {item.clinic.name}</Text>
                            <Text>Date: {item.date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row',  }}>
                        <TouchableOpacity style={{padding:5, backgroundColor:'#2196f3', justifyContent:'center', alignItems: 'center', borderRadius:5}}>
                            <FontAwesome5 name="clipboard-list" size={20} color='white' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginHorizontal:10, padding:5, backgroundColor:'#00bcd4', justifyContent:'center', alignItems: 'center', borderRadius:5}}>
                            <Feather name="edit" size={20} color='white' />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:5, backgroundColor:'red', justifyContent:'center', alignItems: 'center', borderRadius:5}}>
                            <Feather name="trash" size={20} color='white' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }

        return (
            <View>

                <FlatList
                    data={encounters}
                    vertical
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}

                />
            </View>
        )
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Encounters List</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>

            <View style={{ flex: 1, padding: 10 }}>
                {EncounterList()}
            </View>
        </>
    )
}

export default Encounters

const styles = StyleSheet.create({})
