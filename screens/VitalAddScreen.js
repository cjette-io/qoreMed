import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../api'


import IconION from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMCI from 'react-native-vector-icons/MaterialIcons';

const VitalAddScreen = ({ navigation, route }) => {

    const Patient_ID = route.params

    const [vital1, setvital1] = useState('') // Weight (kg)
    const [vital2, setvital2] = useState('') // Height (m)

    const [vital3, setvital3] = useState('') //Body Mass Index (kg/m2)

    //// Blood Pressure (mmHg) /////

    const [vital4, setvital4] = useState('')
    const [vital24, setvital24] = useState('')
    //// End Blood Pressure (mmHg) /////


    const [vital5, setvital5] = useState('') // Oxygen Saturation (%)
    const [vital6, setvital6] = useState('') // Respiratory Rate (breaths/min)
    const [vital7, setvital7] = useState('') // Heart Rate (bpm)
    const [vital8, setvital8] = useState('') // Body Temperature (C)
    const [vital9, setvital9] = useState('') // Capillary Blood Glucose (mg/dL)
    const [vital10, setvital10] = useState('') // Head Circumference (cm)


    const AddNewVital = async () => {
        let token;
        token = await AsyncStorage.getItem('userToken');
        fetch(URL + "api/v1/patients/" + Patient_ID + "/vitals", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }, body: JSON.stringify({
                vital1: vital1,
                vital2: vital2,
                vital3: vital3,
                vital4: vital4,
                vital24: vital24,
                vital5: vital5,
                vital6: vital6,
                vital7: vital7,
                vital8: vital8,
                vital9: vital9,
                vital10: vital10
            })
        })
            .then((response) => response.json())
            .then((json) => {


                console.log(JSON.stringify(json))





            })
            .catch((error) => {

                console.log(error);

            });

    }



    return (
        <>
            <SafeAreaView
                style={{ padding: 10, backgroundColor: 'white', elevation: 5 }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IconION name="arrow-back" size={20} color='black' />
                        </TouchableOpacity>

                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>New Vital</Text>
                    </View>

                    <TouchableOpacity onPress={() => AddNewVital()}>
                        <Text style={{ color: '#008FFB' }}>DONE</Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>


            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}

                style={{ padding: 20 }}
            >
                <View style={{ marginVertical: 10 }}>
                    <Text style={{fontWeight: 'bold' }}>Weight (kg)</Text>
                    <TextInput
                        value={vital1}
                        onChangeText={(text) => setvital1(text)}
                        placeholder="Insert weight in kg"
                        keyboardType='numeric'
                        style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={{fontWeight: 'bold' }}>Height (m)</Text>
                    <TextInput
                        value={vital2}
                        onChangeText={(text) => setvital2(text)}
                        placeholder="Insert height in m" 
                        keyboardType='numeric'
                        style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                      />
                </View>

                <View style={{ marginVertical: 10 }}>
                <Text style={{fontWeight: 'bold' }}>Body Mass Index (kg/m2)</Text>
                    <TextInput
                        value={vital3}
                        onChangeText={(text) => setvital3(text)}
                        placeholder="Insert body mass index in kg/m2" 
                        keyboardType='numeric'
                        style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                              />

                </View>

                <View>
                    <Text>Blood Pressure (mmHg)</Text>
                    <TextInput
                        value={vital4}
                        onChangeText={(text) => setvital4(text)}
                        //  placeholder="Weight in (kg)" 
                        keyboardType='numeric'
                        style={{ borderBottomWidth: 1 }}
                    />
                    <TextInput
                        value={vital24}
                        onChangeText={(text) => setvital24(text)}
                        //  placeholder="Weight in (kg)" 
                        keyboardType='numeric'
                        style={{ borderBottomWidth: 1 }}
                    />
                </View>

                <View>
                    <Text>Oxygen Saturation (%)</Text>
                    <TextInput
                        value={vital5}
                        onChangeText={(text) => setvital5(text)}
                        //  placeholder="Weight in (kg)" 
                        keyboardType='numeric'
                        style={{ borderBottomWidth: 1 }}
                    />
                </View>

                <View>
                    <Text>Respiratory Rate (breaths/min)</Text>
                    <TextInput
                        value={vital6}
                        onChangeText={(text) => setvital6(text)}
                        //  placeholder="Weight in (kg)" 
                        keyboardType='numeric'
                        style={{ borderBottomWidth: 1 }}
                    />
                </View>

                <View>
                    <Text>Heart Rate (bpm)</Text>
                    <TextInput
                        value={vital7}
                        onChangeText={(text) => setvital7(text)}
                        //  placeholder="Weight in (kg)" 
                        keyboardType='numeric'
                        style={{ borderBottomWidth: 1 }}
                    />
                </View>
                <View>
                    <Text>Body Temperature (C)</Text>
                    <TextInput
                        value={vital8}
                        onChangeText={(text) => setvital8(text)}
                        //  placeholder="Weight in (kg)" 
                        keyboardType='numeric'
                        style={{ borderBottomWidth: 1 }}
                    />
                </View>

                <View>
                    <Text> Capillary Blood Glucose (mg/dL)</Text>
                    <TextInput
                        value={vital9}
                        onChangeText={(text) => setvital9(text)}
                        //  placeholder="Weight in (kg)" 
                        keyboardType='numeric'
                        style={{ borderBottomWidth: 1 }}
                    />
                </View>
                <View>
                    <Text>Head Circumference (cm)</Text>
                    <TextInput
                        value={vital10}
                        onChangeText={(text) => setvital10(text)}
                        //  placeholder="Weight in (kg)" 
                        keyboardType='numeric'
                        style={{ borderBottomWidth: 1 }}
                    />
                </View>

            </ScrollView>
        </>
    )
}

export default VitalAddScreen

const styles = StyleSheet.create({})
