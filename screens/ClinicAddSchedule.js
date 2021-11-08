import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native'
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';


import IconION from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMCI from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import URL from '../api'
const ClinicAddSchedule = ({ route, navigation }) => {

    const { id, token } = route.params

    useEffect(() => {
        console.log(id)
    }, [])

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [isTimeStartPickerVisible, setisTimeStartPickerVisible] = useState(false);
    const [isTimeEndPickerVisible, setisTimeEndPickerVisible] = useState(false);

    const [serving_time, setserving_time] = useState('')
    const [capacity, setCapacity] = useState(10)
    const [insertDate, setInsertDate] = useState('')
    const [insertEndDate, setEndInsertDate] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState('')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const showStartTimePicker = () => {
        setisTimeStartPickerVisible(true)
    }
    const showEndTimePicker = () => {
        setisTimeEndPickerVisible(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const hideTimeStartPicker = () => {
        setisTimeStartPickerVisible(false);
    };
    const hideTimeEndPicker = () => {
        setisTimeEndPickerVisible(false);
    };


    const handleInsertDateConfirm = (data) => {

        console.log(data)

        var newyear = new Date(data).getFullYear();
        var newDate = new Date(data).getDate();
        var newMonth = new Date(data).getMonth() + 1;

        const DataDate = newyear + '-' + newMonth + '-' + newDate;
        console.log(DataDate);
        setInsertDate(DataDate)
        setDatePickerVisibility(false);
        // var hours = new Date(data).getHours(); //Current Hours
        // var min = new Date(data).getMinutes(); //Current Minutes
        // var sec = new Date(data).getSeconds(); //Current Seconds


        // const setTime = moment(data).format('LT');

        // console.log(setTime)

    }


    const handleInsertEndDateConfirm = (data) => {

        console.log(data)

        var newyear = new Date(data).getFullYear();
        var newDate = new Date(data).getDate();
        var newMonth = new Date(data).getMonth() + 1;

        const DataDate = newyear + '-' + newMonth + '-' + newDate;
        console.log(DataDate);
        setEndInsertDate(DataDate)
        setEndDatePickerVisibility(false);
        // var hours = new Date(data).getHours(); //Current Hours
        // var min = new Date(data).getMinutes(); //Current Minutes
        // var sec = new Date(data).getSeconds(); //Current Seconds


        // const setTime = moment(data).format('LT');

        // console.log(setTime)

    }

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

    const [checkedSCType, setCheckedSCType] = React.useState(null);
    const [selectedSCType, setselectedSCType] = React.useState('');




    const ScheduleType = [
        {
            sched_id: 'slotted',
            sched_name: 'Slotted'
        },
        {
            sched_id: 'fcfs',
            sched_name: 'First Come, First Served'
        },
        {
            sched_id: 'by-capacity',
            sched_name: 'By Capacity'
        },
    ]


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

    const [checkedfrequency, setCheckedfrequency] = React.useState(null);
    const [selectedfrequency, setselectedfrequency] = React.useState('');

    const frequencyType = [
        {
            freq_id: 'never',
            freq_name: 'Never'
        },
        {
            freq_id: 'every_week',
            freq_name: 'Every Week'
        },
        {
            freq_id: ' every_weekdays',
            freq_name: 'Every Weekdays'
        },
        {
            freq_id: ' everyday',
            freq_name: 'Everyday'
        }
    ]





    const rbSCType = (i, id) => {
        setCheckedSCType(i)
        setselectedSCType(id)

        if (id == 'by-capacity') {
            setserving_time(30)
        } else {
            setCapacity(10)
        }

    }
    const rbCType = (i, id) => {
        setCheckedCType(i)
        setselectedCType(id)

    }

    const rbfreq = (i, id) => {
        setCheckedfrequency(i)
        setselectedfrequency(id)

        if (id === 'never') {
            setEndInsertDate(null)
        }

    }

    const [errEnd_time, seterrEnd_time] = useState('')
    const [errStart_date, setStart_date] = useState('')
    const [errStart_time, seterrstart_time] = useState('')
    const [errtype, setErrtype] = useState('')
    const [errEnd_date, seterrEnd_date] = useState('')

    const [isSaving, setIsSaving] = useState(false)

    const AddSchedule = async () => {
        setIsSaving(true)
        setErrtype('')
        setStart_date('')
        seterrEnd_date("")
        seterrstart_time('')
        seterrEnd_time('')

        let token;
        token = await AsyncStorage.getItem('userToken');
        fetch(URL + 'api/v1/clinics/'+ id +'/schedules', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token 
            }, body: JSON.stringify({

                type: selectedSCType,
                is_virtual: selectedCType,
                start_time: startTime,
                end_time: endTime,
                frequency: selectedfrequency,
                start_date: insertDate,
                end_date: insertEndDate,
                serving_time,serving_time,
                capacity,capacity
                
            })
        })
            .then((response) => response.json())
            .then((json) => {

                console.log(json)
              

                if (json.message == 'The given data was invalid.')
                {
                    if ('type' in json.errors) {
                        setErrtype(json.errors.type)
                      }
                      if ('start_date' in json.errors) {
                        setStart_date(json.errors.start_date)
                      }

                      if ('start_time' in json.errors) {
                        seterrstart_time(json.errors.start_time)
                      }

                      if ('end_time' in json.errors) {
                        seterrEnd_time(json.errors.end_time)
                      }

                      if ('end_date' in json.errors) {
                     
                        if(json.errors.end_date[0] ==  'The end date field is required when frequency is every_weekdays.') {
                            seterrEnd_date('The end date field is required when frequency is every weekdays.')
                        }else{
                            seterrEnd_date(json.errors.end_date)
                        }

                       
                      }

                      setIsSaving(false)


                }else{
                    navigation.navigate('ClinicDetails')
                    setIsSaving(false)
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Add Schedule</Text>
                    </View>

                    <TouchableOpacity onPress={() => AddSchedule()} style={{ flexDirection: 'row' }}>
                       
                      {isSaving == true ? ( <Text>Saving ...</Text>) : ( <Text>ADD</Text>)}
                       
                    </TouchableOpacity>


                </View>
            </SafeAreaView>

            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                style={{ flex: 1, height: '100%', padding: 10 }}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Schedule Type:</Text>

                    {ScheduleType.map((item, i) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton


                                    status={checkedSCType === i ? 'checked' : 'unchecked'}
                                    onPress={() => rbSCType(i, item.sched_id)}
                                />
                                <Text style={{ fontSize: 16 }}>{item.sched_name}</Text>
                            </View>
                        )
                    })}

                    {errtype != '' ? (  <Text style={{color: 'red'}}>{errtype}</Text>) : (null)} 

                </View>

                <View style={{ marginTop: 20 }}>

                    {selectedSCType === "by-capacity" ? (
                        <View>
                            <TextInput
                                onChangeText={(text) => setCapacity(text)}
                                keyboardType="numeric" style={{ borderBottomWidth: 1 }} placeholder="Insert total patient"></TextInput>
                        </View>

                    ) : (
                        <View>
                            <TextInput
                                onChangeText={(text) => setserving_time(text)}
                                keyboardType="numeric" style={{ borderBottomWidth: 1 }} placeholder="Insert serving time per patient in minutes"></TextInput>
                        </View>

                    )}

                  

                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Consultation Type:</Text>


                    {ConsultationType.map((item, i) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Insert start date</Text>
                    <TouchableOpacity onPress={() => showDatePicker()}>
                        <View>
                            <Text style={[styles.inputs, { color: '#999', }]}>{!insertDate ? 'mm/dd/yyyy' : insertDate}</Text>
                        </View>
                    </TouchableOpacity>

                    <View>
                        {errStart_date != '' ? (  <Text style={{color: 'red'}}>{errStart_date}</Text>) : (null)} 
                    </View>
                </View>


                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Time:</Text>
                    <TouchableOpacity onPress={() => showStartTimePicker()}>
                        <View>
                            <Text style={[styles.inputs, { color: '#999', }]}>{!startTime ? 'Insert start time' : startTime}</Text>
                        </View>
                    </TouchableOpacity>

                    <View>
                        {errStart_time != '' ? (  <Text style={{color: 'red'}}>{errStart_time}</Text>) : (null)} 
                    </View>

                    <TouchableOpacity onPress={() => showEndTimePicker()}>
                        <View>
                            <Text style={[styles.inputs, { color: '#999', }]}>{!endTime ? 'Insert end time' : endTime}</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        {errEnd_time != '' ? (  <Text style={{color: 'red'}}>{errEnd_time}</Text>) : (null)} 
                    </View>

                    
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Repeat</Text>

                    {frequencyType.map((item, i) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton


                                    status={checkedfrequency === i ? 'checked' : 'unchecked'}
                                    onPress={() => rbfreq(i, item.freq_id)}
                                />
                                <Text style={{ fontSize: 16 }}>{item.freq_name}</Text>
                            </View>
                        )
                    })}


                </View>

                {/* if selected si every week nan Weekdays */}

                <View style={{ marginTop: 20 }}>
                    {checkedfrequency > 0 ? (
                        <>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Insert end date</Text>
                            <TouchableOpacity onPress={() => showEndDatePicker()}>
                                <View>
                                    <Text style={[styles.inputs, { color: '#999', }]}>{!insertEndDate ? 'mm/dd/yyyy' : insertEndDate}</Text>
                                </View>
                            </TouchableOpacity>

                          {errEnd_date != '' ? (<Text style={{color: 'red'}}>{errEnd_date}</Text>) : (null)}
                        </>
                    ) : null}

                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleInsertDateConfirm}
                    onCancel={hideDatePicker}
                />
                <DateTimePickerModal
                    isVisible={isEndDatePickerVisible}
                    mode="date"
                    onConfirm={handleInsertEndDateConfirm}
                    onCancel={hideEndDatePicker}
                />

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




            </ScrollView>
        </>
    )
}

export default ClinicAddSchedule

const styles = StyleSheet.create({
    inputs: {
        borderBottomWidth: 0.5,
        padding: 10,
        borderColor: '#3C1053'

    }
})
