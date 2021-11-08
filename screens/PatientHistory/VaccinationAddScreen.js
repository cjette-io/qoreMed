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


const VaccinationAddScreen = ({ navigation, route }) => {

    const Patient_ID = route.params
    const [isSaving, setIsSaving] = useState(false)
    const [vaccineCat, setVaccineCat] = useState([])
    const [vaccineParentCat, setVaccineParentCat] = useState([])
    const [brand, setbrand] = useState('')
    const [Dosage, setDosage] = useState('')
    const [Type, setType] = useState('')
    const [Administered, setAdministered] = useState('')
    const [reactions, setreactions] = useState('')


    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dfdpicker, setdfdpicker] = useState("")

    const [isDatePicker2Visible, setDatePicker2Visibility] = useState(false);
    const [dfd2picker, setdfd2picker] = useState("")

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showDatePicker2 = () => {
        setDatePicker2Visibility(true);
    };

    const hideDatePicker2 = () => {
        setDatePicker2Visibility(false);
    };

    const handleConfirm = (data) => {

        var newyear = new Date(data).getFullYear();
        var newDate = new Date(data).getDate();
        var newMonth = new Date(data).getMonth() + 1;

        const DataDate = newMonth + '/' + newDate + '/' + newyear;
        console.log(DataDate);
        setdfdpicker(DataDate)
        setDatePickerVisibility(false);

    }

    const handleConfirm2 = (data) => {

        var newyear = new Date(data).getFullYear();
        var newDate = new Date(data).getDate();
        var newMonth = new Date(data).getMonth() + 1;

        const DataDate = newMonth + '/' + newDate + '/' + newyear;
        console.log(DataDate);
        setdfd2picker(DataDate)
        setDatePicker2Visibility(false);

    }
    const [errVac, setErrVac] = useState('')
    const [ErrDate, setErrDate] = useState('')
    const [selected_vaccine, setselected_vaccine] = useState({
        id: '',
        name: ''
    })

    const containerStyle = { flex: 1, backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 5, marginBottom: 100, };


    useEffect(async () => {
        let token;
        token = await AsyncStorage.getItem('userToken');

        fetch(URL + "api/v1/references/vaccines", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {


                //  console.log(JSON.stringify(json))
                //setPatientMedicationList(json.data.reverse())
                setVaccineCat(json)
            })
            .catch((error) => {

                console.log(error);

            }
            );

        fetch(URL + "api/v1/references/vaccine-categories", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {


                //   console.log('Categories'+JSON.stringify(json))
                //setPatientMedicationList(json.data.reverse())
                //setAllergyCat(json)

                setVaccineParentCat(json)
            })
            .catch((error) => {

                console.log(error);
                setVaccineParentCat([])
            });
    }, [])
    const handleToConfirmForm = (id, name) => {
        setselected_vaccine({
            id: id,
            name: name
        })
        hideModal()

    }

    const AddVaccineBtn = async () => {
        setErrVac('')
        setErrDate('')


        let token;
        token = await AsyncStorage.getItem('userToken');

        if (selected_vaccine.id == '') {
            setErrVac('The vaccine field is required.')
        }

        if (dfdpicker == '') {
            setErrDate("The date administered field is required.")
        }

        if (selected_vaccine != '' && dfdpicker != '') {

            fetch(URL + "api/v1/patients/" + Patient_ID + "/history/vaccinations", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({
                    "vaccine_id": selected_vaccine.id,
                    "date": dfdpicker,
                    "expiration": dfd2picker,
                    "brand": brand,
                    "dosage": Dosage,
                    "type": Type,
                    "administered_by": Administered,
                    "reaction": reactions

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
        <Provider>
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>New Vaccination</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => isSaving == true ? null : AddVaccineBtn()}
                    >
                        <Text style={{ color: '#008FFB' }}>{isSaving == true ? 'Saving..' : 'DONE'}</Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 50 }}
                style={{ flex: 1, padding: 10 }}
            >
                <View>
                    <Text>Vaccines*</Text>
                    <TouchableOpacity
                        onPress={() => showModal()}
                        style={{
                            marginTop: 10,

                        }}>
                        <View style={{
                            borderWidth: 0.5,
                            padding: 10,
                            borderRadius: 10,
                            borderColor: 'gray'
                        }}>
                            <Text style={[styles.inputs, { color: selected_vaccine.name == '' ? '#999' : 'black', }]}>{selected_vaccine.name == '' ? 'Select vaccines' : selected_vaccine.name}</Text>
                        </View>
                    </TouchableOpacity>

                    {errVac != '' ? (<Text style={{ color: 'red' }}>{errVac}</Text>) : null}
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text>Date Administered*</Text>
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
                    {ErrDate != '' ? (<Text style={{ color: 'red' }}>{ErrDate}</Text>) : null}
                </View>


                <View style={{ marginVertical: 10 }}>
                    <Text>Date</Text>
                    <TouchableWithoutFeedback
                        onPress={() => showDatePicker2()}
                        style={{
                            marginTop: 10,

                        }}>
                        <View style={{
                            borderWidth: 0.5,
                            padding: 10,
                            borderRadius: 10,
                            borderColor: 'gray'
                        }}>
                            <Text style={[styles.inputs, { color: '#999', }]}>{!dfd2picker ? 'mm/dd/yyyy' : dfd2picker}</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>

                <View>
                    <Text>Brand</Text>
                    <TextInput
                        onChangeText={(text) => setbrand(text)}
                        placeholder="Insert brand"
                        style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                    />
                </View>


                <View style={{ marginVertical: 10 }}>
                    <Text>Dosage</Text>
                    <TextInput
                        onChangeText={(text) => setDosage(text)}
                        placeholder="Insert Dosage"
                        style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                    />
                </View>
                <View>
                    <Text>Type</Text>
                    <TextInput
                        onChangeText={(text) => setType(text)}
                        placeholder="Insert Type"
                        style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text>Administered By</Text>
                    <TextInput
                        onChangeText={(text) => setAdministered(text)}
                        placeholder="Insert administered by"
                        style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                    />
                </View>

                <View>
                    <Text>Reaction</Text>
                    <TextInput
                        onChangeText={(text) => setreactions(text)}
                        placeholder="Insert reaction"
                        style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                    />
                </View>
            </ScrollView>



            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <ScrollView
                        vertical
                        showsVerticalScrollIndicator={false}

                    >


                        <View>
                            {vaccineParentCat.map((item, i) => {
                                return (
                                    <View style={{ padding: 10 }} key={i}>
                                        <View>
                                            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                        </View>

                                        {vaccineCat.filter(filter => filter.category.name.includes(item.name)).map((item, i) => {
                                            return (
                                                <TouchableOpacity
                                                key={i}
                                                onPress={() => handleToConfirmForm(item.id, item.name,)}

                                            >
                                                <Text> - {item.name}</Text>
                                            </TouchableOpacity>
                                            )
                                        })}

                                    </View>
                                )
                            })}
                        </View>




                    </ScrollView>
                </Modal>
            </Portal>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isDatePicker2Visible}
                mode="date"
                onConfirm={handleConfirm2}
                onCancel={hideDatePicker2}
            />
        </Provider>
    )
}

export default VaccinationAddScreen

const styles = StyleSheet.create({})
