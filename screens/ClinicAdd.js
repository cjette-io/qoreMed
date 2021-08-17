import React from 'react'
import {FlatList, StyleSheet, Text, View,SafeAreaView, ScrollView,TouchableOpacity, Dimensions} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';


// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import notes from '../assets/icons/note.png'

//Size Screen

const { width, height } = Dimensions.get("window");
const widthSize = width;
const heightSize = height;
const cardWidth = width / 2 - 20;

import URL from '../api'

const ClinicAdd = ({navigation}) => {

    const TabItemsData = [
        {
            id:'0',
            tabname:'CLINIC INFORMATION'
        },
        {
            id:'1',
            tabname:'ADDRESS'
        },
        {
            id:'2',
            tabname:'CONTACT PERSON / SECRETARY ACCOUNT'
        },
        {
            id:'3',
            tabname:'HCI INFORMATION'
        },
]

const [selectedTab, setselectedTab] = React.useState(0)
const selectThis = (data) => {
    // alert(data)
    setselectedTab(data);
}

const TabItem = () => {
    const renderItem = ({ item, i }) => {

        return (
            <>
                <TouchableOpacity onPress={() => selectThis(item.id)}  style={[styles.tabsContainer,{borderBottomWidth:(selectedTab == item.id) ? 2 : null,
                    borderBottomColor:(selectedTab == item.id) ? 'black' : null
       
                    }]}>
                        <Text style={[styles.tabsLabel,{fontWeight: (selectedTab == item.id) ? 'bold' : 'normal'}]}>{item.tabname}</Text>
                    </TouchableOpacity>
            </>
        )
    }
    return (
        <View>
         <FlatList


contentContainerStyle={{paddingBottom: 50}}
data={TabItemsData}
horizontal
showsHorizontalScrollIndicator={false}

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
                        <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>New Clinic</Text>
                    </View>

                    <View>

                    </View>


                </View>
            </SafeAreaView>

        <View style={{ flex: 1 }}>
           {/* {TabItem()} */}

        </View>
        </>
    )
}

export default ClinicAdd

const styles = StyleSheet.create({
    tabsContainer: {
        flexGrow:1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
     tabsLabel: {
         fontSize:15,
        
     }
})
