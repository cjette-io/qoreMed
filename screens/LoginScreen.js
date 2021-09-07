import React, {useState, useEffect} from 'react'
import {ActivityIndicator, StyleSheet, Text, View, Image, ImageBackground, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get('window')

// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMCI from 'react-native-vector-icons/MaterialIcons';

import Logo from '../assets/images/logoMed.png'

// Facebook Login
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';

// Gmail Login
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


import { AuthContext } from '../context';

// Url Based
import URL from '../api'
const LoginScreen = ({ navigation }) => {

  const { signInSocialAuth } = React.useContext(AuthContext);
  const { signInManualAuth } = React.useContext(AuthContext);

  const [userData, setuserData] = useState([])
  const [idToken, setidToken] = useState('')
  const [loginAuth, setloginAuth] = useState('')

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')

  const [errusername, seterrUsername] = useState('');
  const [errpassword, seterrPassword] = useState('')

  const [manualIDTOKEN , setmanualIDTOKEN] = useState('');

  const [isLoading,setisLoading] = useState(false)

 const DoctorData = [{
    data: JSON.stringify(userData),
    token: idToken,
    socialAuth:loginAuth
  }]


  const DoctorManualData = [{
    token: manualIDTOKEN,
    loginType:'manual'
  
  }]

  if (idToken !== '') {
    signInSocialAuth(DoctorData);
  }

  
  if (manualIDTOKEN !== '') {
    signInManualAuth(DoctorManualData);
  }


  





  React.useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '68351130926-7ib44708f0259n9kkomrh7upjiju86uj.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf 
      forceCodeForRefreshToken: true, 
    })
  },[])


///// Email //////////////////////////////////
const signInGmail = async () => {
  try {
      console.log("Wait...");
      // await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.signIn();

      const userInfo = await GoogleSignin.signIn();
   
      console.log(userInfo);
      setuserData(userInfo);
      setidToken(userInfo.user.id)
      setloginAuth('Gmail')

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("e 1");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("e 2");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("e 3");
      } else {
        console.log(error.message);
      }
    }
}
///// Email /////////////////////////////////




//// Facebook ///////
const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name, first_name, last_name, picture'
      },
    }

    const profileRequest = new GraphRequest('/me', { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log('Login Info has an error:', error)
        }
        else {

    

         
          console.log(result)
          setuserData(result)
          setidToken(result.id)
          setloginAuth('Facebook')


        }
      },
    )

    new GraphRequestManager().addRequest(profileRequest).start()



  }

  const LoginMe = () => {

  

    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('login canceled')
        }
        else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString()
            getInfoFromToken(accessToken)


          })
        }
      },
      error => {
        console.log('login fail with error: ' + console.error(error));
        alert(error.message);
      },
    )

  }




  const ManualLogin = () => {
    seterrUsername('')
    seterrPassword('')

    setisLoading(true)

    fetch(URL + 'api/v1/auth/login', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({

           username: username,
           password : password,
           device_name: 'mobile',

      })
  }).then((response) => response.json())
      .then((json) => {

        // seterrUsername

         console.log(JSON.stringify(json))
         if(json.message === "The given data was invalid."){
          if ('username' in json.errors) {
            seterrUsername(json.errors.username[0])
          }

          if ('password' in json.errors) {
            seterrPassword(json.errors.password[0])
          }

          setisLoading(false)
         }else{
            
            setmanualIDTOKEN(json.token)
          }
       

          // if(json.message === "The given data was invalid.")
          // {
          //   alert(json.errors.username)
          // }else{
          //   console.log(json.token);
          //   setmanualIDTOKEN(json.token)
          // }
          // console.log(json.token);


      }).catch((error) => {
          console.error(error);
      });
  }


    return (
        <>
        <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >

            <View style={styles.container_header}>
                <View>
                    <Image source={Logo} style={{ width: 170, height: 150 }}></Image>
                </View>
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: '#212529', }}>Login to your account</Text>
                    <Text style={{ color: '#999', fontWeight: 'bold' }}>Your Credentials</Text>
                </View>
            </View>

            <View style={{ flex: 1, padding: 20, }}>
                <View>

                    <TextInput
                    
                      onChangeText={(text) => setUsername(text)}  placeholder="Email / Mobile" 

                      style={[styles.inputs,{ borderColor: errusername == '' ? '#3C1053' : 'red'}]}>

                      </TextInput>
                </View>
                <View style={{ marginTop: 10, }}>

                    <TextInput  
                    onChangeText={(text) => setPassword(text)}  
                    secureTextEntry={true} placeholder="Password"
                    style={[styles.inputs,{ borderColor: errpassword == '' ? '#3C1053' : 'red'}]}>
                     </TextInput>
                </View>

                <TouchableOpacity style={{ alignItems: 'flex-end', marginVertical: 20 }}>
                    <Text style={{ fontSize: 16, color: '#2196f3', }}>Forgot Password?</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => isLoading == true ? null : ManualLogin()} style={{flexDirection:'row', justifyContent: 'center', padding: 10, backgroundColor: isLoading == true ? 'rgba(33,150,243, 0.3)' : '#2196f3', borderRadius: 5, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, }}>Login</Text>
                    {isLoading == true ? (
                          <ActivityIndicator size="small" color="white" style={{left:10}} />
                        ) : (null)}
                
                </TouchableOpacity>

                <View style={{marginVertical:5}}>
                  <Text style={{color:'red'}}>{errusername == '' ?  null : `\u2B24 `+errusername }</Text>
                  {errpassword == '' ? (null) : (<Text style={{color:'red'}}>{`\u2B24 `+ errpassword}</Text>)}
                </View>



                <View style={{ marginTop: 20, alignItems: 'center', }}>
                    <View style={{marginVertical: 20,}}>
                        <Text style={{ color: '#999', }}>or sign in with</Text>
                    </View>

                    <View>
                    <TouchableOpacity onPress={() => LoginMe()} style={{ borderWidth: 1, width: 240, padding: 10, borderRadius: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <IconAnt name="facebook-square" color="#4460A0" size={20} />
                        <Text style={{ color: '#4460A0', fontWeight: '700' }}> Login using Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>signInGmail()}style={{ borderWidth: 1, width: 240, padding: 10, borderRadius: 20, alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                        <IconAnt name="googleplus" color='#E74C3C' size={20} />
                        <Text style={{ color: '#E74C3C', fontWeight: '700' }}> Login using Gmail</Text>
                    </TouchableOpacity>
                </View>

                </View>


            </View>

            {/* <View style={{}}>
                <Text>You don't have an account</Text>
            </View> */}

          


            <View style={{flex: 1, padding: 20,  alignItems: 'center', }}>
            
                      <View style={{marginVertical: 20}}>  
                      <Text style={{ color: '#999', }}>You don't have an account</Text>
                      </View>

                        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}style={{backgroundColor:'#11316A', width:'100%',padding: 10, borderRadius: 10, alignItems: 'center',justifyContent: 'center' }}>
                      
                        <Text style={{ color: 'white', fontWeight: '700' }}> Sign up Here</Text>
                    </TouchableOpacity>
                    </View>


        </ScrollView>
        
</>

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: height
    },
    container_header: {
        flex: 0.5,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center'

    },

    header_logo_label: {
        color: 'white',
        fontSize: 22,
        fontWeight: "700",
        fontFamily: 'Montserrat-Black'

    },
    container_footer: {
        flex: 1,
        backgroundColor: 'white',

        padding: 20
    },

    inputs: {
        borderBottomWidth: 0.5,
        borderRadius: 5,
        padding: 10,
       

    }
})
