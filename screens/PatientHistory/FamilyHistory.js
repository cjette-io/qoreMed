import React, {useState, useEffect} from 'react'
import {Animated, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import FabFamilyHistory from './component/FabFamilyHistory'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment'
// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import notes from '../../assets/icons/note.png'


import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../api'

const FamilyHistory = ({navigation, route}) => {

    const Patient_ID = route.params
    const [FamilyHistoryData, setFamilyHistoryData] = useState([])

    useEffect(async() => {
        let token;
        token = await AsyncStorage.getItem('userToken');
        
        fetch(URL + "api/v1/patients/"+Patient_ID+"/history/family-history", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {
              
              
                 console.log(JSON.stringify(json))
               
                setFamilyHistoryData(json)
    
            })
            .catch((error) => {
    
                console.log(error);
    
            });
    
      },[])
    
      const userTap = () => {
        //   navigation.navigate('MedicationAddScreen',Patient_ID)
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Family History</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>

            <View style={styles.container}>
            <View style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%',}}>
                <Text style={{ fontSize:18, fontWeight: 'bold' }}>Genetic Condition</Text>
            <View style={{marginTop:10}}>
                {FamilyHistoryData.map((item, index) => {
                    return (<>
                        <Text style={{fontSize:15}} key={index}>
                                - {item.name} {item.name == 'Other' ? ': '+item.pivot.specify : item.name == 'Cancer' ? item.pivot.specify == null ? '' : ': '+item.pivot.specify : ''}
                            </Text>
                    </>)
                })}
            </View>
            </View>

            <FabFamilyHistory tap={userTap} />
            </View>
        </>
    )
}

export default FamilyHistory
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    deleteBox: {
        backgroundColor: '#008FFB',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '90%',

    },
})