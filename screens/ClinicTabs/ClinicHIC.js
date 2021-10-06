import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../api'
// Screen Size
const { width } = Dimensions.get("screen");
const cardWidth = width / 2.5;


const ClinicHIC = ({ id }) => {

    const [hci_name, sethci_name] = useState('')
    const [address_1, setaddress_1] = useState('')
    const [address_2, setaddress_2] = useState('')
    const [city, setcity] = useState('')
    const [province, setprovince] = useState('')
    const [accreditation, setaccreditation] = useState('')

    const [token , setToken] = useState('')

    useEffect(async () => {
        let token;
        token = await AsyncStorage.getItem('userToken');
        setToken(token)
        fetch(URL + 'api/v1/clinics/' + id, {
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
                sethci_name(json.hci_name)
                setaddress_1(json.hci_address.address_1)
                setaddress_2(json.hci_address.address_2)
                setcity(json.hci_address.city)
                setprovince(json.hci_address.province)
                setaccreditation(json.accreditation)

            })
            .catch((error) => {

                console.log(error);

            });
    }, [])

    const updateHIC = () => {
        fetch(URL + 'api/v1/clinics/' + id, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },body: JSON.stringify({
               
                hci_name: hci_name,
                hci_address_1:address_1,
                hci_address_2 : address_2,
                hci_province: province,
                hci_city:city,
                accreditation:accreditation

          
     
           })
        }) .then((response) => response.json())
        .then((json) => {
          
            console.log(json)
           


        })
        .catch((error) => {

            console.log(error);

        });
    }


    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
            <ScrollView>

                <View style={{ marginVertical: 10 }}>
                <Text style={{fontWeight: 'bold', fontSize:14}}>Name</Text>
                    <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="HIC Name" value={hci_name} onChangeText={(text) => sethci_name(text)} ></TextInput>
                </View>
                <View>
                <Text style={{fontWeight: 'bold', fontSize:14}}>Address Line 1</Text>
                    <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Address Line 1" value={address_1} onChangeText={(text) => setaddress_1(text)} ></TextInput>
                </View>

                <View style={{ marginVertical: 10 }}>
                <Text style={{fontWeight: 'bold', fontSize:14}}>Address Line 2</Text>
                    <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Address Line 2" value={address_2} onChangeText={(text) => setaddress_2(text)} ></TextInput>
                </View>

                <View>
                <Text style={{fontWeight: 'bold', fontSize:14}}>City</Text>
                    <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="City" value={city} onChangeText={(text) => setcity(text)} ></TextInput>
                </View>

                <View style={{ marginVertical: 10 }}>
                <Text style={{fontWeight: 'bold', fontSize:14}}>Province</Text>
                    <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Province" value={province} onChangeText={(text) => setprovince(text)} ></TextInput>
                </View>

                <View style={{ marginVertical: 10 }}>
                <Text style={{fontWeight: 'bold', fontSize:14}}>Accreditation No.</Text>
                    <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Accreditation" value={accreditation} onChangeText={(text) => setaccreditation(text)} ></TextInput>
                </View>


                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => updateHIC()}style={{ borderRadius: 10, backgroundColor: 'gray', padding: 10, width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>Save</Text>

                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
}

export default ClinicHIC

const styles = StyleSheet.create({})
