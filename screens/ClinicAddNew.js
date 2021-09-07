import React, {useState, useEffect} from 'react'
import {SafeAreaView, StyleSheet, Text, View,TouchableOpacity,ScrollView, TextInput,Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import URL from '../api'

// Screen Size
const { width } = Dimensions.get("screen");
const cardWidth = width / 2.5;
// REact native Image Picker

import * as ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Feather';
import IconION from 'react-native-vector-icons/Ionicons';

const ClinicAddNew = ({navigation}) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address_1, setaddress_1] = useState('')
    const [address_2, setaddress_2] = useState('')
    const [city, setcity] = useState('')
    const [province, setprovince]= useState('')
    const [landmark, setlandmark] = useState('')
    const [fee, setFee]= useState('')
    
    const [token , setToken] = useState('')

    
    const [isSaving, setisSaving] = useState(false)

    const [errName, seterrName] = useState('')
    const [errFee, seterrFee] = useState('')



    useEffect(async() =>{
        let token;
        token = await AsyncStorage.getItem('userToken');
        setToken(token)
       
    },[])

    const AddClinic = () => {
        setisSaving(true)
        seterrName(null)
        seterrFee(null)

        fetch(URL + 'api/v1/clinics', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },body: JSON.stringify({
               
                name:name,
                description:description,
                landmark : landmark,
                address_1:address_1,
                address_2:address_2,
                city : city,
                province : province,
                fee: fee
     
           })
        })
            .then((response) => response.json())
            .then((json) => {
              
                console.log(json)

                if (json.message === "The given data was invalid.") {
                    if ('name' in json.errors) {
                        seterrName(json.errors.name[0])
                    }
                    if ('fee' in json.errors) {
                        seterrFee(json.errors.fee[0])
                    }
                    setisSaving(false)
                }else{
                    alert('Clinic Successfully Added')
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
                style={{ padding: 10, backgroundColor: 'white', }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IconION name="arrow-back" size={20} color='black' />
                        </TouchableOpacity>

                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>New Clinic</Text>
                    </View>

                    <View>
                    <TouchableOpacity onPress={() => isSaving == true ? null : AddClinic()}>
                        <Text style={{ color: isSaving == true ? 'rgba(33,150,243, 0.3)' : '#008FFB' }}>{isSaving == true ? 'Saving...' : 'DONE'}</Text>
                    </TouchableOpacity>
                    </View>


                </View>
            </SafeAreaView>


        <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:20}}
         style={{padding:10, flex:1, backgroundColor:'white'}}>

          

            <View style={{flex:1 ,marginVertical:10}}>
                     <View>
                     <Text style={{fontSize:16, fontWeight:'bold'}}>Clinic Name*</Text>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Clinic's name*" value={name} onChangeText={(text) => setName(text)} ></TextInput>
                        {!errName ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errName}</Text>}

                    </View>

                    <View style={{marginVertical:10}}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Description</Text>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Description" value={description} onChangeText={(text) => setDescription(text)} ></TextInput>
                    </View>

                    <View  style={{marginTop:10}}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Address</Text>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Address Line 1" value={address_1} onChangeText={(text) => setaddress_1(text)} ></TextInput>
                    </View>

                    <View style={{marginVertical:10}}>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Address Line 2" value={address_2} onChangeText={(text) => setaddress_2(text)} ></TextInput>
                    </View>

                    <View>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="City" value={city} onChangeText={(text) => setcity(text)} ></TextInput>
                    </View>

                    <View style={{marginVertical:10}}>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Province" value={province} onChangeText={(text) => setprovince(text)} ></TextInput>
                    </View>

                    <View>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Landmark" value={landmark} onChangeText={(text) => setlandmark(text)} ></TextInput>
                    </View>

                    <View style={{marginVertical:10}}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Consultation Fee*</Text>
                        <TextInput
                         style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} 
                         placeholder="Consultation Fee"
                         keyboardType="numeric"
                          value={fee} onChangeText={(text) => setFee(text)}/>
                    
                        {!errFee ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errFee}</Text>}

                    </View>

                  

            </View>
            
          {/* <View style={{alignItems: 'center'}}>
              <TouchableOpacity
               onPress={() => AddClinic()}
               style={{borderRadius:10, backgroundColor:'gray', padding:10, width:'80%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize:16, fontWeight:'700',color:'white'}}>Save</Text>
               
              </TouchableOpacity>
          </View> */}
          
          

            
        </ScrollView>
        </>
    )
}

export default ClinicAddNew

const styles = StyleSheet.create({})
