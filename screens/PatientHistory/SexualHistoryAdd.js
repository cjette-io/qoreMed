import React, { useEffect, useState } from 'react'
import {LogBox , SafeAreaView, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Modal, Portal, Provider, RadioButton } from 'react-native-paper';
import IconION from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../api'

import SelectMultiple from 'react-native-select-multiple'


const SexualHistoryAdd = ({ navigation, route }) => {

    LogBox.ignoreAllLogs();

    const Patient_ID = route.params
    const [isSaving, setIsSaving] = useState(false)
    const [getContraceptive, setContraceptive] = useState([])
    const [selectedContraceptive, setSelectedContraceptive] = useState([])

    const [Coitarche, setCoitarche] = useState('')
    const [NSP, setNSP] = useState('')
    const [CPW, setCPW] = useState('')

    const [selectedDyspareunia, setDyspareunia] = useState('')
    const [selectedPCB,setSelectedPCB] = useState('')

    useEffect(async() => {
        let token;
        token = await AsyncStorage.getItem('userToken');
        fetch(URL + "api/v1/patients/" + Patient_ID + "/history/sexual-history", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {


                 //console.log(JSON.stringify(json))
                //   setSubstancesHistoryData(json)
                // setSexualData(json)
                // setcontraceptivesItems(json.contraceptive_items)
                if (json.coitarche != null) {
                    setCoitarche(json.coitarche)
                }
                if (json.sexual_partners != null) {
                    setNSP(json.sexual_partners)
                }
                if (json.coitus_weekly != null) {
                    setCPW(json.coitus_weekly)
                }

                if (json.contraceptive_items.length > 0) {
                    let reMap = []
                    json.contraceptive_items.map((item) => {
                        reMap.push(
                            {
                                value: item.id,
                                label: item.name,
                            }
                        )
                    })

                    setSelectedContraceptive(reMap)
                }

                if (json.dyspareunia != null ){
                    setDyspareunia(json.dyspareunia)
                }
                if (json.bleeding != null ){
                    setSelectedPCB(json.bleeding)
                }


            })
            .catch((error) => {

                console.log(error);

            });

    },[])


    useEffect(async () => {
        let token;
        token = await AsyncStorage.getItem('userToken');
        fetch(URL + 'api/v1/references/contraceptives', {
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
                setContraceptive(reMap)


            })
            .catch((error) => {

                console.log(error);

            });
    }, [])

   

    const Dyspareunia = [
        {
            id: 'with',
            label: 'With'
        },
        {
            id: 'without',
            label: 'Without'
        },
        {
            id: 'unknown',
            label: 'Unknown'
        }
    ]

    const rbiD = (id) => {
        setDyspareunia(id)
    }

  
    const PCB = [
        {
            id: 'with',
            label: 'With'
        },
        {
            id: 'without',
            label: 'Without'
        },
        {
            id: 'unknown',
            label: 'Unknown'
        }

    
    ]

    const rbpcb = (id) => {
        setSelectedPCB(id)
    }



   const onSelectionsChange = (selected) => {
    // selectedFruits is array of { label, value }
    setSelectedContraceptive(selected)
  }


  const checkArrays = async() => {
    setIsSaving(true)
    let result = selectedContraceptive.map(a => a.value);
    let token;
    token = await AsyncStorage.getItem('userToken');

    
    fetch(URL + "api/v1/patients/" + Patient_ID + "/history/sexual-history", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
            coitarche: Coitarche,
            sexual_partners: NSP,
            coitus_weekly: CPW,
            dyspareunia:selectedDyspareunia,
            bleeding : selectedPCB,
            contraceptives : result
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

  const renderLabel = (label, style) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        
        <View style={{marginLeft: 10}}>
          <Text style={style}>{label}</Text>
        </View>
      </View>
    )
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>SEXUAL HISTORY</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => isSaving == true ? null : checkArrays()}
                    >
                        <Text style={{ color: '#008FFB' }}>{isSaving == true ? 'Saving..' : 'DONE'}</Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>

            <ScrollView 
            contentContainerStyle={{
                backgroundColor: 'white',
                paddingBottom:100, 
            padding:10 }}
           >
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Coitarche*</Text>
                    <View>
                        <TextInput
                            onChangeText={(text) => setCoitarche(text)}
                            value={Coitarche}
                            placeholder="Insert age of first coitus"
                            style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                            keyboardType="numeric"

                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Number of sexual partners*</Text>
                    <View>
                        <TextInput
                            onChangeText={(text) => setNSP(text)}
                             value={NSP}
                            placeholder="Insert number of sexual partners"
                            style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Coitus per week*</Text>
                    <View>
                        <TextInput
                            onChangeText={(text) => setCPW(text)}
                            value={CPW}
                            placeholder="Insert coitus per week"
                            style={{ top: 5, borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: 'gray' }}
                            keyboardType="numeric"

                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Dyspareunia*</Text>
                    <View>
                        {Dyspareunia.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                    status={selectedDyspareunia === item.id ? 'checked' : 'unchecked'}
                                    onPress={() => rbiD(item.id)}
                                    />
                                    <Text style={{ fontSize: 16 }}>{item.label}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Post Coital Bleeding*</Text>
                    <View>
                        {PCB.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                    status={selectedPCB === item.id ? 'checked' : 'unchecked'}
                                     onPress={() => rbpcb(item.id)}
                                    />
                                    <Text style={{ fontSize: 16 }}>{item.label}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Contraceptives*</Text>
                    <View>
                      

                        <SelectMultiple
                            items={getContraceptive}
                           
                             selectedItems={selectedContraceptive}
                             onSelectionsChange={onSelectionsChange}
                             />
                    </View>
                </View>

             
            </ScrollView>
        </>
    )
}

export default SexualHistoryAdd

const styles = StyleSheet.create({})
