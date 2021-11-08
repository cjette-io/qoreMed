import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'

import Logo from '../assets/images/ayos_doc.png'
import { CommonActions } from '@react-navigation/native';

// Url Based
import URL from '../api'


const RegisterSuccess = ({ route, navigation }) => {
     const {email } = route.params
    
    const loginScreen = CommonActions.reset({
        index: 1,
        routes: [{ name: 'LoginScreen'}]
    });
    const ProceedToLogin = () => {
        navigation.dispatch(loginScreen);
    }

    const Resend = () => {
        fetch(URL + 'api/v1/auth/resend-verification', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
          
              email: email,
         
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
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
            <View style={{ alignItems: 'center' }}>
                <Image source={Logo} style={{ width: 190, height: 120 }}></Image>
            </View>

            <View style={{ alignItems: 'center' }}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Verify Your Email Address</Text>
                    <Text style={{ textAlign: 'center' }}>{email}</Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 13, textAlign: 'center' }}>Before proceeding, please check your email for a verification link.</Text>
                </View>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, padding: 10 }}>
                    <TouchableOpacity 
                    onPress={() => ProceedToLogin()}
                    style={{ backgroundColor: '#080023', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>Go to Login </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, padding: 10 }}>
                    <TouchableOpacity 
                    onPress={() => Resend()}
                    style={{ backgroundColor: '#EF4A23', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>Resend</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default RegisterSuccess

const styles = StyleSheet.create({})
