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


const MensAddEdit = ({ navigation, route }) => {
    const Patient_ID = route.params
    const [isSaving, setIsSaving] = useState(false)


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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Menstrual History</Text>
                    </View>

                    <TouchableOpacity
                        // onPress={() => isSaving == true ? null : AddProcedureBtn()}
                    >
                        <Text style={{ color: '#008FFB' }}>{isSaving == true ? 'Saving..' : 'DONE'}</Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>

            <View style={{ flex: 1, padding: 10 }}>
                <View>
                    <Text>Menarche</Text>
                    <TextInput
                        // onChangeText={(text) => setProcedure(text)}
                        placeholder="Insert age of first menstruation"
                        style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                    />
                </View>

                <View style={{marginVertical:10}}>
                    <Text>Average days duration</Text>
                    <TextInput
                        // onChangeText={(text) => setProcedure(text)}
                        placeholder="Insert average days of duration"
                        style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                    />
                </View>
            </View>
        </>
    )
}

export default MensAddEdit

const styles = StyleSheet.create({})
