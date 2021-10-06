import React, {useState, useEffect} from 'react'
import {Animated,Alert, FlatList, StyleSheet, Text, Image, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Swipeable from 'react-native-gesture-handler/Swipeable';


// Icon Set
import Entypo from 'react-native-vector-icons/Entypo';
import IconION from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather'

import Loader from '../assets/images/preloader.gif'

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../api'



//Size Screen

const { width, height } = Dimensions.get("window");
const widthSize = width;
const heightSize = height;

const cardWidth = width / 3;

const ClinicDetails = ({route, navigation}) => {

    const dataFromRoute = route.params
    const clinic_id = dataFromRoute.id

    const [clinicSched, setclinicSched] = useState([])
    const [clinicDetails, setclinicDetails] = useState([])
    const [clinicName, setclinicName] = useState('')
    const [clinicAddress, setclinicAddress] = useState('')
    const [loading, setLoading] = React.useState(true);
    const [token, setToken] = useState('')
    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState('...');

    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState('...');


    const data = route.params

    useEffect( () => {
        console.log(data.address.full_address)
        const unsubscribe = navigation.addListener('focus', async() => {
            let token;
            token = await AsyncStorage.getItem('userToken');
              setToken(token)
         const address = data.address.full_address == null ? 'Manila bay' : data.address.full_address

            // setToken(token)
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ address +'&key=AIzaSyBZ7qllWiR_SHlzIxi3y5s4u9UxJ-eYJlQ')
                .then((response) => response.json())
                .then((json) => {
                     console.log(json);
    
                    // {"lat": 13.1640029, "lng": 123.749247}
    
                    setCurrentLongitude(json.results[0].geometry.bounds.northeast.lng)
                    setCurrentLatitude(json.results[0].geometry.bounds.northeast.lat)
                 
                    //  setCurrentLongitude(json.results[0].location.lng)
                    //  setCurrentLatitude(json.results[0].location.lat)
                 
                 
                 
                    setLoading(false);
    
                })
                .catch((error) => {
    
                    console.log(error);
    
                });
    
            fetch(URL + 'api/v1/clinics/' + data.id + '/schedules', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then((json) => {
                  
                    setclinicSched(json)
                    // console.log(JSON.stringify(json))
    
                })
                .catch((error) => {
    
                    console.log(error);
    
                });


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
        
                    //   console.log(JSON.stringify(json));
                    //   const  data = JSON.stringify(json.address.full_address);
                    //   console.log(data);
                        
                         setclinicDetails(json)
                         setclinicAddress(json.address.full_address)
                         setclinicName(json.name)
                        
                    })
                    .catch((error) => {
            
                        console.log(error);
            
                    });
        });
        return unsubscribe;



    }, [navigation])

    // useEffect(async() => {
    //     let token;
    //     token = await AsyncStorage.getItem('userToken');
    //     fetch(URL + 'api/v1/clinics/' + clinic_id, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             Authorization: 'Bearer ' + token
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((json) => {

    //         //   console.log(JSON.stringify(json));
    //         //   const  data = JSON.stringify(json.address.full_address);
    //         //   console.log(data);
                
    //              setclinicDetails(json)
    //              setclinicAddress(json.address.full_address)
    //              setclinicName(json.name)
                
    //         })
    //         .catch((error) => {
    
    //             console.log(error);
    
    //         });

    // },[])


    
const Load =  async() => {
    let token;
    token = await AsyncStorage.getItem('userToken');
   

    fetch(URL + 'api/v1/clinics/' + data.id + '/schedules', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then((response) => response.json())
        .then((json) => {
          
            setclinicSched(json)
            // console.log(JSON.stringify(json))

        })
        .catch((error) => {

            console.log(error);

        });
}

    const DeleteClinic = (id, name) => {


        const confirmDelete = async() => {
            let token;
            token = await AsyncStorage.getItem('userToken');

            fetch(URL + 'api/v1/clinics/' + id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then((json) => {
                  
                    navigation.navigate('ClinicList')
    
    
                })
                .catch((error) => {
    
                    console.log(error);
    
                });
        }



        Alert.alert(
            "Delete Clinic Confirmation",
            "Are you sure you want to delete clinic " + name + "?",
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => confirmDelete() }
            ]
          );

    } 
    
    
    const DeleteSched = (id) => {

        const confirmDelete = async() => {

            setLoading(true)

            let token;
            token = await AsyncStorage.getItem('userToken');

            fetch(URL + 'api/v1/schedules/' + id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    Load()
                    setLoading(false)
    
                })
                .catch((error) => {
    
                    console.log(error);
    
                });
        }

        Alert.alert(
            "Delete Schedule Confirmation",
            "Are you sure you would like to delete this schedule from the clinic?",
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => confirmDelete() }
            ]
          );
    }

    const  EditSched = (item) => {
        navigation.navigate('ClinicEditSchedule',
        {
           data:item,
           id : data.id,
           token: token,
        })
    }


    const clinic_sched = () => {
   

        
       return (
            clinicSched.map((item, index) => {

                const rightSwipe = (progress, dragX) => {
                    const scale = dragX.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, 1],
                        extrapolate: 'clamp',
                    });
                    return (
                        <TouchableOpacity key={index} onPress={() => DeleteSched(item.id)} activeOpacity={0.6}>
                            <View style={styles.deleteBox}>
                                <Entypo name="trash" size={20} color="white"/>
                                <Animated.Text style={{color:'white', fontWeight:'bold'}}>
                                    Delete
                                 </Animated.Text>
                            </View>
                        </TouchableOpacity>
                    );
                }; 
                const leftSwipe = (progress, dragX) => {
                    const scale = dragX.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, 1],
                        extrapolate: 'clamp',
                    });
                    return (
                        <TouchableOpacity onPress={() => EditSched(item)} activeOpacity={0.6}>
                            <View style={styles.deleteBox}>
                                <Entypo name="edit" size={20} color="white"/>
                                <Animated.Text style={{color:'white', fontWeight:'bold'}}>
                                    Edit
                                 </Animated.Text>
                            </View>
                        </TouchableOpacity>
                    );
                }; 


                return (  <Swipeable renderLeftActions={leftSwipe}  renderRightActions={rightSwipe}>
                    <View style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%',  marginBottom:10, }}  key={index + '-' + item.id}>
                       <Text>{item.day_of_week}</Text>
                        <Text style={{fontSize:16, fontWeight: 'bold'}}>{item.formatted_start_time} - {item.formatted_end_time}</Text>
                        {/* <Text>{item.type}</Text> */}
                        <Text>{item.is_virtual  === false ? 'On-Site Consultation' : 'Virtual Consultation'}</Text>
                    </View>
                </Swipeable>)
            })

            )
        
    }




    const test= () => {
        alert(clinicDetails.address.full_address)
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

                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text numberOfLines={1} style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>{clinicName}</Text>
                        <Text numberOfLines={1} style={{ fontFamily: 'NunitoSans-Bold', fontSize: 10 }}>{clinicAddress == '' ? 'Address not setup' : clinicAddress}</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>

            {loading === true ? (
                <View
                    style={{
                        ...StyleSheet.absoluteFill,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "white"
                    }}
                >
                    <Image source={Loader}
                        style={{
                            width: 300,
                            height: 300
                        }}
                    ></Image>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                   
                        <View style={styles.container_header}>
                            <MapView
                                style={styles.map}
                                region={{

                                    latitude: parseFloat(currentLatitude),
                                    longitude: parseFloat(currentLongitude),
                                    // latitude: 13.1640029,
                                    // longitude: 123.749247,
                                    latitudeDelta: 0.002,
                                    longitudeDelta: 0.002,
                                }}

                                onPress={(event) => console.log(event.nativeEvent.coordinate)}
                            >
                                <Marker coordinate={{ latitude: parseFloat(currentLatitude), longitude: parseFloat(currentLongitude), }}
                                    title="I'm Here"
                                />
                            </MapView>
                        </View>
                        <ScrollView
                        showsVerticalScrollIndicator={false}
                       contentContainerStyle={{paddingBottom: 50}}
                        style={{ flex: 1, backgroundColor:'white'}}
                     >
                        <View style={styles.container_footer}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>

                                <TouchableOpacity onPress={() => navigation.navigate('ClinicEdit',{
                                    id : data.id
                                })}  style={{ backgroundColor: 'rgba(0,143,251,0.2)', marginHorizontal: 10, padding: 5,width:60, flexDirection: 'row'}}>
                                   <AntDesign name="edit" size={20}></AntDesign>
                                   <Text> Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => DeleteClinic(data.id,data.name)} style={{ backgroundColor: 'rgba(255, 0, 0,0.3)', padding: 5, flexDirection: 'row',width:70,}}>
                                    <MaterialCommunityIcons name="trash-can-outline" size={20}></MaterialCommunityIcons>
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: '700' }}>Schedule</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('ClinicAddSchedule',{
                                        id : data.id,
                                        token: token,
                                    })}>
                                        <Text>+ New Schedule</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop:10}}>
                                    {clinic_sched()}
                                </View>
                               


                                <View style={{ marginTop: 20 }}>
                                    <View>
                                        <Text style={{ fontWeight: '700' }}>Contact Information</Text>
                                    </View>
                                    <View style={{ marginTop: 25, flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <View style={{borderRadius:10, alignItems: 'center', justifyContent: 'center', width: cardWidth - 20, backgroundColor:'rgba(246, 171, 182,0.3)', height:80 }}>
                                         <Feather name="users" size={20}></Feather>
                                            <Text numberOfLines={2} style={{fontSize:10, marginTop:5}}>{data.contact_person == null ? "Not setup" : data.contact_person}</Text>
                                        </View>
                                        <View style={{borderRadius:10, alignItems: 'center', justifyContent: 'center', width: cardWidth - 20, backgroundColor: 'rgba(202, 241, 222,0.3)',}}>
                                           
                                            <MaterialCommunityIcons name="email-multiple-outline" size={20}></MaterialCommunityIcons>
                                            <Text numberOfLines={2} style={{fontSize:10, marginTop:5}}>{data.contact.email == null ? "Not setup" : data.contact.email}</Text>
                                        </View>
                                        <View style={{borderRadius:10, alignItems: 'center', justifyContent: 'center', width: cardWidth - 20, backgroundColor:'rgba(255, 231, 199,0.3)',  }}>
                                        <MaterialCommunityIcons name="cellphone-android" size={20}></MaterialCommunityIcons>
                                       
                                            <Text  numberOfLines={2} style={{fontSize:10, marginTop:5}}>{data.contact.phone_number == null ? "Not setup" : data.contact.phone_number}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <View>
                                    <Text style={{ fontWeight: '700' }}>Address</Text>
                                    </View>
                                    <View style={{flexDirection:'row', borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, width: '100%', marginTop: 10, justifyContent:data.address.full_address == null ? 'flex-start' : 'center' }} >
                                                <MaterialCommunityIcons name="map-marker-radius" size={20} color='red'></MaterialCommunityIcons>
                                                <Text numberOfLines={2} style={{fontSize:13, fontWeight: 'bold', }}> {data.address.full_address == null ? 'Address not setup' : data.address.full_address}</Text>
                                                {/* <Text>{item.type}</Text> */}
                                               
                                            </View>
                                </View>
                                
                            

                            </View>
                        </View>
                        </ScrollView>

                   
                </View>
            )}
        </>
    )
}

export default ClinicDetails

const styles = StyleSheet.create({
    container_header: {
        flex: 0.3,
        backgroundColor: '#3C1053'
    },
    map: {
        flex: 1
    },

    container_footer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20
    },

    deleteBox: {
        backgroundColor: '#008FFB',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '90%',
      
    },
})
