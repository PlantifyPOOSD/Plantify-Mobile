import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Pin from '../components/Pin';
import styles from '../styles/myPlantBaseStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import DraggableFlatList from 'react-native-draggable-flatlist';

const data = [
  { id: 1, pinSize: "medium", img: plant1 },
  { id: 2, pinSize: "small", img: plant2 },
  { id: 3, pinSize: "small", img: plant3 },
  { id: 4, pinSize: "large", img: plant4 },
  { id: 5, pinSize: "medium", img: plant5 },
  { id: 6, pinSize: "small", img: plant6 },
  { id: 7, pinSize: "large", img: plant7 },
];
const firstColumn = [];
const secondColumn = [];
splitData();

function splitData(){
  for(let i = 0; i < data.length; i++){
    if(i % 2 == 0)
      firstColumn.push(data[i]);
    else
      secondColumn.push(data[i]);
  }
}


const MyPlantBase = () => {
  const navigation = useNavigation();
  
  const addPlant = () =>{
    navigation.navigate("addPlant");
  }
  const plantPage = () =>{
    navigation.navigate("Individual")
  }
  const goToUserProfile = () => {
    navigation.navigate('Profile');
  };
  const renderItem = ({item, index, drag, isActive}) => (
    <TouchableOpacity
      key={item.id}
      onPress={plantPage}
      onLongPress={drag}
      style={{
        backgroundColor: isActive ? '#e6e6e6' : 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Pin pinSize={item.pinSize} img={item.img} />
    </TouchableOpacity>
  );

  // ...
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.navBar}>
        <View style={styles.navLeft}>
          <View style={styles.backButton}>
            <TouchableOpacity>
              <Icon name="arrow-left" size={25} color="#D1C3A7"></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.navRight}>
          <View style={styles.notificationButton}>
            <TouchableOpacity>
              <Icon name ="bell" size ={25} color="#D1C3A7"></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.profilePicture}>
            <TouchableOpacity onPress={goToUserProfile}>
              <Image source={plant1} style={{width: 30, height: 30, borderRadius: 20,}}></Image>
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
          <View style={styles.organizePlant}>
            <TouchableOpacity style={{borderRadius: 15,borderWidth: 1,padding: 10, backgroundColor: "#385250",alignItems: 'center'}}>
              <Icon name="list" size={30} color="white"></Icon>
            </TouchableOpacity>
            <Text>Organize</Text>
          </View>
          <View style={styles.plantToDos}>
            <TouchableOpacity style={{borderRadius: 15,borderWidth: 1,padding: 10, backgroundColor: "#385250",alignItems: 'center'}}>
              <Icon name="check-circle" size={30} color={"white"}></Icon>
            </TouchableOpacity>
            <Text style={{fontSize: 15,}}>To-Dos</Text>
          </View>
        </View>
      </View>
      <View style={styles.plantPicsContainer}>
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `draggable-item-${item.id}`}
          onDragEnd={({data: newData}) => setData(newData)}
          numColumns={2}
        />
      </View>
    </ScrollView>
  );
};

export default MyPlantBase;
