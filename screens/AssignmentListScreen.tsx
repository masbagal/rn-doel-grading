import * as React from 'react';
import { StyleSheet, SafeAreaView, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { format } from "date-fns";
import { useNavigation } from '@react-navigation/native';
import { getAllAssignments, getDataFromFirebase, detachListener } from '../services/assignment';
const gradingImage = require('../assets/images/grading.png');

export default function TabOneScreen() {
  const [assignments, setAssignments] = React.useState<any>([]);
  const navigation = useNavigation();
  React.useEffect(() => {
    getDataFromFirebase('/assignments', fetchAssignmentCallback)
    return () => detachListener();
  }, [])

  async function fetchAssignments() {
    const assignments = await getAllAssignments();
    setAssignments(assignments);
  }

  function fetchAssignmentCallback(snapshot: any) {
    const assignments = snapshot.val();
    setAssignments(assignments);
  }

  function handleAdd() {
    navigation.navigate('AddAssignment')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, styles.wrapper]}>
        <Text style={styles.hero}>Hi, Chrysogonus!</Text>
        <Text>Let's get things done today!</Text>
        <Image style={styles.image} source={gradingImage} resizeMode='contain' />
      </View>
      <View style={styles.wrapper}>
        <ScrollView>
          {
            Object.keys(assignments).map((id: string) => {
              const assignment = assignments[id];
              const dateDisplay = assignment.date ? format(new Date(assignment.date), 'dd MMMM yyyy') : '-'
              return (
                <View style={styles.card} key={assignment.id}>
                  <Text style={styles.cardTitle}>{assignment.title}</Text>
                  <Text style={styles.cardText}>{dateDisplay}</Text>
                </View>
              )
            })
          }
          {/* <Text>{JSON.stringify(assignments)}</Text> */}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <View>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapper: {
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
    paddingTop: 60,
    height: 200,
  },
  hero: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: 150,
    height: 200,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
  },
  card: {
    backgroundColor: '#1ba0e2',
    marginVertical: 10,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardText: {
    color: 'white'
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
    borderRadius: 40,
    elevation: 10,
    backgroundColor: '#09BC8A',
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  addText: {
    color: '#fff',
    fontSize: 40,
  }
});
