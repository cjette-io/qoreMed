import React, {useState, useEffect} from 'react'
import {Animated, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
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

const Allergies = ({navigation, route}) => {
    const Patient_ID = route.params
    const [AllergyHistoryData, setAllergyHistoryData] = useState([])


    useEffect(async() => {

        
        let token;
        token = await AsyncStorage.getItem('userToken');
        
        fetch(URL + "api/v1/patients/"+Patient_ID+"/history/allergies", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {
              
              
                 console.log(JSON.stringify(json.data))
                 setAllergyHistoryData(json.data)
    
            })
            .catch((error) => {
    
                console.log(error);
    
            });
    
      },[])

    //   const userTap = () => {
    //     navigation.navigate('MedicationAddScreen',Patient_ID)
    // }


    const AllergyList = () => {
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
                            <Entypo name="trash" size={20} color="white"/>
                            <Animated.Text style={{color:'white', fontWeight:'bold'}}>
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
                        <AntDesign name="edit" size={20} color="white"/>
                        <Animated.Text style={{color:'white', fontWeight:'bold'}}>
                                Edit
                      </Animated.Text>
                        </View>
                    </TouchableOpacity>
                );
            };

            return (
                <>
                
                    <View key={i + '-' + item.id} >
                <Swipeable renderLeftActions={LeftSwipe} renderRightActions={rightSwipe}>
                   
                        <View style={{ borderLeftWidth: 4, borderColor: '#008FFB', padding: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%', height: 140, marginBottom:10 }}>
                            <View style={{flexDirection:'row', justifyContent: 'space-between',flex:1}}>

                                <View style={{flex:1}}>

                                    <View style={{flex:1}}>
                                      <View style={{flexDirection:'row'}}>
                                      <Text style={{fontSize:16, fontWeight: 'bold'}}>Category</Text>
                                      <Text style={{fontSize:16, fontWeight: 'bold'}}>: {item.allergy.category}</Text>
                                      </View>
                                        <Text numberOfLines={2} style={{ fontSize: 18 }}>{item.allergy.name} </Text>
                                        <Text numberOfLines={1} style={{ fontSize: 15, color: item.severity == 'mild' ? 'pink' : item.severity == 'moderate' ? 'orange' : 'red'}}>Severity - {item.severity} </Text>
                                    </View>

                                    <View style={{ marginTop: 20,}}>
                                        <Text numberOfLines={2}>Reaction: {item.reaction}</Text>
                                       
                                    </View>



                                </View>



                                <View style={{ justifyContent:"center", alignItems:'center'}}>
                                <Image source={notes}></Image>
                                </View>

                            </View>


                        </View>
                </Swipeable>
                    </View>


                </>
            )
        }

        return (
            <View style={{ flex: 1 }}>

                <FlatList


                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={AllergyHistoryData}
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Allergies History</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>

            <View style={styles.container}>


                {AllergyList()}


                {/* <FabProcedure /> */}

            </View>
       </>
    )
}

export default Allergies

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
