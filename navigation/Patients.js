import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import {
  PatientsList,
  PatientAddScreen,
  PatientProfile,
  HistoryList,
  Medications,
  MedicationAddScreen,
  Vaccination,
  VaccinationAddScreen,
  Procedures,
  Allergies,
  Substances,
  SexualHistory,
  MedicalHistory,
  FamilyHistory,
  VitalsList,
  VitalAddScreen

} from '../screens'





const Patients = createStackNavigator();
const PatientsContentScreen = () => (
  <Patients.Navigator
    screenOptions={{
      headerShown: false
    }}

  >

    <Patients.Screen name="PatientsList" component={PatientsList} />
    <Patients.Screen name="PatientAddScreen" component={PatientAddScreen} />
    <Patients.Screen name="PatientProfile" component={PatientProfile} />
    <Patients.Screen name="HistoryList" component={HistoryList} />
    <Patients.Screen name="Medications" component={Medications} />
    <Patients.Screen name="MedicationAddScreen" component={MedicationAddScreen} />
    <Patients.Screen name="Vaccination" component={Vaccination} />
    <Patients.Screen name="VaccinationAddScreen" component={VaccinationAddScreen} />
    <Patients.Screen name="Procedures" component={Procedures} />
    <Patients.Screen name="Allergies" component={Allergies} />
    <Patients.Screen name="Substances" component={Substances} />
    <Patients.Screen name="SexualHistory" component={SexualHistory} />
    <Patients.Screen name="MedicalHistory" component={MedicalHistory} />
    <Patients.Screen name="FamilyHistory" component={FamilyHistory} />
    <Patients.Screen name="VitalsList" component={VitalsList} />
    <Patients.Screen name="VitalAddScreen" component={VitalAddScreen} />
    
    
    
    

    {/* <MainStack.Screen name="HomeScreen" component={HomeScreen} /> */}


  </Patients.Navigator>
)
export default PatientsContentScreen

const styles = StyleSheet.create({})


