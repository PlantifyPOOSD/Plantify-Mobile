import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';

import Login from './pages/login';
import Register from './pages/register.js';
import HomeScreen from './pages/homeScreen';
import MyPlantBase from './pages/myPlantBase';
import IndividualPage from './pages/individualPage';
import AddPlant from './pages/addPlant';
import WalkthroughScreen from './dynamic_landing/WalkthroughScreen/WalkthroughScreen';
import WalkthroughAppConfig from './dynamic_landing/WalkthroughAppConfig';
import StyleDict from './dynamic_landing/DynamicAppStyles';
import ProfilePicture from './pages/userProfile';
import ToDo from './pages/toDo';
import EditPlant from './pages/editPlant';
import VerifyEmail from './pages/verifyEmail';
import PasswordRecovery from './pages/passwordRecovery';
const Stack = createStackNavigator();
import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    "Kabel-Black": require("./assets/fonts/Kabel-Black.ttf"),
    "JosefinSans": require("./assets/fonts/JosefinSans-VariableFont_wght.ttf"),
  });
}

loadFonts();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          cardStyle: { backgroundColor: 'transparent' },}}>
      <Stack.Screen
          name="WalkthroughScreen"
          component={WalkthroughScreen}
          initialParams={{appConfig: WalkthroughAppConfig, appStyles: StyleDict}}
        />
        <Stack.Screen name="login" component={Login}></Stack.Screen>
        <Stack.Screen name="register" component={Register}></Stack.Screen>
        <Stack.Screen name="myPlantBase" component={MyPlantBase}></Stack.Screen>
        <Stack.Screen name="Individual" component={IndividualPage}></Stack.Screen>
        <Stack.Screen name="Profile" component={ProfilePicture}></Stack.Screen> 
        <Stack.Screen name="ToDo" component={ToDo}></Stack.Screen>
        <Stack.Screen name="addPlant" component={AddPlant}></Stack.Screen> 
        <Stack.Screen name="EditPlant" component={EditPlant}></Stack.Screen> 
        <Stack.Screen name="verifyEmail" component={VerifyEmail}></Stack.Screen>
        <Stack.Screen name="passwordRecovery" component={PasswordRecovery}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
