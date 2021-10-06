import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ScrollView, TextInput,Dimensions } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import URL from '../../api'
// Screen Size
const { width } = Dimensions.get("screen");
const cardWidth = width / 2.5;

import Icon from 'react-native-vector-icons/Feather';

const ClinicAddress = ({id}) => {

    const [address_1, setaddress_1] = useState('')
    const [address_2, setaddress_2] = useState('')
    const [city, setcity] = useState('')
    const [province, setprovince]= useState('')
    const [token , setToken] = useState('')

    useEffect(async () =>{
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
                setaddress_1(json.address.address_1)
                setaddress_2(json.address.address_2)
                setcity(json.address.city)
                setprovince(json.address.province)


            })
            .catch((error) => {

                console.log(error);

            });
    },[])

    const updateCA = () => {
        fetch(URL + 'api/v1/clinics/' + id, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },body: JSON.stringify({
               
                address_1:address_1,
                address_2:address_2,
                city : city,
                province : province
     
           })
        })
            .then((response) => response.json())
            .then((json) => {
              
                console.log(json)
               


            })
            .catch((error) => {

                console.log(error);

            });
    }

    return (
      
        <View style={{padding:10,flex:1 ,backgroundColor:'white'}}>
                     <View  style={{marginTop:10}}>
                     <Text style={{fontWeight: 'bold', fontSize:14}}>Address Line 1</Text>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Address Line 1" value={address_1} onChangeText={(text) => setaddress_1(text)} ></TextInput>
                    </View>

                    <View style={{marginVertical:10}}>
                    <Text style={{fontWeight: 'bold', fontSize:14}}>Address Line 2</Text>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Address Line 2" value={address_2} onChangeText={(text) => setaddress_2(text)} ></TextInput>
                    </View>

                    <View>
                    <Text style={{fontWeight: 'bold', fontSize:14}}>City</Text>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="City" value={city} onChangeText={(text) => setcity(text)} ></TextInput>
                    </View>

                    <View style={{marginVertical:10}}>
                    <Text style={{fontWeight: 'bold', fontSize:14}}>Province</Text>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Province" value={province} onChangeText={(text) => setprovince(text)} ></TextInput>
                    </View>

                    <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => updateCA()}style={{borderRadius:10, backgroundColor:'gray', padding:10, width:'80%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize:16, fontWeight:'700',color:'white'}}>Save</Text>
               
              </TouchableOpacity>
          </View>

            </View>
    
    )
}

export default ClinicAddress

const styles = StyleSheet.create({})
