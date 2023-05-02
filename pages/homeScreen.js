import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { auth, getAuth} from '../firebase';

function HomeScreen({ route }) {
  const [user, setUser] = useState(null);
  const { uid } = route.params;
  console.log(uid);
  
  return(
    <View> 
      <Text>Home Screen</Text>
    </View>
  )
}

export default HomeScreen;
