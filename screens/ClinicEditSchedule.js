import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native'
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';


import IconION from 'react-native-vector-icons/Ionicons';

import URL from '../api'
const ClinicEditSchedule = ({ route, navigation }) => {
    const { id, token, data } = route.params

    const [schedtypeLabel, setschedtypeLabel] = useState('')
    const [selectedSCType, setselectedSCType] = useState('')
    const [scValue, setscValue] = useState(0)

    const [checkedCType, setCheckedCType] = React.useState(null);
    const [selectedCType, setselectedCType] = React.useState(null);


    const ConsultationType = [
        {
            con_id: 0,
            con_name: 'On-Site Consultation'
        },
        {
            con_id: 1,
            con_name: 'Virtual Consultation'
        }
    ]
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const [isTimeStartPickerVisible, setisTimeStartPickerVisible] = useState(false);
    const [isTimeEndPickerVisible, setisTimeEndPickerVisible] = useState(false);
    const showStartTimePicker = () => {
        setisTimeStartPickerVisible(true)
    }
    const showEndTimePicker = () => {
        setisTimeEndPickerVisible(true)
    }
    const hideTimeStartPicker = () => {
        setisTimeStartPickerVisible(false);
    };
    const hideTimeEndPicker = () => {
        setisTimeEndPickerVisible(false);
    };

    const handleInsertTimeStartConfirm = (data) => {
        var hours = new Date(data).getHours(); //Current Hours
        var min = new Date(data).getMinutes(); //Current Minutes
        hours = hours < 10 ? '0' + hours : hours
        min = min < 10 ? '0' + min : min
        const setTime = hours + ':' + min;
        console.log(setTime)
        setStartTime(setTime)
        setisTimeStartPickerVisible(false);
    }

    const handleInsertTimeEndConfirm = (data) => {
        var hours = new Date(data).getHours(); //Current Hours
        var min = new Date(data).getMinutes(); //Current Minutes
        hours = hours < 10 ? '0' + hours : hours
        min = min < 10 ? '0' + min : min
        const setTime = hours + ':' + min;
        console.log(setTime)
        setEndTime(setTime)
        setisTimeEndPickerVisible(false);
    }
    useEffect(() => {

        console.log(data)

        if (data.type == "fcfs") {
            setschedtypeLabel('Serving Time')
            setselectedSCType(data.type)
            // setselectedSCType(data.type)
            // setCheckedSCType(1)
            setscValue(data.serving_time.toString())
        } else if (data.type == "slotted") {
            setschedtypeLabel('Serving Time')
            setselectedSCType(data.type)
            // setCheckedSCType(0)
            setscValue(data.serving_time.toString())
        } else if (data.type == "by-capacity") {
            setschedtypeLabel('Capacity')
            setselectedSCType(data.type)
            setscValue(data.capacity.toString())
        }


        if (data.is_virtual == true) {
            setCheckedCType(1)
            setselectedCType(0)
        } else {
            setCheckedCType(0)
            setselectedCType(1)
        }


        setStartTime(data.start_time)
        setEndTime(data.end_time)


    }, [])

    const rbCType = (i, id) => {
        setCheckedCType(i)
        setselectedCType(id)

    }

    const EditSchedule = () => {
         
        fetch(URL + 'api/v1/schedules/'+ data.id, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token 
            }, body: JSON.stringify({

              
                is_virtual: selectedCType,
                start_time: startTime,
                end_time: endTime,
              
                serving_time:selectedSCType == 'by-capacity' ? null : scValue,
                capacity:selectedSCType == 'by-capacity' ? scValue : null,

            })
        })
            .then((response) => response.json())
            .then((json) => {

                console.log(json.message)


                if (json.message == 'The given data was invalid.')
                {

                }else{
                    alert(JSON.stringify(json.message))
                    navigation.navigate('ClinicDetails')
                }


            })
            .catch((error) => {

                console.log(error);

            });
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Edit Schedule</Text>
                    </View>

                    <TouchableOpacity onPress={() => EditSchedule()} style={{ flexDirection: 'row' }}>
                        {/* <IconAnt name="plus" size={18} color='black' /> */}
                        <Text>UPDATE</Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>

            <View style={{ flex: 1, padding: 10 }}>
                <View>
                    <Text>{schedtypeLabel}</Text>
                    <TextInput

                        onChangeText={(text) => setscValue(text)}
                        placeholder="Insert procedure done"
                        style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                        value={scValue}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Consultation Type:</Text>


                    {ConsultationType.map((item, i) => {
                        return (
                            <View
                                key={i}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton


                                    status={checkedCType === item.con_id ? 'checked' : 'unchecked'}
                                    onPress={() => rbCType(i, item.con_id)}
                                />
                                <Text style={{ fontSize: 16 }}>{item.con_name}</Text>
                            </View>
                        )
                    })}

                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Time:</Text>
                    <Text>Insert start time</Text>
                    <TouchableOpacity
                        style={{ marginVertical: 10 }}
                        onPress={() => showStartTimePicker()}>
                        <View>
                            <Text style={[styles.inputs, { color: '#999', }]}>{!startTime ? 'Insert start time' : startTime}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text>Insert start time</Text>
                    <TouchableOpacity
                    style={{ marginVertical: 10 }}
                     onPress={() => showEndTimePicker()}>
                        <View>
                            <Text style={[styles.inputs, { color: '#999', }]}>{!endTime ? 'Insert start time' : endTime}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            <DateTimePickerModal
                isVisible={isTimeStartPickerVisible}
                mode="time"
                onConfirm={handleInsertTimeStartConfirm}
                onCancel={hideTimeStartPicker}
            />
            <DateTimePickerModal
                isVisible={isTimeEndPickerVisible}
                mode="time"
                onConfirm={handleInsertTimeEndConfirm}
                onCancel={hideTimeEndPicker}
            />
        </>
    )
}

export default ClinicEditSchedule

const styles = StyleSheet.create({
    inputs: {


        borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray'
    }
})
