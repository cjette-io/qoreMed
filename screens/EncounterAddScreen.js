import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper';
import IconION from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';


import moment from "moment"

// Url Based
import URL from '../api'

const EncounterAddScreen = ({ route, navigation }) => {
    const Patient_ID = route.params
    const [ClinicList, setClinicList] = useState([])

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [insertDate, setInsertDate] = useState('')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleInsertDateConfirm = (data) => {
        const setDate = moment(data).format('YYYY-MM-DD');
        console.log(setDate);
        setDatePickerVisibility(false);
        setInsertDate(setDate)
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
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
                    console.log(json);
                    if (json.data.length > 0) {
                        setClinicList(json.data)
                    } else {
                        setClinicList([])
                    }

                })
                .catch((error) => {
                    setClinicList([])
                    console.log(error);

                });
        });
        return unsubscribe;
    }, [navigation])

    const [selectedClinic, setselectedClinic] = React.useState(null);
    const [isSaving, setIsSaving] = React.useState(false)
    const [errDate, seterrDate] = React.useState('')
    const [errClinic, seterrClinic] = React.useState('')

    const rbclinic = (id) => {
        setselectedClinic(id)
        console.log(id)

    }


  const AddNewEncounter = async() => {
    let token;
    token = await AsyncStorage.getItem('userToken');
    setIsSaving(true)

    // clinic_id
    // date

    if (selectedClinic == null) {
        seterrClinic('The clinic field is required.')
            setIsSaving(false)
    }else{
        fetch(URL + 'api/v1/patients/'+Patient_ID+'/encounters', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }, body: JSON.stringify({
                clinic_id: selectedClinic,
                date: insertDate,
               
            })
        })
            .then((response) => response.json())
            .then((json) => {
    
                console.log(json)
                if("errors" in json) {
                    if ('date' in json.errors) {
                        seterrDate(json.errors.date)
                      }
                }else{
                    alert('Encounter Successfully Added')
                    navigation.goBack();
                }
                setIsSaving(false)
            })
            .catch((error) => {
                setIsSaving(false)
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>New Encounter</Text>
                    </View>

                
                   <View>
                       <TouchableOpacity 
                       onPress={() => AddNewEncounter()}
                       >
                          {isSaving == true ? (<Text>Saving...</Text>) : (<Text>Done</Text>) } 
                       </TouchableOpacity>
                   </View>

                </View>
            </SafeAreaView>
            <View style={{ flex: 1, padding: 10 }}>

                <View>
                    <Text>Clinic</Text>
                    {ClinicList.map((item, index) => {
                        return (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                status={selectedClinic === item.id ? 'checked' : 'unchecked'}
                                onPress={() => rbclinic(item.id)}
                                />
                                <Text>{item.name}</Text>
                            </View>
                        )
                    })}

                    {errClinic == "" ? null : <Text style={{ fontSize: 10, color: 'red' }}> {errClinic}</Text>}
                    
                </View>

                <View style={{ marginVertical: 10, left: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date</Text>
                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => showDatePicker()}>
                            <View>
                                <Text style={[styles.inputs, { color: '#999', }]}>{!insertDate ? 'mm/dd/yyyy*' : insertDate}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                        {errDate == "" ? null : <Text style={{ fontSize: 10, color: 'red' }}> {errDate}</Text>}
                    </View>
                    </View>

            </View>


            
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleInsertDateConfirm}
                onCancel={hideDatePicker}
            />

        </>
    )
}

export default EncounterAddScreen

const styles = StyleSheet.create({})
