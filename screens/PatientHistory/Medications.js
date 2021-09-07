import React, { useState, useEffect } from 'react'
import { Animated, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import FabMedications from './component/FabMedications'
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

const Medications = ({ navigation, route }) => {
    const Patient_ID = route.params


    const [PatientMedicationList, setPatientMedicationList] = useState([])


    // const MedicationHistoryData = [
    //     {
    //         id: '1001',
    //         genericName: "Biogesic",
    //         brandName: "Paracetamol",
    //         dose: "50mg",
    //         form: "pills",
    //         qty: 10,
    //         frequency: "4x a Day (Every 6 Hours)",
    //         duration: "07/08/2021 - 07/12/2021",
    //         note: "None"


    //     }
    // ]

    useEffect( () => {
        const unsubscribe = navigation.addListener('focus', async() => {
            let token;
            token = await AsyncStorage.getItem('userToken');
    
            fetch(URL + "api/v1/patients/" + Patient_ID + "/history/medications", {
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
                    setPatientMedicationList(json.data.reverse())
    
                })
                .catch((error) => {
    
                    console.log(error);
    
                });
        });
        return unsubscribe;
    }, [navigation])

    const userTap = () => {
        navigation.navigate('MedicationAddScreen', Patient_ID)
    }



    const MedicationList = () => {
        const renderItem = ({ item, i }) => {


            const rightSwipe = (progress, dragX) => {
                const scale = dragX.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                });
                return (
                    <TouchableOpacity onPress={() => alert(item.id)} activeOpacity={0.6}>
                        <View style={styles.deleteBox}>
                            <Entypo name="trash" size={20} color="white" />
                            <Animated.Text style={{ color: 'white', fontWeight: 'bold' }}>
                                Delete
                            </Animated.Text>
                        </View>
                    </TouchableOpacity>
                );
            };

            const LeftSwipe = (progress, dragX) => {
                const scale = dragX.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                });
                return (
                    <TouchableOpacity activeOpacity={0.6}>
                        <View style={styles.deleteBox}>
                            <AntDesign name="edit" size={20} color="white" />
                            <Animated.Text style={{ color: 'white', fontWeight: 'bold' }}>
                                Edit
                            </Animated.Text>
                        </View>
                    </TouchableOpacity>
                );
            };

            return (
                

                    <View key={i + '-' + item.id} >
                        <Swipeable renderLeftActions={LeftSwipe} renderRightActions={rightSwipe}>

                            <View style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%', marginVertical:5 }}>
                                <View style={{ flex: 1 }}>

                                    <View style={{ flex: 1 }}>

                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name:</Text>
                                            <Text numberOfLines={2} style={{ fontSize: 18 }}>{item.brand_name}</Text>
                                            <Text style={{ fontSize: 14 }}>{item.generic_name}</Text>
                                        </View>

                                        <View style={{ marginTop: 5 }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Dose:</Text>
                                            <Text>{item.dose} {item.medicationForm.name} #{item.quantity}</Text>
                                         
                          
                                        </View>


                                        <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sig:</Text>
                                        <Text numberOfLines={1}>{item.medicationFrequency.name}</Text>
                                            <Text numberOfLines={1}>{moment(item.duration_from).format('LL')}-{moment(item.duration_to).format('LL')}</Text>
                                            <Text>Note: {item.note}</Text>
                                        </View>


                                       



                                    </View>




                                </View>


                            </View>
                        </Swipeable>
                    </View>


            )
        }

        return (
            <View style={{ flex: 1 }}>

                <FlatList


                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={PatientMedicationList.reverse()}
                    vertical
                    showsVerticalScrollIndicator={false}

                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}

                />
            </View>
        )
    }

    return (
        <>
            <SafeAreaView
                style={{ padding: 10, backgroundColor: 'white' }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IconION name="arrow-back" size={20} color='black' />
                        </TouchableOpacity>

                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Medication History</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>
            <View style={styles.container}>


                {MedicationList()}



                <FabMedications tap={userTap} />

            </View>
        </>
    )
}

export default Medications

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
        height: '100%',
    },
})
