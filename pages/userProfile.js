import React, { useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import defaultProfilePic from '../img/plantify_logo.png';


export default function ProfilePicture({ route }) {
  const { user } = route.params;
  console.log(user);
  
  const [imageUri, setImageUri] = useState(null);
  const [defaultImage, setDefaultImage] = useState(defaultProfilePic);

  const handleLogout = () => {
    navigation.navigate('login'); 
  };

  const navigation = useNavigation();

  const fetchProfilePicture = async () => {
    const storage = getStorage();
    const imageRef = ref(storage, `users/${user}/profilePic/profile.jpg`);
  
    try {
      const existingImageUrl = await getDownloadURL(imageRef);
      setImageUri(existingImageUrl);
      setDefaultImage(null); // Set the defaultImage state to null when a profile picture is found
    } catch (error) {
      console.log('No existing profile picture found:', error);
    }
  };
  

  useEffect(() => {
    fetchProfilePicture();

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Error', 'Sorry, we need media library permissions to make this work!');
        }
      }
    })();
  }, []);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleDeleteProfilePicture = async () => {
    const storage = getStorage();
    const imageRef = ref(storage, `users/${user}/profilePic/profile.jpg`);
  
    try {
      await deleteObject(imageRef);
      console.log('Profile picture deleted successfully!');
      Alert.alert('Success', 'Profile picture deleted successfully!');
      setImageUri(null);
      setDefaultImage(defaultProfilePic);
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      Alert.alert('Error', 'Failed to delete profile picture.');
    }
  };
  
  const uploadImage = async () => {
    if (!imageUri) return;

    const storage = getStorage();
    const imageRef = ref(storage, `users/${user}/profilePic/profile.jpg`);
    const img = await fetch(imageUri);
    const bytes = await img.blob();
    await uploadBytes(imageRef, bytes)
      .then(() => {
        console.log("Image uploaded successfully!");
        Alert.alert("Success", "Image uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
        Alert.alert("Error", "Failed to upload image.");
      });
  };

  const handleUploadProfilePicture = async () => {
    await uploadImage();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageBox}>
        <Text style={styles.title}>My Profile</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={selectImage} style={styles.uploadArea}>
          <View style={styles.imageDottedBorder}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />}
            {!imageUri && defaultImage && <Image source={defaultImage} style={styles.defaultImage} resizeMode="cover" />}
            {!imageUri && !defaultImage && <Text style={styles.uploadText}>Upload Profile Picture</Text>}
          </View>
          </TouchableOpacity>
        </View>
        <View style={styles.confirmArea}>
          <TouchableOpacity
            onPress={handleUploadProfilePicture}
            style={styles.saveBtn}
          >
            <Text style={{ fontSize: 22, fontFamily: 'Kabel-Black', color: '#FFFFFF' }}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteProfilePicture}
            style={styles.deleteBtn}
          >
            <Text style={{ fontSize: 22, fontFamily: 'Kabel-Black', color: '#FFFFFF' }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.confirmArea}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={{ fontSize: 22, fontFamily: 'Kabel-Black', color: '#FFFFFF' }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF7E9",
  },
  title: {
    fontSize: 28,
    fontFamily: 'Kabel-Black',
    color: '#333',
    marginBottom: 20,
    marginTop: 30,
  },
  pageBox: {
    width: '90%',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#999',
    display: 'none',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  uploadArea: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  },
  defaultImage: {
    width: 100,
    height: 100,
    borderRadius: 80,
  },
  imageDottedBorder: {
    borderWidth: 2,
    borderColor: '#999',
    borderStyle: 'dotted',
    borderRadius: 100,
    overflow: 'hidden',
    padding: 2,
  },
  defaultImageDottedBorder: {
    borderWidth: 2,
    borderColor: '#999',
    borderStyle: 'dotted',
    borderRadius: 100,
    overflow: 'hidden',
    padding: 2,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  uploadText: {
    fontSize: 16,
    color: '#999',
  },
  confirmArea: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },  
  saveBtn: {
    backgroundColor: "#385250",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 130,
  },
});
