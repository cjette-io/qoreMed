import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Modal, Portal, Provider, RadioButton } from 'react-native-paper';
// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../api'

const AllergyAddScreen = ({ navigation, route }) => {

    // const Filter_Drugs = allergyData.filter(filter => filter.category.name == 'Drug');
    const Patient_ID = route.params

    const [allergyCat, setAllergyCat] = useState([])
    const [allergyData, setallergyData] = useState([])

    const [isSaving, setIsSaving] = useState(false)

    const [selected_allergy, setselected_allergy] = useState({
        id: '',
        name: ''
    })
    const [selected_severe, setselected_severe] = React.useState('');
    const [react, setreactions] = useState('')
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    const containerStyle = { flex: 1, backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 5, marginBottom: 100, };

    const severities = [
        { id: "mild", name: "Mild" },
        { id: "moderate", name: "Moderate" },
        { id: "severe", name: "Severe" },
    ]

    useEffect(async () => {
        let token;
        token = await AsyncStorage.getItem('userToken');

        fetch(URL + "api/v1/references/allergies", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setallergyData(json)

                // console.log(JSON.stringify(json))
                //setPatientMedicationList(json.data.reverse())


            })
            .catch((error) => {

                console.log(error);

            });

        fetch(URL + "api/v1/references/allergy-categories", {
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
                //setPatientMedicationList(json.data.reverse())
                setAllergyCat(json)
            })
            .catch((error) => {

                console.log(error);

            });
    }, [])


    const handleToConfirmForm = (id, name) => {
        setselected_allergy({
            id: id,
            name: name
        })
        hideModal()

    }

    const rbSevere = (i, id) => {
        setselected_severe(id)
    }

    const AddAllergyBtn = async() => {
        setIsSaving(true)

        if(selected_severe == '' || selected_allergy.id == '' ){
            alert('All fields are required')
            setIsSaving(false)
        }else{
            let token;
            token = await AsyncStorage.getItem('userToken');
    
            fetch(URL + "api/v1/patients/" + Patient_ID + "/history/allergies", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({
                    allergy_id: selected_allergy.id,
                    severity: selected_severe,
                    reaction: react,
                    
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>New Allergy History</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => isSaving == true ? null : AddAllergyBtn()}
                    >
                        <Text style={{ color: '#008FFB' }}>{isSaving == true ? 'Saving..' : 'DONE'}</Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>
            <View style={{ flex: 1, padding: 10 }}>

                <View>
                    <Text>Allergy*</Text>
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
                            <Text style={[styles.inputs, { color: selected_allergy.name == '' ? '#999' : 'black', }]}>{selected_allergy.name == '' ? 'Select allergy' : selected_allergy.name}</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{ marginVertical: 10 }}>
                    <View style={{marginBottom:10}}>
                    <Text >Severity*</Text>
                    </View>
                    {severities.map((item, i) => {
                        return (
                            <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton


                                status={selected_severe === item.id ? 'checked' : 'unchecked'}
                                onPress={() => rbSevere(i, item.id)}
                                />
                                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                            </View>
                        )
                    })}
                </View>

                <View>
                    <Text>Reaction*</Text>
                    <TextInput
                         onChangeText={(text) => setreactions(text)}
                        placeholder="Insert reaction"
                        style={{ 
                            borderWidth: 0.5,
                            padding: 6,
                            borderRadius: 10,
                            borderColor: 'gray'
                         }}
                    />
                </View>
            </View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <ScrollView
                        vertical
                        showsVerticalScrollIndicator={false}

                    >
                        {allergyCat.map((item, i) => {
                            return (
                                <View style={{ padding: 10 }} key={i}>

                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                    </View>

                                    {allergyData.filter(filter => filter.category.name.includes(item.name)).map((item, i) => {
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
                    </ScrollView>
                </Modal>
            </Portal>
        </Provider>
    )
}

export default AllergyAddScreen

const styles = StyleSheet.create({

})
