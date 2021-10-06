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
  ProcedureAddScreen,

  Allergies,
  AllergyAddScreen,

  Substances,
  SubstanceAddScreen,

  SexualHistory,
  SexualHistoryAdd,

  MedicalHistory,
  MedicalHistoryAddScreen,
  
  FamilyHistory,
  FamilyAddHistory,
  
  VitalsList,
  VitalAddScreen,


  Encounters

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
    <Patients.Screen name="ProcedureAddScreen" component={ProcedureAddScreen} />
    
    <Patients.Screen name="Allergies" component={Allergies} />
    <Patients.Screen name="AllergyAddScreen" component={AllergyAddScreen} />
    
    <Patients.Screen name="Substances" component={Substances} />
    <Patients.Screen name="SubstanceAddScreen" component={SubstanceAddScreen} />

    <Patients.Screen name="SexualHistory" component={SexualHistory} />
    <Patients.Screen name="SexualHistoryAdd" component={SexualHistoryAdd} />


    <Patients.Screen name="MedicalHistory" component={MedicalHistory} />
    <Patients.Screen name="MedicalHistoryAddScreen" component={MedicalHistoryAddScreen} />

    

    <Patients.Screen name="FamilyHistory" component={FamilyHistory} />
    <Patients.Screen name="FamilyAddHistory" component={FamilyAddHistory} />

    


    <Patients.Screen name="VitalsList" component={VitalsList} />
    <Patients.Screen name="VitalAddScreen" component={VitalAddScreen} />
    
    <Patients.Screen name="Encounters" component={Encounters} />
    
    
    
    

    {/* <MainStack.Screen name="HomeScreen" component={HomeScreen} /> */}


  </Patients.Navigator>
)
export default PatientsContentScreen

const styles = StyleSheet.create({})


