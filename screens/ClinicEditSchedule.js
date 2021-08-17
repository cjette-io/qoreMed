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
const ClinicEditSchedule = ({ route, navigation }) => {
    const { id, token, data } = route.params

    useEffect(async () => {
        console.log(data)
    }, [])

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [isTimeStartPickerVisible, setisTimeStartPickerVisible] = useState(false);
    const [isTimeEndPickerVisible, setisTimeEndPickerVisible] = useState(false);

    const [serving_time, setserving_time] = useState('')
    const [capacity, setCapacity] = useState('')
    const [insertDate, setInsertDate] = useState('')
    const [insertEndDate, setEndInsertDate] = useState('')
    const [startTime, setStartTime] = useState('')
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

    useEffect(() => {
        if (data.type == "fcfs") {
            setselectedSCType(data.type)
            setCheckedSCType(1)
            setserving_time(data.serving_time)
        } else if (data.type == "slotted") {
            setselectedSCType(data.type)
            setCheckedSCType(0)
            setserving_time(data.serving_time)
        } else if (data.type == "by-capacity") {
            setCheckedSCType(2)
            setselectedSCType(data.type)
            setCapacity(data.capacity)
        }


        if (data.is_virtual == true) {
            setCheckedCType(1)
            setselectedCType(0)
        } else {
            setCheckedCType(0)
            setselectedCType(1)
        }

        setInsertDate(data.start_date)
        setStartTime(data.start_time)
        setEndTime(data.end_time)


        if (data.frequency == "never") {
            setCheckedfrequency(0)
            setselectedfrequency(data.frequency)
            setEndInsertDate('')
        } else if (data.frequency == "every_week") {
            setCheckedfrequency(1)
            setselectedfrequency(data.frequency)
            setEndInsertDate(data.end_date)
        } else if (data.frequency == "every_weekdays") {
            setCheckedfrequency(2)
            setselectedfrequency(data.frequency)
            setEndInsertDate(data.end_date)
        }

    }, [])


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
    const [selectedCType, setselectedCType] = React.useState('');

    const ConsultationType = [
        {
            con_id: '1',
            con_name: 'On-Site Consultation'
        },
        {
            con_id: '0',
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
        }
    ]



    const rbSCType = (i, id) => {
        setCheckedSCType(i)
        setselectedSCType(id)

        if (id == 'by-capacity') {
            setserving_time('')
        } else {
            setCapacity('')
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
            setEndInsertDate('')
        }

    }


    const EditSchedule = async () => {

            // console.log(id)

            // console.log(selectedSCType)
            // console.log(selectedCType)
            // console.log(startTime)
            // console.log(endTime)
            // console.log(selectedfrequency)
            // console.log(insertDate)
            // console.log(insertEndDate)
            // console.log(serving_time)
            // console.log(capacity)



       
        fetch(URL + 'api/v1/schedules/'+ data.id, {
            method: 'PATCH',
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
                serving_time:serving_time,
                capacity:capacity == '' ? null : capacity,

                    //  type: "slotted",
                    // is_virtual : 0,
                    // start_time: "13:00",
                    // end_time:"14:00",
                    // frequency:"every_week",
                    // start_date:"2021/7/28",
                    // end_date : "2021/8/28",
                    // serving_time : 30

            })
        })
            .then((response) => response.json())
            .then((json) => {

                console.log(json)


                if (json.message == 'The given data was invalid.')
                {

                }else{
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



                </View>

                <View style={{ marginTop: 20 }}>

                    {selectedSCType === "by-capacity" ? (
                        <View>
                            <TextInput
                                value={capacity.toString()}
                                onChangeText={(text) => setCapacity(text)}
                                keyboardType="numeric" style={{ borderBottomWidth: 1 }} placeholder="Insert total patient"></TextInput>
                        </View>

                    ) : (
                        <View>
                            <TextInput
                                value={serving_time.toString()}
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


                                    status={checkedCType === i ? 'checked' : 'unchecked'}
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
                </View>


                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Time:</Text>
                    <TouchableOpacity onPress={() => showStartTimePicker()}>
                        <View>
                            <Text style={[styles.inputs, { color: '#999', }]}>{!startTime ? 'Insert start time' : startTime}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => showEndTimePicker()}>
                        <View>
                            <Text style={[styles.inputs, { color: '#999', }]}>{!endTime ? 'Insert start time' : endTime}</Text>
                        </View>
                    </TouchableOpacity>
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

export default ClinicEditSchedule

const styles = StyleSheet.create({
    inputs: {
        borderBottomWidth: 0.5,
        padding: 10,
        borderColor: '#3C1053'

    }
})
