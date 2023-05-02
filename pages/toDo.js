import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { getUserImages } from '../data';
import plantifyLogo from '../img/plantify_logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


function ToDo({route}) {
  const { userId } = route.params;
  const [completedTasks, setCompletedTasks] = useState([]);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPlants = async () => {
      const fetchedData = await getUserImages(userId);
      setPlants(fetchedData);
    };
    const fetchCompletedTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('completedTasks');
      if (storedTasks) {
        setCompletedTasks(JSON.parse(storedTasks));
      }
    };
    const fetchData = async () => {
      await fetchPlants();
      await fetchCompletedTasks();
      setLoading(false);
    };
    fetchData();
  }, [userId]);
  
  

  const toggleTaskCompletion = async (plantId, task) => {
    const taskKey = `${plantId}-${task}`;
    let updatedTasks;
    if (completedTasks.includes(taskKey)) {
      updatedTasks = completedTasks.filter((t) => t !== taskKey);
    } else {
      updatedTasks = [...completedTasks, taskKey];
    }
    setCompletedTasks(updatedTasks);
    await AsyncStorage.setItem('completedTasks', JSON.stringify(updatedTasks));
  };
  

  const renderTaskBubble = (plant, task) => {
    const taskKey = `${plant.id}-${task}`;
    const isCompleted = completedTasks.includes(taskKey);
  
    return (
      <TouchableOpacity
        style={[styles.taskBubble, isCompleted && styles.completedTaskBubble]}
        onPress={() => toggleTaskCompletion(plant.id, task)}
      >
        <Text style={styles.taskBubbleText}>{task}</Text>
        {isCompleted && (
          <View style={styles.checkmarkContainer}>
            <Icon name="checkmark" size={20} color="#000000" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderPlant = (plant) => {
    return (
      <View key={plant.id} style={styles.toDoPlantItem}>
        <Image source={{ uri: plant.img }} style={styles.toDoPlantImage} />
        <View style={styles.toDoPlantInfo}>
          <Text style={styles.toDoPlantName}>{plant.species}</Text>
          <View style={styles.taskContainer}>
            {renderTaskBubble(plant, 'Water')}
            {renderTaskBubble(plant, 'Sunlight')}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <View style={styles.toDoHeader}>
        <Text style={styles.toDoTitle}>To-Do</Text>
      </View>
      <View style={styles.toDoList}>
        {plants.map((plant) => renderPlant(plant))}
      </View>
      <Image source={plantifyLogo} style={styles.logo} />
    </ScrollView>
    {loading && (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#385250" />
      </View>
    )}
  </View>
  );
}

export default ToDo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7E9",
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF7E9",
  },
  toDoHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 60,
    backgroundColor: "#385250", // Updated background color
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Added shadow
  },
  toDoTitle: {
    fontSize: 32, // Increased font size
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: 'Kabel-Black', // Updated to use a custom font
  },
  toDoList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  toDoPlantItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFF7E9",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  toDoPlantImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  toDoPlantInfo: {
    flexDirection: "column",
  },
  toDoPlantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#385250",
  },
  taskContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  taskBubble: {
    backgroundColor: "#385250",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  completedTaskBubble: {
    backgroundColor: "rgba(194, 194, 194, 0.5)",
  },  
  taskBubbleText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loadingIndicator: {
    alignSelf: 'center',
  },
});
  


