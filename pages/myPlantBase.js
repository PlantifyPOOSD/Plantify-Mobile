import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Pin from '../components/Pin';
import styles from '../styles/myPlantBaseStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getUserImages } from '../data';
import temp from '../img/icons8-test-account-80.png';
import { useFocusEffect } from '@react-navigation/native';
import ToDo from './toDo';
import ProfilePicture from './userProfile';



const firstColumn = [];
const secondColumn = [];

function splitData(data) {
  firstColumn.length = 0;
  secondColumn.length = 0;

  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) firstColumn.push(data[i]);
    else secondColumn.push(data[i]);
  }
}


function MyPlantBase({ route }) {
  const { user } = route.params;
  const navigation = useNavigation();

  const [data, setData] = useState([]);


  const fetchData = async () => {
    const fetchedData = await getUserImages(user);
    console.log("Fetched data: ", fetchedData);
    const updatedData = fetchedData.map((item) => {
      return {
        id: item.id,
        pinSize: item.pinSize,
        img: { uri: item.img },
        //maybe update this
      };
    });
    setData(updatedData);
  };

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, user]);

  useEffect(() => {
    splitData(data);
  }, [data]);

  const addPlant = () => {
    navigation.navigate('addPlant', { user: user, onPlantAdded: fetchData });
  };  

  const plantPage = (plantData) => {
    navigation.navigate('Individual', { userId: 'someUserId', plantId: 'somePlantId' });
  };

  const ToDoPage = () => {
    navigation.navigate('ToDo', { userId: user});
  };  

  const profilePage = () => {
    navigation.navigate('Profile', { user: user});
  };  
  

  const renderColumn = (column) => {
    return column.map((item) => (
      <View key={item.id}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Individual", {
              userId: user,
              plantId: item.id,
              onPlantDelete: (deletedPlantId) => {
                setData(data.filter((plant) => plant.id !== deletedPlantId));
              },
            })
          }
        >
          <Pin pinSize={item.pinSize} img={item.img}></Pin>
        </TouchableOpacity>
      </View>
    ));
  };
  const handleLogout = () =>{
    navigation.navigate('login');
  }
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.navBar}>
        <View style={styles.navLeft}>
          <View style={styles.backButton}>
            <TouchableOpacity onPress={handleLogout}>
              <Icon name="sign-out-alt" size={25} color="#D1C3A7"></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.navRight}>
          <View style={styles.profilePicture}>
            <TouchableOpacity onPress={profilePage}>
              <Image source={temp} style={{width: 30, height: 30, borderRadius: 20,}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.plantBaseHeader}>
        <Text style={styles.plantBaseTitle}>Your Plantbase</Text>
        <View style={styles.headerIcons}>
          <View style={styles.addPlant}>
            <TouchableOpacity onPress={addPlant}
            style={{borderRadius: 15,borderWidth: 1,padding: 10, backgroundColor: "#385250",alignItems: 'center'}}>
              <Icon name="plus" size={30} color="white"></Icon>
            </TouchableOpacity>
            <Text>Add Plant</Text>
          </View>
          <View style={styles.plantToDos}>
            <TouchableOpacity onPress = {ToDoPage} style={{borderRadius: 15,borderWidth: 1,padding: 10, backgroundColor: "#385250",alignItems: 'center'}}>
              <Icon name="check-circle" size={30} color={"white"}></Icon>
            </TouchableOpacity>
            <Text style={{fontSize: 15,}}>To-Dos</Text>
          </View>
        </View>
      </View>
      <View style={styles.plantPicsContainer}>
        <View style={styles.plantPic}>
          {renderColumn(firstColumn)}
        </View>
        <View style={styles.plantPic}>
          {renderColumn(secondColumn)}
        </View>
      </View>
    </ScrollView>
  );
}

export default MyPlantBase;
