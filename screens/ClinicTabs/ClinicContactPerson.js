import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ScrollView, TextInput,Dimensions } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import URL from '../../api'
// Screen Size
const { width } = Dimensions.get("screen");
const cardWidth = width / 2.5;


const ClinicContactPerson = ({id}) => {

    
    const [contact_person, setcontact_person] = useState('')
    const [email, setemail] = useState('')
    const [phone_number, setphone_number] = useState('')
    const [landline, setlandline]= useState('')
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
              
                console.log(json)
                setcontact_person(json.contact_person)
                setemail(json.contact.email)
                setphone_number(json.contact.phone_number)
                setlandline(json.contact.landline)


            })
            .catch((error) => {

                console.log(error);

            });
    },[])

    const updateCI = () => {
        fetch(URL + 'api/v1/clinics/' + id, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },body: JSON.stringify({
               
                contact_person: contact_person,
                email:'jette@gmail.com',
                phone_number : phone_number,
                landline: landline

          
     
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
        <View style={{flex: 1, padding:20, backgroundColor:'white'}}>
           <View style={{marginVertical:10}}>
               <Text>Grant access to manage your clinic to your secretary by adding the email address of an existing secretary account.</Text>
           </View>

           <View style={{flex:1 }}>
                     <View>
                     <Text style={{fontWeight: 'bold', fontSize:14}}>Name</Text>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Contact Person" value={contact_person} onChangeText={(text) => setcontact_person(text)} ></TextInput>
                    </View>

                    <View style={{marginVertical:10}}>
                    <Text style={{fontWeight: 'bold', fontSize:14}}>Email Address</Text>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Email" value={email} onChangeText={(text) => setemail(text)} ></TextInput>
                    </View>

                    <View>
                    <Text style={{fontWeight: 'bold', fontSize:14}}>Mobile No.</Text>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Mobile No." value={phone_number} onChangeText={(text) => setphone_number(text)} ></TextInput>
                    </View>

                    <View style={{marginVertical:10}}>
                    <Text style={{fontWeight: 'bold', fontSize:14}}>Landline</Text>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Landline" value={landline} onChangeText={(text) => setlandline(text)} ></TextInput>
                    </View>

                    <View style={{alignItems: 'center'}}>
              <TouchableOpacity
              onPress={() => updateCI()}
               style={{borderRadius:10, backgroundColor:'gray', padding:10, width:'80%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize:16, fontWeight:'700',color:'white'}}>Save</Text>
               
              </TouchableOpacity>
          </View>

            </View>

        </View>
    )
}

export default ClinicContactPerson

const styles = StyleSheet.create({})
