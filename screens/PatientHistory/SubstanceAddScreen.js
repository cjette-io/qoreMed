import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Modal, Portal, Provider, RadioButton } from 'react-native-paper';
// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../api'

const SubstanceAddScreen = ({ navigation, route }) => {


    const Patient_ID = route.params

    const [isSaving, setIsSaving] = useState(false)

    const [drinks_weekly, setdrinks_weekly] = useState('')
    const [years_drinking, setyears_drinking] = useState('')

    const [sticks_daily, setsticks_daily] = useState('')
    const [years_smoking, setyears_smoking] = useState('')

    const [drugs, setdrugs] = useState('')

    useEffect(async () => {
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


                // console.log(JSON.stringify(json))
                setdrinks_weekly(json.drinks_weekly)
                setyears_drinking(json.years_drinking)
                setsticks_daily(json.sticks_daily)
                setyears_smoking(json.years_smoking)
                setdrugs(json.drugs)



            })
            .catch((error) => {

                console.log(error);

            });
    }, [])


    const AddSubstanceBtn = async () => {
        setIsSaving(true)

        if (drinks_weekly == '' || years_drinking == '' || sticks_daily == '' || years_smoking == '') {
            alert('All fields are required')
            setIsSaving(false)
        } else {


            // alert(drinks_weekly + years_drinking + sticks_daily + years_smoking + drugs)
            setIsSaving(false)
            let token;
            token = await AsyncStorage.getItem('userToken');

            fetch(URL + "api/v1/patients/" + Patient_ID + "/history/substance", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({
                    drinks_weekly: drinks_weekly,
                    years_drinking: years_drinking,
                    sticks_daily: sticks_daily,
                    years_smoking: years_smoking,
                    drugs: drugs

                })
            })
                .then((response) => response.json())
                .then((json) => {

                    console.log(json)

                    if (json.message === "The given data was invalid.") {
                        setIsSaving(false)

                    } else {
                        alert('Data successfully saved')
                        setIsSaving(false)
                        navigation.goBack()
                    }

                })
                .catch((error) => {

                    console.log(error);

                });


        }
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>SUBSTANCE USE</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => isSaving == true ? null : AddSubstanceBtn()}
                    >
                        <Text style={{ color: '#008FFB' }}>{isSaving == true ? 'Saving..' : 'DONE'}</Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>
            <View style={{ flex: 1, padding: 10 }}>

                <View>
                    <Text style={{ fontWeight: 'bold' }}>Alcohol*</Text>
                    <View>
                        <TextInput
                            onChangeText={(text) => setdrinks_weekly(text)}
                            value={drinks_weekly}
                            placeholder="Insert drinks per week"
                            style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                        />
                        <TextInput
                            onChangeText={(text) => setyears_drinking(text)}
                            value={years_drinking}
                            placeholder="Insert years drinking"
                            style={{ marginTop: 10, top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                        />
                    </View>

                </View>

                <View style={{ marginVertical: 10 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold' }} >Cigarette*</Text>
                    </View>
                    <View>
                        <TextInput
                            onChangeText={(text) => setsticks_daily(text)}
                            value={sticks_daily}
                            placeholder="Insert sticks per day"
                            style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                        />
                        <TextInput

                            onChangeText={(text) => setyears_smoking(text)}
                            value={years_smoking}
                            placeholder="Insert years smoking"
                            style={{
                                marginTop: 10,
                                top: 5,
                                borderWidth: 0.5,
                                padding: 10,
                                borderRadius: 10,
                                borderColor: 'gray'
                            }}
                        />
                    </View>

                </View>

                <View>
                    <Text style={{ fontWeight: 'bold' }}>Drugs*</Text>
                    <TextInput
                        onChangeText={(text) => setdrugs(text)}
                        value={drugs}
                        multiline
                        numberOfLines={4}
                        placeholder="Insert drugs"
                        style={{
                            textAlignVertical: 'top',
                            top: 5,
                            borderWidth: 0.5,
                            padding: 10,
                            borderRadius: 10,
                            borderColor: 'gray'
                        }}
                    />
                </View>
            </View>

        </>
    )
}

export default SubstanceAddScreen

const styles = StyleSheet.create({})
