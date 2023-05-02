import React, { useState, useEffect } from 'react';
import { Image, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import styles from '../styles/addPlantStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {useNavigation} from '@react-navigation/native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { updateMetadata } from 'firebase/storage';
import { Animated, Easing } from 'react-native';
import { PLANT_ID_API_KEY } from '@env';



async function detectPlant(imageUri) {
 const base64Image = await FileSystem.readAsStringAsync(imageUri, {
   encoding: FileSystem.EncodingType.Base64,
 });


 const body = JSON.stringify({
   organs: ['leaf', 'flower', 'fruit', 'bark', 'habit'],
   api_key: PLANT_ID_API_KEY,
   images: [base64Image],
   organelle: 'plant',
 });


 const response = await fetch('https://api.plant.id/v2/identify', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body,
 });


 const json = await response.json();
 return json;
}


const addPlantURL  = "https://us-central1-plantify-d36ed.cloudfunctions.net/server/add_plant";


export default function AddPlant({route}) {
 const {user} = route.params;
 const [imageUri, setImageUri] = useState(null);
 const [imageBlob, setImageBlob] = useState(null);
 const [plantName, setPlantName] = useState("");
 const [plantSpecies, setPlantSpecies] = useState("");
 const [plantDescription, setPlantDescription] = useState("");
 const [pinSize, setPinSize] = useState('medium');
 const [saveButtonScale] = useState(new Animated.Value(1));


 const navigation = useNavigation();

 const handlePinSizeSelection = (size) => {
  setPinSize(size);
};

 useEffect(() => {
 (async () => {
   if (Platform.OS !== 'web') {
     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
     if (status !== 'granted') {
       Alert.alert('Error', 'Sorry, we need media library permissions to make this work!');
     }
   }
 })();
}, []);

const animateSaveButton = () => {
  Animated.timing(saveButtonScale, {
    toValue: 0.8,
    duration: 100,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  }).start(() => {
    Animated.timing(saveButtonScale, {
      toValue: 1,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  });
};




 const selectImage = async () => {
   let result = await ImagePicker.launchImageLibraryAsync({
     mediaType: 'photo',
     maxWidth: 800,
     maxHeight: 600,
   });
   if (!result.canceled) {
     setImageUri(result.assets[0].uri);
     setImageBlob(result);


     const plantData = await detectPlant(result.assets[0].uri);
     if (plantData && plantData.suggestions && plantData.suggestions.length > 0) {
       setPlantSpecies(plantData.suggestions[0].plant_name);
     } else {
       Alert.alert('Error', 'Plant not identified');
     }
   }
 };


 const uploadImage = async (url) => {
   if (!imageBlob) return;
    const storage = getStorage();
   const imageRef = ref(storage, url);
   const img = await fetch(imageUri);
   const bytes = await img.blob();
    await uploadBytes(imageRef, bytes).then(() => {
     console.log("Image uploaded successfully!");
     Alert.alert("Success", "Image uploaded successfully!");
   }).catch((error) => {
     console.error("Error uploading image: ", error);
     Alert.alert("Error", "Failed to upload image.");
   });
    // Update the metadata
   const metadata = {
     customMetadata: {
       plantName: plantName,
       species: plantSpecies,
       description: plantDescription,
       pinSize: pinSize,
     },
   };
    await updateMetadata(imageRef, metadata)
     .then(() => {
       console.log("Metadata updated successfully!");
     })
     .catch((error) => {
       console.error("Error updating metadata: ", error);
       Alert.alert("Error", "Failed to update metadata.");
     });
 };




 const handleAddPlant = async () => {
  try {
    console.log("in add Plant id is " + user);
    const response = await fetch(addPlantURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plantname: plantName,
        species: plantSpecies,
        description: plantDescription,
        userId: user,
        lastWatered: Date.now(), // Add the timestamp for the last watered date
      })
    });

    const response_data = await response.json();
    console.log("Returned data from server:", response_data); // Log the returned data
    console.log("line 60:" + response_data.plantUrl);

    if (response_data.plantUrl) {
      await uploadImage(response_data.plantUrl);
      if (route.params.onPlantAdded) {
        route.params.onPlantAdded();
      }
      navigation.navigate("myPlantBase", { user: user });
    } else {
      console.error("Invalid plantUrl received from the server.");
      Alert.alert("Error", "Failed to add plant.");
    }
  } catch (error) {
    console.error(error);
  }
};

 


 return (
   <ScrollView contentContainerStyle={styles.container}>
     <View style={styles.pageBox}>
       <View style={styles.imageContainer}>
         <TouchableOpacity onPress={selectImage} style={[styles.uploadArea, imageUri && { opacity: 0 }]}>
           <View style={styles.imageDottedBorder}>
             {imageUri && <Image source={{uri : imageUri}} style={styles.image} resizeMode="cover" />}
             <Icon name='arrow-up'style={[imageUri && {display: 'none'}]} size={50} color="#385250"></Icon>
             <Text style={[styles.uploadText, imageUri && {display: 'none'}]}>Upload</Text>
           </View>
         </TouchableOpacity>
       </View>
       <View style={styles.addPlantInfo}>
         <View style={styles.plantName}>
           <TextInput
             placeholder='Give your plant a name'
             placeholderTextColor="#385250"
             style={[styles.plantNameInput, { fontSize: 26, fontFamily: 'Kabel-Black' }]}
             onChangeText={setPlantName}
             value={plantName}
           >
           </TextInput>
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
             style={[styles.plantDescriptionInput, { fontFamily: "JosefinSans", fontSize: 20, fontWeight: 'bold' }]}
             onChangeText={text => setPlantDescription(text)}
             value={plantDescription}
           />
         </View>
       </View>
       <View style={styles.pinSizeSelection}>
        {["small", "medium", "large"].map((size, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.taskBubble,
              pinSize === size ? null : styles.completedTaskBubble,
            ]}
            onPress={() => handlePinSizeSelection(size)}
          >
            <Text style={styles.taskBubbleText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

       <View style={styles.confirmArea}>
       <TouchableOpacity
          onPress={() => {
            animateSaveButton();
            handleAddPlant();
          }}
          style={styles.saveBtn}
        >
          <Animated.Text style={{ fontSize: 22, fontFamily: 'Kabel-Black', color: '#FFFFFF', transform: [{ scale: saveButtonScale }] }}>
            Save
          </Animated.Text>
        </TouchableOpacity>

       </View>
     </View>
   </ScrollView>
 );
}