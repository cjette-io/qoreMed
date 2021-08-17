import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, TextInput, ScrollView, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Modal, Portal, Provider } from 'react-native-paper';

import moment from 'moment';

// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import notes from '../../assets/icons/note.png'

import AsyncStorage from '@react-native-async-storage/async-storage';

// Url Based
import URL from '../../api'
const MedicationAddScreen = ({ navigation, route }) => {

    const Patient_ID = route.params

    const containerStyle = { flex: 1, backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 5, marginBottom: 100, };

    const [generic_name, setgeneric_name] = useState('')




    const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
    const [dfdpicker, setdfdpicker] = useState("")
    const [medicineForm, setmedicineForm] = useState({
        id: '',
        name: ''
    })

    const [formMedication, setformMedication] = useState([])

    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const showFromDatePicker = () => {
        setFromDatePickerVisibility(true);
    };
    const hideFromDatePicker = () => {
        setFromDatePickerVisibility(false);
    };
    const showToDatePicker = () => {
        setToDatePickerVisibility(true);
    };
    const hideToDatePicker = () => {
        setToDatePickerVisibility(false);
    };
    const handleFromConfirm = (data) => {

        var newyear = new Date(data).getFullYear();
        var newDate = new Date(data).getDate();
        var newMonth = new Date(data).getMonth() + 1;

        const DataDate = newMonth + '/' + newDate + '/' + newyear;
        console.log(DataDate);
        setFromDatePickerVisibility(false);

    }
    const handleToConfirm = (data) => {

        var newyear = new Date(data).getFullYear();
        var newDate = new Date(data).getDate();
        var newMonth = new Date(data).getMonth() + 1;

        const DataDate = newMonth + '/' + newDate + '/' + newyear;
        console.log(DataDate);
        setToDatePickerVisibility(false);

    }


    const handleToConfirmForm = (id, name) => {
        setmedicineForm({
            id: id,
            name: name
        })
        hideModal()

    }


    useEffect(async () => {
        let token;
        token = await AsyncStorage.getItem('userToken');


        fetch(URL + 'api/v1/references/medication-forms', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {

                setformMedication(json)

                console.log(JSON.stringify(json))

            })
            .catch((error) => {

                console.log(error);

            });

    }, [])


    const AddMedicationBtn = () => {

        alert('Coming Soon')

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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Medication History</Text>
                    </View>

                    <TouchableOpacity
                     onPress={() => AddMedicationBtn()}
                    >
                        <Text style={{ color: '#008FFB' }}>DONE</Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                vertical
                showsVerticalScrollIndicator={false}
                bounces={false} style={{ flex: 1, backgroundColor: 'white', padding: 20 }}
            >
                <View>
                    <Text>Generic Name*</Text>
                    <TextInput
                        value={generic_name}
                        onChangeText={(text) => setgeneric_name(text)}
                        style={styles.inputs}
                        placeholder="Insert generic name"></TextInput>
                </View>
                <View>
                    <Text>Brand Name</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Insert brand name"></TextInput>
                </View>
                <View>
                    <Text>Dose</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Insert dose"></TextInput>
                </View>
                <View >
                    <Text>Medicine Form</Text>

                    <TouchableWithoutFeedback onPress={() => showModal()} style={{ marginTop: 5, }}>
                        <View>
                            <Text style={[styles.inputs, { color: '#999', }]}>{medicineForm.name == '' ? 'Select Medication Form' : medicineForm.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <Text>Qty</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Insert quantity"></TextInput>
                </View>

                <View>
                    <Text>Frequency</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Select sig frequency"></TextInput>
                </View>

                <View>
                    <Text>Duration</Text>

                    <View>
                        <Text>From</Text>
                        <TouchableWithoutFeedback onPress={() => showFromDatePicker()} style={{ marginTop: 5, }}>
                            <View>
                                <Text style={[styles.inputs, { color: '#999', }]}>{!dfdpicker ? 'mm/dd/yyyy' : dfdpicker}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <Text>To</Text>

                        <TouchableWithoutFeedback onPress={() => showToDatePicker()} style={{ marginTop: 5, }}>
                            <View>
                                <Text style={[styles.inputs, { color: '#999', }]}>{!dfdpicker ? 'mm/dd/yyyy' : dfdpicker}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View>
                        <Text>Note</Text>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Insert note"></TextInput>
                    </View>
                </View>


                {/* <View style={{alignItems: 'center', marginTop:20}}>
              <TouchableOpacity
            //    onPress={() => updateCI()}
               style={{borderRadius:10, backgroundColor:'gray', padding:10, width:'80%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize:16, fontWeight:'700',color:'white'}}>Save</Text>
               
              </TouchableOpacity>
          </View> */}



                <DateTimePickerModal
                    isVisible={isFromDatePickerVisible}
                    mode="date"
                    onConfirm={handleFromConfirm}
                    onCancel={hideFromDatePicker}
                />
                <DateTimePickerModal
                    isVisible={isToDatePickerVisible}
                    mode="date"
                    onConfirm={handleToConfirm}
                    onCancel={hideToDatePicker}
                />
            </ScrollView>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <ScrollView
                        vertical
                        showsVerticalScrollIndicator={false}
                        style={{ height: 500 }}>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', fontFamily: 'OpenSans-Regular' }}>SELECT MEDICINE FORM</Text>
                        </View>

                        <View style={{ marginTop: 10, }}>
                            {formMedication.map((item, index) => {
                                return (
                                    <>
                                        <TouchableOpacity key={index}
                                            onPress={() => handleToConfirmForm(item.id, item.name,)}
                                            style={{ borderLeftWidth: 4, borderColor: '#4CD7D0', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%', marginBottom: 10 }}
                                        >
                                            <Text>{item.name}</Text>
                                        </TouchableOpacity>
                                    </>
                                )
                            })}
                        </View>
                    </ScrollView>
                </Modal>
            </Portal>
        </Provider>
    )
}

export default MedicationAddScreen

const styles = StyleSheet.create({
    inputs: {
        borderBottomWidth: 0.5,
        padding: 10,
        borderColor: '#3C1053'

    }
})
