import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native'


//Size Screen

const { width, height } = Dimensions.get("window");
const widthSize = width;
const heightSize = height;
const cardWidth = width / 2 - 20;

// Icon Set
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconION from 'react-native-vector-icons/Ionicons';

// dummy icons
import medication from '../assets/icons/medication.png'
import vaccine from '../assets/icons/vaccination.png'
import procedure from '../assets/icons/procedure.png'
import allergy from '../assets/icons/allergy.png'
import sexual from '../assets/icons/sexual.png'
import family from '../assets/icons/family.png'
import substance from '../assets/icons/substance.png'
import medicalHistory from '../assets/icons/medicalHistory.png'

const HistoryList = ({ navigation, route }) => {

    const { Patient_ID, Gender } = route.params

    const History = [
        {
            title: 'Medications',
            icon: medication,
            url: 'Medications',
            type: 'male'
        },
        {
            title: 'Vaccinations',
            icon: vaccine,
            url: 'Vaccination',
            type: 'male'
        },
        {
            title: 'Procedures',
            icon: procedure,
            url: 'Procedures',
            type: 'male'
        },
        {
            title: 'Allergies',
            icon: allergy,
            url: 'Allergies',
            type: 'male'
        },
        {
            title: 'Substance Use',
            icon: substance,
            url: 'Substances',
            type: 'male'
        },
        {
            title: 'Sexual History',
            icon: sexual,
            url: 'SexualHistory',
            type: 'male'
        },
        {
            title: 'Medical History',
            icon: medicalHistory,
            url: 'MedicalHistory',
            type: 'male'
        },
        {
            title: 'Family History',
            icon: family,
            url: 'FamilyHistory',
            type: 'male'
        },
        {
            title: 'Menstrual History',
            icon: family,
            url: 'MenstrualHistory',
            type: 'female'
        },
    ]

    useEffect(() => {
        console.log(Gender)
    }, [])


    const numColumns = 3;
    const formatData = (History, numColumns) => {
        const totalRows = Math.floor(History.length / numColumns)
        let totalLastRow = History.length - (totalRows * numColumns)

        while (totalLastRow !== 0 && totalLastRow !== 3) {
            History.push({ key: 'blank', empty: true })
            totalLastRow++

        }

        return History
    }

    const navigateScreen = (url, type) => {

        if (Gender == 'male' && type == 'male') {
            navigation.navigate(url, Patient_ID)
        }

    }


    const navigateScreenForFemale = (url) => {


        navigation.navigate(url, Patient_ID)


    }
    const HistoryListContent = () => {
        const renderItem = ({ item, i }) => {

            if (item.empty) {
                return (
                    <View style={[styles.ItemContainer, styles.ItemInvisible]}>
                    </View>

                )

            }


            return (
                <>
                    {Gender === 'male' && <TouchableOpacity
                        onPress={() => navigateScreen(item.url, item.type)}
                        style={[styles.ItemContainer, item.type === 'male' ? null : styles.ItemInvisible]}>

                        {item.type === 'male' ? <Image source={item.icon}></Image> : null}
                        {item.type === 'male' ? <Text>{item.title}</Text> : null}

                    </TouchableOpacity>}

                    {Gender === 'female' && <TouchableOpacity
                        onPress={() => navigateScreenForFemale(item.url)}
                        style={[styles.ItemContainer]}>
                        <Image source={item.icon}></Image>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>}
                </>
            )
        }



        return (
            <View style={{ flex: 1 }}>
                <FlatList


                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={formatData(History, numColumns)}
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={numColumns}
                    keyExtractor={item => `${item.title}`}
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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Patient History</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>

            <View style={{ flex: 1, padding: 10, }}>
                {HistoryListContent()}
            </View>
        </>
    )
}

export default HistoryList

const styles = StyleSheet.create({

    ItemContainer: {
        backgroundColor: 'white',
        flex: 1,
        height: widthSize / 3,
        margin: 5,
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',




    },
    ItemInvisible: {
        backgroundColor: 'transparent',
        elevation: 0
    }
})
