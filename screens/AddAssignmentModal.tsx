import * as React from 'react';
import { StyleSheet, SafeAreaView, Image, Text, View, Platform, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addNewAssignment } from '../services/assignment';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function TabOneScreen() {
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState<Date>(new Date());
  const [showDatePicker, toggleDatePicker] = React.useState(false);
  const navigation = useNavigation();

  function handleDatePicker(e: any) {
    toggleDatePicker(true);
  }

  function handleChangeName(newName: string) {
    setName(newName);
  }

  const handleDateChange = (event: Event, selectedDate?: Date) => {
    const newDate = selectedDate || date;
    setDate(newDate);
    toggleDatePicker(Platform.OS === 'ios');
  }

  function handleSave() {
    addNewAssignment(name, date.getTime());
    navigation.navigate('AssignmentList');
  }

  const displayedDate = format(date, 'dd MMMM yyyy');
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <View style={styles.container}>
        <InputField onChangeText={handleChangeName} label='Assignment Name' placeholder='Input the assignment name here' style={{ marginBottom: 30 }} value={name} />
        <TouchableOpacity onPress={handleDatePicker}>
          <InputField label='Date' value={displayedDate} editable={false} style={{ zIndex: -1 }} />
        </TouchableOpacity>
        <Button disable={!name} onPress={handleSave} style={styles.button} text='Save Assignment' />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            display="default"
            // @ts-ignore
            onChange={handleDateChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  button: {
    marginTop: 50,
  },
});
