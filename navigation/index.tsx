import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import LoginScreen from '../screens/LoginScreen';
import AssignmentListScreen from '../screens/AssignmentListScreen';
import AddAssignmentModal from '../screens/AddAssignmentModal';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Main = createStackNavigator();
const Assignments = createStackNavigator();

function AssignmentNavigator() {
  return (
    <Assignments.Navigator mode='modal'>
      <Assignments.Screen name="AssignmentList" component={AssignmentListScreen} options={{ headerShown: false }} />
      <Assignments.Screen name="AddAssignment" component={AddAssignmentModal} options={{ title: 'Add New Assignment' }} />
    </Assignments.Navigator>
  )
}

function RootNavigator() {
  return (
    <Main.Navigator screenOptions={{ headerShown: false }}>
      <Main.Screen name="Root" component={LoginScreen} />
      <Main.Screen name="Assignments" component={AssignmentNavigator} />
      <Main.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Main.Navigator>
  );
}
