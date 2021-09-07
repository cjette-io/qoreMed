import React, { useState, useEffect } from 'react'
import {
    Animated,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    ScrollView,
    LayoutAnimation,
    Platform,
    ToastAndroid
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'


import moment from 'moment'

import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../api'

const { height, width } = Dimensions.get('window');
const cardWidth = width / 3 * 0.90

import tapme from '../assets/icons/tap.gif'
import calendarVital from '../assets/images/calendarVital.png'

import FabVital from './components/FabVital'

const ExpandableComponent = ({ item, onClickFunction }) => {

    const [layoutHeight, setlayoutHeight] = useState(0)

    useEffect(() => {
        if (item.isExpanded) {
            setlayoutHeight(null)
        } else {
            setlayoutHeight(0)
        }
    }, [item.isExpanded])

    return (
        <View style={{ marginVertical: 5 }}>
            <TouchableOpacity onPress={onClickFunction} style={{justifyContent:'space-between',flexDirection: 'row', borderLeftWidth: 4, borderColor: '#008FFB', padding: 15, backgroundColor: 'white', borderRadius: 5, elevation: 5, width: '100%',alignItems: 'center'}}>
                <Text style={{fontSize:16, fontWeight: 'bold'}}>{moment(item.date).format('LLL')}</Text>
               <Image source={calendarVital} style={{height:25,width:25}}></Image>
            </TouchableOpacity>
            <View style={{ height: layoutHeight, overflow: 'hidden',  }}>
                {

                    item.items.map((item, index) => (
                        <TouchableOpacity key={index} style={{marginVertical:5, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{fontWeight: 'bold'}}>{item.vital_type.name} - </Text>
                            <Text style={{color:'#2196f3'}}>{item.vital}</Text>
                        </TouchableOpacity>
                    ))

                }
            </View>

        </View>
    )
}



const VitalsList = ({ navigation, route }) => {

    const Patient_id = route.params
    const [Vitals, setVitals] = useState([])
    const [multiSelect, setmultiSelect] = useState(false)

    useEffect(async () => {


        let token;
        token = await AsyncStorage.getItem('userToken');

        fetch(URL + "api/v1/patients/" + Patient_id + "/vitals", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => response.json())
            .then((json) => {



                // setVitals(json.data)

                // setMedicalData(json)
                const data = json.data;

                const mappedData = data.map((item, index) => {
                    return {
                        ...item,
                        isExpanded: false,
                    }
                })


                setVitals(mappedData)

             


            })
            .catch((error) => {

                console.log(error);

            });

    }, [])

    const userTap = () => {
        // navigation.navigate('MedicationAddScreen', Patient_ID)
       navigation.navigate('VitalAddScreen', Patient_id)
    
    }


    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        const array = [...Vitals]

        if (multiSelect) {
            array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
            array.map((value, placeindex) =>
                placeindex === index
                    ? (array[placeindex]['isExpanded']) = !array[placeindex]['isExpanded']
                    : (array[placeindex]['isExpanded']) = false
            )
        }
        setVitals(array)
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Vitals</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>
            <View style={styles.container}>

                <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {Vitals.map((item, index) => {
                        return (

                            <ExpandableComponent
                                item={item}
                                key={index}
                                onClickFunction={() => {
                                    updateLayout(index)
                                }}
                            />

                        )
                    })}

                </ScrollView>

                <FabVital tap={userTap} />
            </View>
        </>
    )
}

export default VitalsList
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




// ToDO
// Map -> restructure kang Array
// ref:
// https://reactnative.dev/docs/layoutanimation
// https://www.youtube.com/watch?v=eU6q7fez1zU