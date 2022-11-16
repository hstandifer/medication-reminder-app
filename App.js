import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, SafeAreaView, Alert} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
 
  const [textInput, setTextInput] = useState('');
  const [meds, setMeds] = useState([
    {id: 1, medicine:'tylenol', taken: false},
    {id: 2, medicine:'motrin', taken: false},
  ]);
  const ListItem = ({med}) => {
    return (
      <View style={styles.listItem}>
        <View>
          <Text style={{ color: 'white' }}>{med?.medicine}</Text>
        </View>
      </View>
    );
  }
  const addMeds = () => {
   if(textInput == ""){
    Alert.alert("Error", "Empty input not accepted");
   } else{
    const newMed ={
      id:Math.random(),
      medicine: textInput,
      taken: false,
    };
    setMeds([...meds, newMed]);
    setTextInput('');
   }
    
  };
  const onTookMeds = textInput => {
    console.log(textInput);
    const newMeds = meds.filter(item => {
      if (item.medicine == textInput) {
        return {...item, taken: true};
      }
      return item;
    });
    setMeds(newMeds);
  };
  const deleteMed = (textInput) => {
    const newMeds = meds.filter(item => item.medicine != textInput);
    setMeds(newMeds);
  };

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Text>Medication Reminder App</Text>
      <TextInput
        style={styles.medText}
        onChangeText={text => setTextInput(text)}
        placeholder='Enter Medication Name'
        value={textInput}
      />
      <Button
        onPress={() => onTookMeds(textInput)}
        title='Took Medication'
        color="#841584"
      />
      <Button
        onPress={addMeds}
        title='Add Medication'
        color="#841584"
      />
      <FlatList
        data={meds}
        renderItem={({item}) => <ListItem med={item}/>}
      />
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  medText: {
    borderWidth: 1,
    height: 40,
    maring: 12,
    padding: 10,

  },
  listItem: {
    padding:20,
    backgroundColor: 'blue',
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 1,
  },
});
