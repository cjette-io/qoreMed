import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'


import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../api'

const ClinicDetails = ({route, params}) => {

    const dataFromRoute = route.params
    const clinic_id = dataFromRoute.id

    const [clinicDetails, setclinicDetails] = useState([])
    const [clinicName, setclinicName] = useState('')

    useEffect(async() => {
        let token;
        token = await AsyncStorage.getItem('userToken');
        fetch(URL + 'api/v1/clinics/' + clinic_id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {

              console.log(JSON.stringify(json));
              const  data = JSON.stringify(json.address.full_address);
              console.log(data);
                
                 setclinicDetails(json)
                 setclinicName(json.address.full_address)
                
            })
            .catch((error) => {
    
                console.log(error);
    
            });

    },[])

    const test= () => {
        alert(clinicDetails.address.full_address)
    }
    return (
        <View>
            <TouchableOpacity onPress={() => test()}>
                <Text>{clinicName}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ClinicDetails

const styles = StyleSheet.create({})
