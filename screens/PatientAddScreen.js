import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import URL from '../api'

// Screen Size
const { width } = Dimensions.get("screen");
const cardWidth = width / 2.5;

import moment from "moment"

import IconION from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMCI from 'react-native-vector-icons/MaterialIcons';


const PatientAddScreen = ({ navigation }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


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

    //    patient name

    const [Fname, setFname] = useState('')
    const [Mname, setMname] = useState('')
    const [Lname, setLname] = useState('')
    const [suffix, setsuffix] = useState('')
    const [nationality, setNationality] = useState('')

    const [getBloodType, setBloodType] = React.useState([])
    const [getCivilStatus, setCivilStatus] = React.useState([])

    const [selectedgender, setselectedgender] = React.useState('');
    const [selectedCivil, setselectedCivil] = React.useState(0);
    const [selectedbloodtype, setselectedbloodtype] = React.useState(0);
    const [insertDate, setInsertDate] = useState('')

    const [errFname, seterrFname] = React.useState('')
    const [errMname, seterrMname] = React.useState('')
    const [errLname, seterrLname] = React.useState('')
    const [errGender, seterrGender] = React.useState('')

    const [errbdate, seterrbdate] = useState(null)

    const [isSaving, setisSaving] = useState(false)


    useEffect(async () => {
        let token;
        token = await AsyncStorage.getItem('userToken');

        fetch(URL + 'api/v1/references/blood-types', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {
                // console.log(json)
                setBloodType(json)

            })
            .catch((error) => {

                console.log(error);

            });


        fetch(URL + 'api/v1/references/civil-statuses', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {

                setCivilStatus(json)

            })
            .catch((error) => {

                console.log(error);

            });
    }, [])



    const GenderOption = [
        {
            gender_id: 'male',
            gender_name: 'Male'
        },
        {
            gender_id: 'female',
            gender_name: 'Female'
        },

    ]

    const rbgender = (i, id) => {
        setselectedgender(id)
        console.log(id)

    }

    const rbcivil = (i, id) => {
        setselectedCivil(id)
        console.log(id)

    }


    const rbblood = (i, id) => {
        setselectedbloodtype(id)
        console.log(id)

    }

    const SavePatientInfo = async () => {
        // console.log(Fname)
        // console.log(Mname)
        // console.log(Lname)
        // console.log(suffix)
        // console.log(insertDate)
        // console.log(selectedgender)
        // console.log(selectedCivil)
        // console.log(selectedbloodtype)
        // console.log(nationality)

        seterrFname(null)
        seterrLname(null)
        seterrGender(null)
        seterrbdate(null)
        setisSaving(true)

        let token;
        token = await AsyncStorage.getItem('userToken');

        fetch(URL + 'api/v1/patients', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }, body: JSON.stringify({
                last_name: Lname,
                first_name: Fname,
                middle_name: Mname,
                suffix: suffix,
                birthday: insertDate,
                gender: selectedgender,
                civil_status_id: selectedCivil,
                blood_type_id: selectedbloodtype,
                nationality: nationality
            })
        })
            .then((response) => response.json())
            .then((json) => {

                console.log(json)

                if (json.message === "The given data was invalid.") {
                    if ('first_name' in json.errors) {
                        seterrFname(json.errors.first_name[0])
                    }

                    if ('last_name' in json.errors) {
                        seterrLname(json.errors.last_name[0])
                    }

                    if ('gender' in json.errors) {
                        seterrGender(json.errors.gender[0])
                    }

                    if ('birthday' in json.errors) {
                        seterrbdate(json.errors.birthday[0])
                      }

                      if ('middle_name' in json.errors) {
                        seterrMname(json.errors.middle_name[0])
                      }   

                      setisSaving(false)

                }else{
                    alert('Record Successfully saved')
                    setisSaving(false)
                    navigation.goBack()
                }

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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>New Patient</Text>
                    </View>

                    <TouchableOpacity onPress={() => isSaving == true ? null : SavePatientInfo()}>
                        <Text style={{ color: isSaving == true ? 'rgba(33,150,243, 0.3)' : '#008FFB' }}>{isSaving == true ? 'Saving...' : 'DONE'}</Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>


            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                style={{ padding: 20, flex: 1, backgroundColor: 'white' }}
            >
                <View style={{ flex: 1, marginVertical: 10 }}>
                    <View style={{ marginVertical: 10, left: 10, }}>
                        <Text style={{ fontWeight: '700' }}>Name</Text>

                    </View>
                    <View>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10, }}
                            placeholder="First Name*"
                            value={Fname}
                            onChangeText={(text) => setFname(text)}
                        ></TextInput>
                        {!errFname ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errFname}</Text>}

                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }}
                            placeholder="Middle Name*"
                            value={Mname}
                            onChangeText={(text) => setMname(text)}
                        ></TextInput>
                          {!errMname ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errMname}</Text>}
                    </View>
                    <View>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }}
                            placeholder="Last Name*"
                            value={Lname}
                            onChangeText={(text) => setLname(text)}
                        ></TextInput>
                        {!errLname ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errLname}</Text>}
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }}
                            placeholder="Suffix"
                            value={suffix}
                            onChangeText={(text) => setsuffix(text)}
                        ></TextInput>
                    </View>

                    <View style={{ marginVertical: 10, left: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Birthday</Text>
                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => showDatePicker()}>
                            <View>
                                <Text style={[styles.inputs, { color: '#999', }]}>{!insertDate ? 'mm/dd/yyyy*' : insertDate}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                        {!errbdate ? null : <Text style={{ fontSize: 10, color: 'red' }}> {errbdate}</Text>}
                    </View>
                    </View>


                    <View style={{ marginVertical: 10, left: 10 }}>
                        <Text style={{ fontWeight: '700' }}>Gender</Text>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', }}>
                            {GenderOption.map((item, i) => {
                                return (
                                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton


                                            status={selectedgender === item.gender_id ? 'checked' : 'unchecked'}
                                            onPress={() => rbgender(i, item.gender_id)}
                                        />
                                        <Text style={{ fontSize: 16 }}>{item.gender_name}</Text>
                                    </View>
                                )
                            })}



                        </View>

                        {!errGender ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errGender}</Text>}
                    </View>


                    <View style={{ marginVertical: 10, left: 10 }}>
                        <Text style={{ fontWeight: '700' }}>Civil Status</Text>
                    </View>
                    <ScrollView
                        horizontal
                    >
                        <View style={{ flexDirection: 'row', }}>
                            {getCivilStatus.map((item, i) => {
                                return (
                                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton


                                            status={selectedCivil === item.id ? 'checked' : 'unchecked'}
                                            onPress={() => rbcivil(i, item.id)}
                                        />
                                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>


                    <View style={{ marginVertical: 10, left: 10 }}>
                        <Text style={{ fontWeight: '700' }}>Blood Type</Text>
                    </View>
                    <ScrollView
                        horizontal
                    >

                        <View style={{ flexDirection: 'row', }}>
                            {getBloodType.map((item, i) => {
                                return (
                                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton


                                            status={selectedbloodtype === item.id ? 'checked' : 'unchecked'}
                                            onPress={() => rbblood(i, item.id)}
                                        />
                                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                                    </View>
                                )
                            })}
                        </View>


                    </ScrollView>

                    <View style={{ marginVertical: 10, left: 10 }}>
                        <Text style={{ fontWeight: '700' }}>Nationality</Text>
                    </View>
                    <View>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10, }}
                            placeholder="Nationality"
                            value={nationality}
                            onChangeText={(text) => setNationality(text)}
                        ></TextInput>
                    </View>






                </View>

            </ScrollView>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleInsertDateConfirm}
                onCancel={hideDatePicker}
            />
        </>
    )
}

export default PatientAddScreen

const styles = StyleSheet.create({})
