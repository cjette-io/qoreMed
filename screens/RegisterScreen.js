import React, { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View, Image, ImageBackground, ScrollView, Dimensions, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";


const { width, height } = Dimensions.get('window')

// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import Logo from '../assets/images/ayos_doc.png'


import { AuthContext } from '../context';


// Url Based
import URL from '../api'


// Facebook Login
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';

// Gmail Login
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


const RegisterScreen = ({ navigation }) => {

  const { signInSocialAuth } = React.useContext(AuthContext);


  const [date, setDate] = useState(new Date())
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [userData, setuserData] = useState([])
  const [idToken, setidToken] = useState('')
  const [loginAuth, setloginAuth] = useState('')

  const [signInwith, setSignInWith] = useState(true)
  const [isLoading, setisLoading] = useState(false)

  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [prc_number, setprc_number] = useState("")
  const [dfdpicker, setdfdpicker] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [mobile, setmobile] = useState("")
  const [password, setpassword] = useState("")

  const [errEmail, seterremail] = useState(null)
  const [errMobile, seterrMobile] = useState(null)
  const [errprc, seterrprc] = useState(null)
  const [errbdate, seterrbdate] = useState(null)
  const [errpword, seterrpword] = useState(null)

  const [errFname, seterrFname] = useState(null)
  const [errLname, seterrLname] = useState(null)

  const [passwordVisible, setpasswordVisible] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const DoctorData = [{
    data: JSON.stringify(userData),
    token: idToken,
    socialAuth: loginAuth
  }]

  if (idToken !== '') {
    signInSocialAuth(DoctorData);
  }

  const handleConfirm = (data) => {

    var newyear = new Date(data).getFullYear();
    var newDate = new Date(data).getDate();
    var newMonth = new Date(data).getMonth() + 1;

    const DataDate = newMonth + '/' + newDate + '/' + newyear;
    console.log(DataDate);
    setdfdpicker(DataDate)
    setDatePickerVisibility(false);

  }



  const signup = () => {

    // reset()
    setisLoading(true)

    seterrMobile(null)
    seterremail(null)
    seterrFname(null)
    seterrLname(null)
    seterrprc(null)
    seterrbdate(null)
    seterrpword(null)

    if (signInwith == true) {

      if (fname == '' || lname == '' || prc_number == '' || regEmail == '' || password == '') {
        alert('All fields are required')
        setisLoading(false)
      }else {
      fetch(URL + 'api/v1/auth/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: fname,
          last_name: lname,
          prc_number: prc_number,
          birthdate: dfdpicker,
          email: regEmail,
          password: password,
          password_confirmation: password
        })
      })
        .then((response) => response.json())
        .then((json) => {

          console.log(json)

          if (json.message === "The given data was invalid.") {

            if ('email' in json.errors) {
              seterremail(json.errors.email[0])
            }

            if ('first_name' in json.errors) {
              seterrFname(json.errors.first_name[0])
            }
            if ('last_name' in json.errors) {
              seterrLname(json.errors.last_name[0])
            }

            // if ('mobile' in json.errors) {
            //   seterrMobile(json.errors.mobile[0])
            // }
            if ('prc_number' in json.errors) {
              seterrprc(json.errors.prc_number[0])
            }
            if ('birthdate' in json.errors) {
              seterrbdate(json.errors.birthdate[0])
            }

            if ('password' in json.errors) {
              seterrpword(json.errors.password[0])
            }

            setisLoading(false)


          } else if (json.message === "Thanks for signing up!") {

            Alert.alert(
              "Verify Your Email Address: " + regEmail,
              "Before proceeding, please check your email for a verification link.",
              [
                {
                  text: "Close",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Resend", onPress: () => console.log("OK Pressed") }
              ]
            );




            // alert(json.message)
            // setisLoading(false)
            // navigation.navigate('LoginScreen')
          }




        })
        .catch((error) => {

          console.log(error);

        });

      }
    } else {

      if (fname == '' || lname == '' || prc_number == '' || mobile == '' || password == '') {
        alert('All fields are required')
      } else {
        fetch(URL + 'api/v1/auth/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            first_name: fname,
            last_name: lname,
            prc_number: prc_number,
            birthdate: dfdpicker,

            mobile: mobile,
            password: password,
            password_confirmation: password
          })
        })
          .then((response) => response.json())
          .then((json) => {

            console.log(json)

            if (json.message === "The given data was invalid.") {

              // if ('email' in json.errors) {
              //   seterremail(json.errors.email[0])
              // }

              if ('first_name' in json.errors) {
                seterrFname(json.errors.first_name[0])
              }
              if ('last_name' in json.errors) {
                seterrLname(json.errors.last_name[0])
              }

              if ('mobile' in json.errors) {
                seterrMobile(json.errors.mobile[0])
              }
              if ('prc_number' in json.errors) {
                seterrprc(json.errors.prc_number[0])
              }
              if ('birthdate' in json.errors) {
                seterrbdate(json.errors.birthdate[0])
              }

              if ('password' in json.errors) {
                seterrpword(json.errors.password[0])
              }

              setisLoading(false)

            } else if (json.message === "Thanks for signing up!") {
              alert(json.message)
              setisLoading(false)
              navigation.navigate('LoginScreen')
            }




          })
          .catch((error) => {

            console.log(error);

          });

      }


    }

  }

  React.useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '68351130926-7ib44708f0259n9kkomrh7upjiju86uj.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf 
      forceCodeForRefreshToken: true,
    })
  }, [])

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

  const toggleEmailMobile = () => {
    setSignInWith(!signInwith)
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
            <Image source={Logo} style={{ width: 190, height: 120 }}></Image>
          </View>
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: '#212529', }}>Create your account</Text>
          </View>
        </View>

        <View style={{ flex: 1, padding: 20, }}>
          <TouchableOpacity onPress={() => toggleEmailMobile()} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <Text style={{ color: '#2196f3' }}>{signInwith == true ? 'Sign up with mobile number' : 'Sign up with email address'}</Text>
          </TouchableOpacity>

          {signInwith == true ? (
            <View>
              <TextInput
                keyboardType='email-address'
                onChangeText={(text) => setRegEmail(text)}
                placeholder="Email Address" style={styles.inputs}></TextInput>
              {!errEmail ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errEmail}</Text>}
            </View>
          ) : (
            <View>
              <TextInput

                keyboardType='number-pad'
                onChangeText={(text) => setmobile(text)}
                placeholder="Mobile" style={styles.inputs}></TextInput>
              {!errMobile ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errMobile}</Text>}
            </View>
          )}





          <View style={{ marginTop: 5, }}>

            <TextInput
              onChangeText={(text) => setFname(text)}
              placeholder="First Name" style={styles.inputs}></TextInput>
            {!errFname ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errFname}</Text>}

          </View>

          <View style={{ marginTop: 5, }}>

            <TextInput
              onChangeText={(text) => setLname(text)}
              placeholder="Last Name"
              style={styles.inputs}></TextInput>
            {!errLname ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errLname}</Text>}
          </View>

          <View style={{ marginTop: 5, }}>

            <TextInput
              onChangeText={(text) => setprc_number(text)}
              placeholder="PRC License Number" style={styles.inputs}></TextInput>
            {!errprc ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errprc}</Text>}
          </View>

          <TouchableWithoutFeedback onPress={() => showDatePicker()} style={{ marginTop: 5, }}>
            <View>
              <Text style={[styles.inputs, { color: '#999', }]}>{!dfdpicker ? 'Birthday' : dfdpicker}</Text>
            </View>
          </TouchableWithoutFeedback>
          <View>
            {!errbdate ? null : <Text style={{ fontSize: 10, color: 'red' }}> {errbdate}</Text>}
          </View>


          <View style={{ marginTop: 5, flex: 1, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextInput
                onChangeText={(text) => setpassword(text)}
                secureTextEntry={!passwordVisible ? true : false}
                placeholder="Password"
                style={[styles.inputs, { width: '80%' }]} />
              <View style={{
                width: '20%',
                borderBottomWidth: 0.5,
                padding: 10,
                borderColor: '#3C1053'
              }}>
              <TouchableOpacity
              onPress={() => setpasswordVisible(!passwordVisible)}
              >
                 <Entypo name={!passwordVisible ? "eye-with-line" : 'eye'} size={26}/>
              </TouchableOpacity>
      
              </View>
            </View>
            {!errpword ? null : <Text style={{ fontSize: 10, color: 'red' }}>{errpword}</Text>}
          </View>

          <TouchableOpacity style={{ alignItems: 'flex-start', marginVertical: 20 }}>
            <Text style={{ fontSize: 12, color: '#2196f3', textAlign: 'center' }}> By clicking signup you agree to the Terms of Service and Privacy Policy</Text>

          </TouchableOpacity>

          <TouchableOpacity onPress={() => isLoading == true ? null : signup()} style={{ padding: 10, backgroundColor: isLoading == true ? 'rgba(235,29,39, 0.3)' : '#F05622', borderRadius: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>

            <Text style={{ color: 'white', fontSize: 16, }}>Sign up</Text>
            {isLoading == true ? (
              <ActivityIndicator size="small" color="white" style={{ left: 10 }} />
            ) : (null)}
          </TouchableOpacity>



          <View style={{ marginTop: 20, alignItems: 'center', }}>
            <View style={{ marginVertical: 20, }}>
              <Text style={{ color: '#999', }}>or sign up with</Text>
            </View>

            <View>
              <TouchableOpacity onPress={() => LoginMe()} style={{ borderWidth: 1, width: 240, padding: 10, borderRadius: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                <IconAnt name="facebook-square" color="#4460A0" size={20} />
                <Text style={{ color: '#4460A0', fontWeight: '700' }}> Signup using Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => signInGmail()} style={{ borderWidth: 1, width: 240, padding: 10, borderRadius: 20, alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <IconAnt name="googleplus" color='#E74C3C' size={20} />
                <Text style={{ color: '#E74C3C', fontWeight: '700' }}> Signup using Gmail</Text>
              </TouchableOpacity>
            </View>

          </View>


        </View>

        {/* <View style={{}}>
                <Text>You don't have an account</Text>
            </View> */}




        <View style={{ flex: 1, padding: 20, alignItems: 'center', }}>

          <View style={{ marginVertical: 20 }}>
            <Text style={{ color: '#999', }}>Already have an account?</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={{ backgroundColor: '#11316A', width: '100%', padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>

            <Text style={{ color: 'white', fontWeight: '700' }}> Sign in</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

    </>



  )
}

export default RegisterScreen

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
    padding: 10,
    borderColor: '#3C1053'

  }
})
