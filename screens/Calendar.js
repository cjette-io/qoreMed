import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView } from 'react-native'
import { Agenda } from "react-native-calendars";
import FabAppointment from './components/FabAppointment'


// Icon Set
import IconION from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMCI from 'react-native-vector-icons/MaterialIcons';
import moment from "moment";

const Calendar = ({navigation}) => {

  const Appointment = [
    {
      date: "2021-07-17",
      patient: "Jhon Doe",
      time: "8:00 PM",

    },
    {
      date: "2021-07-17",
      patient: "M1000",
      time: "9:00 PM",

    },
    {
      date: "2021-07-18",
      patient: "Mc Gregor",
      time: "10:00 PM",

    }
  ]

  //set selected month and year
  const [date, setDate] = useState(moment().format("MMMM YYYY"));

  //hook for setting selected date to pass to onRefresh prop of agenda to refresh the selected date contents
  const [dateToRefresh, setDateToRefresh] = useState(moment().format("YYYY-MM-DD"));


  useEffect(() => {
    // let modifiedData = { [date] : Appointment.date };

    // In here i am try to reduce each item geting by his dates
    // const reduced = Appointment.reduce((acc, item) =>{
    //   const { date } = item, coolItem = (item);
    //             acc[date] = [coolItem];
    //             return acc;

    // },{})

    // fetch('https://mocki.io/v1/9713675c-950e-4f46-98b4-7efc8d3c9d0a')
    // .then((response) => response.json())
    // .then((json) => {

    //   // let modifiedData = { [date]: json };
    //   // console.log(modifiedData);
    //   let group = json.reduce((r, a) => {
    //     //  console.log("a", a);
    //     //   console.log('r', r); 
    //       r[a.date] = [...r[a.date] || [], a];
    //        return r;
    //       },{});
    //        console.log("group", group);



    // })
    let group = Appointment.reduce((r, a) => {
      //  console.log("a", a);
      //   console.log('r', r); 
      r[a.date] = [...r[a.date] || [], a];
      return r;
    }, {});
    console.log(group);

  }, [])


  const touch = (date) => {
    fetch('https://mocki.io/v1/9713675c-950e-4f46-98b4-7efc8d3c9d0a')
      .then((response) => response.json())
      .then((json) => {

        // let modifiedData = { [date]: json };
        // console.log(modifiedData);
        let group = json.reduce((r, a) => {
          //  console.log("a", a);
          //   console.log('r', r); 
          r[a.date] = [...r[a.date] || [], a];
          return r;
        }, {});
        console.log("group", group);



      })
  }
  const refAgenda = useRef();

  const onPressToday = () => {
    const today = new Date();
    refAgenda.current.chooseDay(today);
  };



  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{ padding: 10, backgroundColor: 'white' }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconION name="arrow-back" size={20} color='black' />
            </TouchableOpacity> */}

          </View>

          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'NunitoSans-Bold', fontSize: 16 }}>Appointments</Text>
          </View>

          <TouchableOpacity
            onPress={onPressToday}
            style={{flexDirection: 'row', justifyContent:'center',alignItems: 'center'}}
          >
            <IconION name="calendar" size={15} color='black' style={{right:5}} />
            <Text>Today</Text>
          </TouchableOpacity>


        </View>
      </SafeAreaView>

      <Agenda
        ref={refAgenda}
        loadItemsForMonth={(month) => { console.log('trigger items loading') }}
        hideKnob={false}
        showClosingKnob={true}
        items={{
          '2021-07-16': [{ name: 'item 16', }],
          '2021-07-17': [{ name: 'item 17 - any js object' }],
          '2021-07-18': [{ name: 'item 18A ' }, { name: '18B' }],
          '2021-07-19': [{ name: '19A', }],
        }}

        // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return (<View style={{ backgroundColor: 'white' }}>
            <Text>Test {item.name}</Text>
          </View>);
        }}

        renderEmptyData={() => {
          return (
            <View style={styles.emptyDataContainer}>
              <IconION name="ios-cafe" size={32} color='black' />
              <Text style={styles.emptyDataTitle}>
                No appointment
              </Text>
              <View style={styles.emptyDataButtonContainer}>

              </View>
            </View>
          );
        }}




      />



      <FabAppointment touch={touch} />
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
  emptyDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyDataTitle: {
    color: 'black',
    marginTop: 8,
    paddingHorizontal: 40,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "100"
  },
  emptyDataButtonContainer: {
    marginTop: 24
  }
})
