import React, { useState, useEffect } from 'react';
import { Image, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import styles from '../styles/addPlantStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getStorage, ref, updateMetadata, getMetadata, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';



function EditPlant({ route }) {
    const { user, plantId, handlePlantUpdate } = route.params;
    const [plantName, setPlantName] = useState("");
    const [plantSpecies, setPlantSpecies] = useState("");
    const [plantDescription, setPlantDescription] = useState("");
    const [pinSize, setPinSize] = useState('medium');
    const [plantData, setPlantData] = useState(null);
  
    const navigation = useNavigation();
  
    useEffect(() => {
      async function fetchData() {
        const storage = getStorage();
        const imagePath = `users/${user}/plants/${plantId}`;
        const imageRef = ref(storage, imagePath);
  
        const metadata = await getMetadata(imageRef);
        const customMetadata = metadata.customMetadata;
  
        setPlantName(customMetadata.plantName);
        setPlantSpecies(customMetadata.species);
        setPlantDescription(customMetadata.description);
        setPinSize(customMetadata.pinSize || 'medium');
        const downloadURL = await getDownloadURL(imageRef); // Get the download URL for the image
        setPlantData({
          img: downloadURL,
        });
      }
      fetchData();
    }, [user, plantId]);
  
    if (!plantData) {
      return null;
    }
  
    const handlePinSizeSelection = (size) => {
      setPinSize(size);
    };
  
    const handleUpdatePlant = async () => {
        try {
          const storage = getStorage();
          const imagePath = `users/${user}/plants/${plantId}`;
          const imageRef = ref(storage, imagePath);
      
          const metadata = {
            customMetadata: {
              plantName: plantName,
              species: plantSpecies,
              description: plantDescription,
              pinSize: pinSize,
            },
          };
      
          await updateMetadata(imageRef, metadata);
          Alert.alert("Success", "Plant details updated successfully!");
          handlePlantUpdate();
          navigation.goBack();
        } catch (error) {
          console.error("Error updating plant: ", error);
          Alert.alert("Error", "Failed to update plant details.");
        }
      };
      
  
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.pageBox}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: plantData.img }} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.addPlantInfo}>
              <View style={styles.plantName}>
                <TextInput
                  placeholder="Give your plant a name"
                  placeholderTextColor="#385250"
                  style={[styles.plantNameInput, { fontSize: 26, fontFamily: 'Kabel-Black' }]}
                  onChangeText={setPlantName}
                  value={plantName}
                />
              </View>
              <View style={styles.plantSpecies}>
                <TextInput
                  placeholder="Plant Species"
                  placeholderTextColor="#385250"
                  style={[styles.plantSpeciesInput, { fontFamily: "JosefinSans", fontSize: 20, fontWeight: 'bold' }]}
                  onChangeText={setPlantSpecies}
                  value={plantSpecies}
                />
              </View>
              <View style={styles.plantDescription}>
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical="top"
                  placeholder="Add a description..."
                  placeholderTextColor="#385250"
                  style={styles.plantDescriptionInput}
                  onChangeText={setPlantDescription}
                  value={plantDescription}
                />
              </View>
              <View style={styles.pinSizeSelection}>
                <View style={styles.taskBubbleContainer}>
                  <TouchableOpacity
                    style={[styles.taskBubble, pinSize === 'small' && styles.completedTaskBubble]}
                    onPress={() => handlePinSizeSelection('small')}>
                    <Text style={styles.taskBubbleText}>Small</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.taskBubble, pinSize === 'medium' && styles.completedTaskBubble]}
                    onPress={() => handlePinSizeSelection('medium')}>
                    <Text style={styles.taskBubbleText}>Medium</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.taskBubble, pinSize === 'large' && styles.completedTaskBubble]}
                    onPress={() => handlePinSizeSelection('large')}>
                    <Text style={styles.taskBubbleText}>Large</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.updateButtonContainer}>
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePlant}>
                  <Text style={styles.updateButtonText}>Update Plant</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      );
      
}

export default EditPlant;
