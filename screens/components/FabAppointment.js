import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity  } from 'react-native'

// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMCI from 'react-native-vector-icons/MaterialIcons';


const FabAppointment = ({touch}) => {

  const testing = () => {
    touch('2021-07-17')
  }

    return (
        <TouchableOpacity
        style={[styles.root]}
       onPress={testing}
      >
        <IconAnt
          name="plus"
          size={34}
          color='green'
          style={{ marginStart: 1, marginTop: 2 }}
        />
      </TouchableOpacity>
    )
}

export default FabAppointment

const styles = StyleSheet.create({
    root: {
      backgroundColor: "white",
      width: 56,
      height: 56,
      position: "absolute",
      bottom: 80,
      end: 20,
      borderRadius: 30,
      shadowColor: 'gray',
      shadowOpacity: 0.3,
      shadowOffset: {
        height: 1,
        width: 1
      },
      justifyContent: "center",
      alignItems: "center"
    }
  });







