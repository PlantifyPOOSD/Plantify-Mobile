import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MyPlantBase from './myPlantBase';
import { getUserImages } from '../data';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteObject, ref } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
import { Alert } from 'react-native';
import styles from '../styles/individualStyle';
import { updateMetadata, getMetadata, getDownloadURL } from 'firebase/storage';
import { TREFLE_API_KEY } from '@env';


//Takes the font downloads and applies them
const customFonts = {
 'Kabel-Black': require('../assets/fonts/Kabel-Black.ttf'),
 'JosefinSans-Regular': require('../assets/fonts/JosefinSans-Regular.ttf'),
};

function IndividualPage({route}) {
 const [fontsLoaded, setFontsLoaded] = useState(false);
 const [plantData, setPlantData] = useState(null);
 const { userId, plantId } = route.params;
 const [plantCareData, setPlantCareData] = useState({
  watering: null,
  sunlight: null
});

 const navigation = useNavigation();


  useEffect(() => {
    async function loadFontsAsync() {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    }

    loadFontsAsync();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const plantImages = await getUserImages(userId);
      const selectedPlant = plantImages.find((plant) => plant.id === plantId);
      setPlantData(selectedPlant);
  
      if (selectedPlant) {
        const careData = await getPlantCareData(selectedPlant.species);
        setPlantCareData(careData);
      }
    }
    if (fontsLoaded) {
      fetchData();
    }
  }, [userId, plantId, fontsLoaded, route.params]);

  if (!fontsLoaded || !plantData) {
    return null;
  }

  const handleDeletePlant = async () => {
    try {
      const storage = getStorage();
      const imagePath = `users/${userId}/plants/${plantId}`;
      const imageRef = ref(storage, imagePath);
      
      // Delete the image from Firebase Storage
      await deleteObject(imageRef);
  
      // Call the parent component's onDelete callback to update the PlantBase state
      if (route.params.onPlantDelete) {
        route.params.onPlantDelete(plantId);
      }
  
      // Navigate back to the PlantBase
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting plant: ", error);
      Alert.alert("Error", "Failed to delete plant.");
    }
  };
  
  const handlePlantUpdate = () => {
    async function fetchData() {
      const plantImages = await getUserImages(userId);
      const selectedPlant = plantImages.find(plant => plant.id === plantId);
      setPlantData(selectedPlant);
    }
    fetchData();
  };

  async function getPlantCareData(plantName) {
    const searchResponse = await fetch(
      `https://trefle.io/api/v1/species/search?token=${TREFLE_API_KEY}&q=${plantName}`
    );
    const searchData = await searchResponse.json();
  
    if (searchData.meta.total > 0) {
      const plantId = searchData.data[0].id;
  
      // Make an additional API call to get the full plant details
      const plantDetailsResponse = await fetch(
        `https://trefle.io/api/v1/species/${plantId}?token=${TREFLE_API_KEY}`
      );
      const plantDetailsData = await plantDetailsResponse.json();
  
      const growthInfo = plantDetailsData.data.growth;
      console.log("Growth:", growthInfo);
  
      // Return an object containing the atmospheric humidity and sunlight values
      return {
        watering: growthInfo.atmospheric_humidity,
        sunlight: growthInfo.light
      };
    } else {
      console.log("No results found for the given plant name.");
    }
  }

  const handleWaterPlant = async () => {
    try {
      const storage = getStorage();
      const imagePath = `users/${userId}/plants/${plantId}`;
      const imageRef = ref(storage, imagePath);
  
      // Update the lastWatered timestamp in the image metadata
      const metadata = await getMetadata(imageRef);
      const newMetadata = {
        ...metadata,
        customMetadata: {
          ...metadata.customMetadata,
          lastWatered: new Date().toISOString(),
        },
      };
      await updateMetadata(imageRef, newMetadata);
  
      // Update plant data
      handlePlantUpdate();
    } catch (error) {
      console.error("Error watering plant: ", error);
      Alert.alert("Error", "Failed to water plant.");
    }
  };  
  
  
  function formatWatering(atmospheric_humidity) {
    if (atmospheric_humidity < 3) {
      return "Low";
    } else if (atmospheric_humidity < 6) {
      return "Medium";
    } else {
      return "High";
    }
  }

  function estimateWateringFrequency(atmospheric_humidity) {
    if (atmospheric_humidity < 3) {
      return "Every 2-3 weeks";
    } else if (atmospheric_humidity < 6) {
      return "Every 1-2 weeks";
    } else {
      return "Every 3-5 days";
    }
  }

  
  function formatSunlight(light) {
    if (light < 3) {
      return "Low";
    } else if (light < 6) {
      return "Medium";
    } else {
      return "High";
    }
  }  

 console.log("The information reached the individual page: " + JSON.stringify(plantData, null, 2));
return (
  <ScrollView>
   <View style={styles.plantPage}>
     <View style={styles.plantContainer}>
       <View style={styles.plantImageContainer}>
         <Image source={{ uri: plantData.img }} style={styles.plantImage} />
       </View>
       <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditPlant', { user: userId, plantId: plantData.id, plantData, handlePlantUpdate })}
          style={styles.editBtn}
        >
          <Text style={styles.editBtnText}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeletePlant}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteBtnText}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>


       <View style={styles.plantBioContainer}>
         <Text style={styles.singlePlantHeader}>{plantData.species}</Text>
         <Text style={styles.singlePlantDescription}>{plantData.description} </Text>
       </View>
       <View style={styles.plantBioContainer}>
          <Text style={styles.singlePlantHeader}>Suggested Care:</Text>
          <View style={styles.plantDetails}>
        <View style={styles.plantDetail}>
          <Image
            source={require("../assets/waterdrop-1.png")}
            style={styles.waterIcon}
          />
          <Text style={styles.plantSubtitles}>Water:</Text>
        </View>
        <Text style={[styles.singlePlantDescription, styles.waterDescription]}>
          {plantCareData.watering !== null ? formatWatering(plantCareData.watering) : "Loading..."}
        </Text>
        <View style={styles.plantDetail}>
          <Image
            source={require("../assets/sun-1.png")}
            style={styles.sunIcon}
          />
          <Text style={[styles.plantSubtitles, styles.sunTitle]}>Sun:</Text>
        </View>
        <Text style={[styles.singlePlantDescription, styles.sunDescription]}>
          {plantCareData.sunlight !== null ? formatSunlight(plantCareData.sunlight) : "Loading..."}
        </Text>
      </View>
        </View>

       <View style={styles.plantBioContainer}>
         <Text style={styles.singlePlantHeader}>Progress:</Text>
           <Text style={styles.plantSubtitles}>Should Water:</Text>
           <Text style={styles.singlePlantDescription}>
            {plantCareData.watering !== null
              ? estimateWateringFrequency(plantCareData.watering)
              : "Loading..."}
          </Text>
           <Text style={styles.plantSubtitles}>Last Watered:</Text>
           <Text style={styles.singlePlantDescription}>
            {plantData.lastWatered ? `${Math.floor((new Date() - plantData.lastWatered) / (1000 * 60))} Minutes Ago` : "Loading..."}
          </Text>
          <View style={styles.waterPlantButtonContainer}>
            <TouchableOpacity
              onPress={handleWaterPlant}
              style={styles.editBtn}
            >
              <Text style={styles.editBtnText}>
                Water Plant
              </Text>
            </TouchableOpacity>

          </View>
         </View>
     </View>
   </View>
   </ScrollView>
);
}


export default IndividualPage;

