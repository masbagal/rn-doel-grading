import * as React from 'react';
import { StyleSheet, Image, Text, View, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/auth';

import Button from '../components/Button';
import InputField from '../components/InputField';
import { useUser } from '../contexts/UserContext';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState<any>('');
  const [password, setPassword] = React.useState<any>('');
  const [, userActions] = useUser();


  function goMain() {
    navigation.navigate('Assignments')
  }

  function signIn() {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        userActions.defineUser(user);
        goMain();
      })
      .catch((error) => {
        Alert.alert('Login Failed', error.message)
      });
  }


  return (
    <View style={styles.container} >
      <Text style={styles.title}>Sign In</Text>
      <Image source={require('../assets/images/login.png')} style={styles.image} resizeMode='contain' />
      <Text style={styles.desc}>To be able to use this app, we need to make sure that you are the right user.</Text>
      <InputField style={styles.input} label='Email' value={email} onChangeText={(val) => setEmail(val)} placeholder='Your email' />
      <InputField style={styles.input} label='Password' value={password} onChangeText={(val) => setPassword(val)} secureTextEntry />
      <Button style={{ marginTop: 28 }} onPress={signIn} text='Sign In' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  image: {
    width: '80%',
    height: 200,
    marginVertical: 28,
  },
  desc: {
    width: '60%',
    textAlign: 'center',
    marginVertical: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#ddd'
  },
  input: {
    marginVertical: 12,
    width: 200
  }
});
