import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AddNewTask from '../screens/tasks/AddNewTask';
import HomeScreen from '../screens/homes/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import auth from '@react-native-firebase/auth';
import LoginScreen from '../screens/Authentication/LoginScreen';
import SignUpScreen from '../screens/Authentication/SignupScreen';
import TaskDetail from '../screens/tasks/TaskDetail';
import ListTasks from '../screens/tasks/ListTask';

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  const Stack = createNativeStackNavigator();

  const MainRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddNewTask" component={AddNewTask} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      <Stack.Screen name="ListTasks" component={ListTasks} />
    </Stack.Navigator>
  );

  const AuthRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
  return isLogin ? MainRouter : AuthRouter;
};

export default Router;
