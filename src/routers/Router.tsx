import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddNewTask from '../screens/tasks/AddNewTask';
import HomeScreen from '../screens/homes/HomeScreen';
import SearchScreen from '../screens/SearchScreen';

const Router = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddNewTask" component={AddNewTask} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default Router;
