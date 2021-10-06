import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Modal, Portal, Provider, RadioButton } from 'react-native-paper';
import IconION from 'react-native-vector-icons/Ionicons';

import URL from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectMultiple from 'react-native-select-multiple'



const MedicalHistoryAddScreen = ({ navigation, route }) => {

    const Patient_ID = route.params
    const [isSaving, setIsSaving] = useState(false)
    const [getHealthCondition, setHealthCondition] = useState([])
    const [selectedHealthCondition, setSelectedHealthCondition] = useState([])

   

    useEffect(async () => {
        let token;
        token = await AsyncStorage.getItem('userToken');
        fetch(URL + 'api/v1/references/health-conditions', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {
                let reMap = []


                json.map((item) => {
                    reMap.push(
                        {
                            value: item.id,
                            label: item.name,
                        }
                    )

                })
                //  console.log(reMap)
                setHealthCondition(reMap)
               

                //  console.log(JSON.stringify(json))


            })
            .catch((error) => {

                console.log(error);

            });
    }, [])


    useEffect(async() => {
        let token;
        token = await AsyncStorage.getItem('userToken');
        fetch(URL + "api/v1/patients/" + Patient_ID + "/history/medical-history", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {

                let reMap = []


                json.map((item) => {
                    reMap.push(
                        {
                            value: item.id,
                            label: item.name,
                        }
                    )

                })
              
                setSelectedHealthCondition(reMap)

            })
            .catch((error) => {

                console.log(error);

            });
    },[])


    const onSelectionsChange = (selected) => {
        // selectedFruits is array of { label, value }
        setSelectedHealthCondition(selected)
      }



      const checkArrays = async() => {
        setIsSaving(true)
        let result = selectedHealthCondition.map(a => a.value);
        let token;
        token = await AsyncStorage.getItem('userToken');
        fetch(URL + "api/v1/patients/" + Patient_ID + "/history/medical-history", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                health_conditions : result
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>MEDICAL HISTORY</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => isSaving == true ? null : checkArrays()}
                    >
                        <Text style={{ color: '#008FFB' }}>{isSaving == true ? 'Saving..' : 'DONE'}</Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>
            <View style={{flex:1, paddingBottom:50}}>
                <SelectMultiple
                    items={getHealthCondition}
                    selectedItems={selectedHealthCondition}
                    onSelectionsChange={onSelectionsChange}
                />
            </View>

        </>
    )
}

export default MedicalHistoryAddScreen

const styles = StyleSheet.create({})
