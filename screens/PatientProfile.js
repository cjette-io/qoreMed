import React, {useEffect,useState} from 'react'
import {Dimensions, StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback, ScrollView, Image, SafeAreaView } from 'react-native'


import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

// dummy picture
import Avatar from '../assets/images/icon_man.png'

// Icon Set
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconION from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import URL from '../api'
const { width, height } = Dimensions.get("window");
const cardWidth = width / 4;

const PatientProfile = ({navigation, route}) => {

    const Patient_ID = route.params

    const [Patient_Data, setPatientData] =useState([])
    const [PatientBday, setPatientBday] =useState('')
    const [BloodType, setBloodType] = useState('')
    const [CivilStatus,setCivilStatus] = useState('')
    const [Gender, setGender] = useState('')

    useEffect(async() => {
        let token;
        token = await AsyncStorage.getItem('userToken');
       
    
        fetch(URL + 'api/v1/patients/'+Patient_ID, {
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

                 setPatientData(json)
                 if (json.profile.birthday != null)
                 {
                    
                    setPatientBday(json.profile.birthday)
                 }

                 if (json.profile.blood_type.name != null)
                 {
                    setBloodType(json.profile.blood_type.name)
                 }

                 if (json.profile.blood_type.name != null)
                 {
                    setCivilStatus(json.profile.civil_status.name)
                 }

                 if (json.profile.gender != null)
                 {
                    setGender(json.profile.gender)
                 }

               
    
            })
            .catch((error) => {
    
                console.log(error);
    
            });
    },[])

  

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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Patient Profile</Text>
                    </View>

                    <View>
                          
                    </View>


                </View>
            </SafeAreaView>
            <View style={styles.container}>
                <ScrollView
                    vertical
                    showsVerticalScrollIndicator={false}
                    style={styles.container}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <Image source={{uri: Patient_Data.photo_url}} style={styles.Avatar}></Image>
                    <Text style={styles.nameText}>{Patient_Data.full_name}</Text>
                    <Text style={styles.daysText}>Patient ID: {Patient_Data.patient_no}</Text>

                    <View style={{alignItems: 'center', marginVertical:15}}>
                        <TouchableOpacity style={{padding:10, backgroundColor:'#008FFB', borderRadius:10}}>
                            <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>

                        <View style={{marginTop:5, padding:20}}>
                                <View style={{flexDirection: 'row', }}>
                                    <Text>Birthdate: {moment(PatientBday).format('ll')}</Text>  
                                     
                                </View>   
                                <View style={{flexDirection: 'row', }}>
                                    {/* <Text>Gender:{Patient_Data.profile.gender}</Text>   */}
                                     
                                </View> 
                                <View style={{flexDirection: 'row', }}>
                                    <Text>BloodType: {BloodType}</Text>  
                                     
                                </View>  
                                <View style={{flexDirection: 'row', }}>
                                    <Text>Civil Status: {CivilStatus}</Text>  
                                     
                                </View>  
                                <View style={{flexDirection: 'row', }}>
                                    <Text>Gender: {Gender === 'male' ? 'MALE' : 'FEMALE'}</Text>  
                                     
                                </View> 

                    <View>
                        
                    </View>

                                
                                
                        </View>

                    <View style={{ padding: 10, }}>
                        {/* History */}
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('HistoryList',Patient_Data.id)}>
                        <View style={styles.menuRowContent}>
                            <View style={styles.iconContent}>
                                <Foundation
                                    name="clipboard-notes"
                                    size={26}
                                    color='black'
                                    style={{ alignSelf: "center", backgroundColor: 'rgba(0,143,251,0.2)', padding: 10, borderRadius: 5 }}
                                />
                            </View>
                            <View style={styles.menuRowsContent}>
                                <Text style={styles.menuRowTitle}>History</Text>

                            </View>
                            <IconMCI
                                name="greater-than"
                                size={18}
                                color='rgba(0,143,251,0.5)'
                                style={{ alignSelf: "center" }}
                            />
                        </View>
                        </TouchableWithoutFeedback>
                        {/* <Divider style={styles.divider} /> */}

                        {/* Vitals */}
                        
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('VitalsList',Patient_Data.id)}>
                        <View style={styles.menuRowContent}>
                            <View style={styles.iconContent}>
                                <FontAwesome5
                                    name="heartbeat"
                                    size={24}
                                    color='black'
                                    style={{ alignSelf: "center", backgroundColor: 'rgba(0,143,251,0.2)', padding: 10, borderRadius: 5 }}
                                />
                            </View>
                            <View style={styles.menuRowsContent}>
                                <Text style={styles.menuRowTitle}>Vitals</Text>

                            </View>
                            <IconMCI
                                name="greater-than"
                                size={18}
                                color='rgba(0,143,251,0.5)'
                                style={{ alignSelf: "center" }}
                            />
                        </View>
                        </TouchableWithoutFeedback>

                        {/* Notes */}

                        <View style={styles.menuRowContent}>
                            <View style={styles.iconContent}>
                                <IconMCI
                                    name="comment-edit-outline"
                                    size={24}
                                    color='black'
                                    style={{ alignSelf: "center", backgroundColor: 'rgba(0,143,251,0.2)', padding: 10, borderRadius: 5 }}
                                />
                            </View>
                            <View style={styles.menuRowsContent}>
                                <Text style={styles.menuRowTitle}>Notes</Text>

                            </View>
                            <IconMCI
                                name="greater-than"
                                size={18}
                                color='rgba(0,143,251,0.5)'
                                style={{ alignSelf: "center" }}
                            />
                        </View>


                        {/* Lab Results */}

                        <View style={styles.menuRowContent}>
                            <View style={styles.iconContent}>
                                <Entypo
                                    name="lab-flask"
                                    size={24}
                                    color='black'
                                    style={{ alignSelf: "center", backgroundColor: 'rgba(0,143,251,0.2)', padding: 10, borderRadius: 5 }}
                                />
                            </View>
                            <View style={styles.menuRowsContent}>
                                <Text style={styles.menuRowTitle}>Lab Results</Text>

                            </View>
                            <IconMCI
                                name="greater-than"
                                size={18}
                                color='rgba(0,143,251,0.5)'
                                style={{ alignSelf: "center" }}
                            />
                        </View>

                        {/* Schedule New Appointments */}
                        <View style={styles.menuRowContent}>
                            <View style={styles.iconContent}>
                                <AntDesign
                                    name="calendar"
                                    size={24}
                                    color='black'
                                    style={{ alignSelf: "center", backgroundColor: 'rgba(0,143,251,0.2)', padding: 10, borderRadius: 5 }}
                                />
                            </View>
                            <View style={styles.menuRowsContent}>
                                <Text style={styles.menuRowTitle}>Schedule New Appointment</Text>
                                <Text style={styles.menuRowSubtitle}>
                                    Schedule this patient next appointment
                                </Text>
                            </View>
                            <IconMCI
                                name="greater-than"
                                size={18}
                                color='rgba(0,143,251,0.5)'
                                style={{ alignSelf: "center" }}
                            />
                        </View>














                </View>
                </ScrollView>
            </View>

        </>
    )
}

export default PatientProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: { paddingBottom: 100},
    Avatar: {
        width: 130,
        height: 130,
        borderRadius: 36,
        borderColor: 'blue',
        borderWidth: 0.5,
        alignSelf: "center",
        marginTop: 36
    },
    nameText: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "600",
        marginTop: 16,
        color: 'black'
    },
    daysText: {
        alignSelf: "center",
        fontSize: 14,
        marginTop: 6,
        color: 'black'
    },
    menuRowContent: {
        flexDirection: "row",
        paddingStart: 12,
        paddingEnd: 16,
        paddingVertical: 16,
        alignItems: "center",
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 10
    },
    iconContent: {
        width: 45
    },
    menuRowsContent: { paddingHorizontal: 8, flex: 1 },
    menuRowTitle: {
        fontSize: 17
    },
    menuRowSubtitle: {
        fontSize: 12,
        marginTop: 4
    },
    divider: { marginStart: 46 }
})
