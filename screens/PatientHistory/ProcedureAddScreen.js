import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, TextInput, ScrollView, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Modal, Portal, Provider } from 'react-native-paper';
import moment from 'moment';


// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';


import AsyncStorage from '@react-native-async-storage/async-storage';

// Url Based
import URL from '../../api'

const ProcedureAddScreen = ({ navigation, route }) => {
    const Patient_ID = route.params

    const [isSaving, setIsSaving] = useState(false)
    const [procedure, setProcedure] = useState('')
    const [provider, setprovider] = useState('')

    const [details, setdetails] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dfdpicker, setdfdpicker] = useState("")
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    const AddProcedureBtn = async () => {
        setIsSaving(true)
        if (procedure == '' || provider == '' || details == '') {
            alert('All fields are required')
            setIsSaving(false)
        } else {
            let token;
            token = await AsyncStorage.getItem('userToken');
            fetch(URL + "api/v1/patients/" + Patient_ID + "/history/procedures", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({
                    name: procedure,
                    provider: provider,
                    date: dfdpicker,
                    details: details
    
                })
            })
                .then((response) => response.json())
                .then((json) => {
    
                    console.log(json)
    
                    if(json.message === "The given data was invalid."){
                        setIsSaving(false)
                        
                        }else{
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

    const handleConfirm = (data) => {

        var newyear = new Date(data).getFullYear();
        var newDate = new Date(data).getDate();
        var newMonth = new Date(data).getMonth() + 1;

        const DataDate = newMonth + '/' + newDate + '/' + newyear;
        console.log(DataDate);
        setdfdpicker(DataDate)
        setDatePickerVisibility(false);

    }

    return (
        <Provider>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>New Procedures</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => isSaving == true ? null : AddProcedureBtn()}
                        >
                            <Text style={{ color: '#008FFB' }}>{isSaving == true ? 'Saving..' : 'DONE'}</Text>
                        </TouchableOpacity>


                    </View>
                </SafeAreaView>


                <View style={{ padding: 10 }}>
                    <View>
                        <Text>Procedure*</Text>
                        <TextInput
                            onChangeText={(text) => setProcedure(text)}
                            placeholder="Insert procedure done"
                            style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                        />
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text>Provider*</Text>
                        <TextInput
                            onChangeText={(text) => setprovider(text)}
                            placeholder="Insert procedure done"
                            style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                        />
                    </View>

                    <View>
                        <Text>Date*</Text>
                        <TouchableWithoutFeedback
                            onPress={() => showDatePicker()}
                            style={{
                                marginTop: 10,

                            }}>
                            <View style={{
                                borderWidth: 0.5,
                                padding: 10,
                                borderRadius: 10,
                                borderColor: 'gray'
                            }}>
                                <Text style={[styles.inputs, { color: !dfdpicker ? '#999' : 'black', }]}>{!dfdpicker ? 'mm/dd/yyyy' : dfdpicker}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                    <View>
                        <Text>Details*</Text>
                        <TextInput
                            onChangeText={(text) => setdetails(text)}
                            multiline
                            numberOfLines={4}
                            placeholder="Insert procedure done"
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
            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </Provider>
    )
}

export default ProcedureAddScreen

const styles = StyleSheet.create({})
