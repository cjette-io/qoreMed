import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,ScrollView, TextInput,Dimensions,Image } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import URL from '../../api'
// Screen Size
const { width } = Dimensions.get("screen");
const cardWidth = width / 2.5;
// REact native Image Picker
import * as ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Feather';

const ClinicInformation = ({id}) => {

    const [photo, setPhoto] = React.useState(null);
    const [DataPhoto, setDataPhoto] = React.useState(null);
    
    const [data,setData] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [landmark, setlandmark] = useState('')
    const [fee, setFee]= useState('')

    const [token , setToken] = useState('')

        useEffect(async () =>{
            let token;
            token = await AsyncStorage.getItem('userToken');
            setToken(token)
            fetch(URL + 'api/v1/clinics/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then((json) => {
                  
                    console.log(json)
                    setName(json.name)
                    setDescription(json.description)
                    setlandmark(json.landmark)
                    setFee(json.fee)
    
    
                })
                .catch((error) => {
    
                    console.log(error);
    
                });
        },[])




        const ChooseImage = () => {
            const options = {
                noData: true,
            };
            ImagePicker.launchImageLibrary(options, (response) => {
                // const source = 'data:image/jpeg;base64,' + response.uri
                // console.log(response.fileName);
                // console.log(response.type);
                // console.log(response.uri);
    
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                    alert(response.customButton);
                } else {
    
    
                    console.log(response.assets[0].fileName);
                    console.log(response.assets[0].type);
                    console.log(response.assets[0].uri);
    
                    setPhoto(response.assets[0].uri);
                    setDataPhoto(response.assets[0])
    
                }
            });
    
        };

        const updateCI = () => {
            fetch(URL + 'api/v1/clinics/' + id, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },body: JSON.stringify({
                   
                    name:name,
                    description:description,
                    landmark : landmark,
                    fee: fee
         
               })
            })
                .then((response) => {
                    if(response.status == 200) {
                       // navigation.goBack()
                        alert ('Clinic Information successfully updated')
                        
                    }else{
                        alert('Something went wrong.')
                    }
                })
                .then((json) => {
                  
                    console.log(json)
                   
    
    
                })
                .catch((error) => {
    
                    console.log(error);
    
                });
        }

        function DisplayImage() {
            return (
                <>
        
    
                    <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }} >
                        <TouchableOpacity style={{ borderColor: 'gray', borderStyle: 'dashed', borderWidth: 1, width: cardWidth, justifyContent: 'center', alignItems: 'center', height: 150, borderRadius: 10 }}
                            onPress={() => ChooseImage()}>
                            {photo == null ? (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="upload-cloud" size={50} style={{ color: 'gray' }} />
                                    <Text style={{ fontFamily: 'RalewayLight-m7nx' }}>Upload Photo</Text>
                                </View>
                            ) : (<Image source={{ uri: photo }} style={{ width: '100%', height: '100%', borderRadius: 10 }}></Image>)}
                        </TouchableOpacity>
                    </View>
                </>
            )
        }
   

    return (
        <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:20}}
         style={{padding:10, flex:1, backgroundColor:'white'}}>

            {DisplayImage()}


            <View style={{flex:1 ,marginVertical:10}}>
                     <View>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Clinic's name" value={name} onChangeText={(text) => setName(text)} ></TextInput>
                    </View>

                    <View style={{marginVertical:10}}>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Description" value={description} onChangeText={(text) => setDescription(text)} ></TextInput>
                    </View>

                    <View>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Landmark" value={landmark} onChangeText={(text) => setlandmark(text)} ></TextInput>
                    </View>

                    <View style={{marginVertical:10}}>
                        <TextInput style={{ borderRadius: 10, backgroundColor: '#F3F2F2', padding: 10 }} placeholder="Consultation Fee" value={fee} onChangeText={(text) => setFee(text)} ></TextInput>
                    </View>

                  

            </View>
            
          <View style={{alignItems: 'center'}}>
              <TouchableOpacity
               onPress={() => updateCI()}
               style={{borderRadius:10, backgroundColor:'gray', padding:10, width:'80%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize:16, fontWeight:'700',color:'white'}}>Save</Text>
               
              </TouchableOpacity>
          </View>
          
          

            
        </ScrollView>
    )
}

export default ClinicInformation

const styles = StyleSheet.create({})
