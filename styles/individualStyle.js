import {StyleSheet, Dimensions} from "react-native";

export default StyleSheet.create({
    plantPage: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
      backgroundColor: "#fff7e9",
    },
    plantBaseIcon: {
      marginBottom: 16,
    },
    plantContainer: {
      marginTop: 40,
      flex: 1,
      flexDirection: 'column',
    },
    plantImageContainer: {
      marginBottom: 5,
    },
    plantImage: {
      width: '69%',
      height: 250,
      borderRadius: 8,
      alignSelf: 'center',
      resizeMode: 'cover',
    },
    plantBioContainer: {
      borderRadius: 20,
      backgroundColor:  '#385250',
      padding: 16,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 5,
    },
    singlePlantHeader: {
      fontSize: 27,
      fontWeight: 'bold',
      marginBottom: 8,
      fontFamily: 'Kabel-Black',
      color: '#fff',
    },
    plantSubtitles: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#fff',
      fontFamily: 'JosefinSans-Regular',
     
    },
    singlePlantDescription: {
      fontSize: 16,
      marginBottom: 16,
      color: '#385250',
      fontFamily: 'JosefinSans-Regular',
      color: '#fff',
     
    },
    waterDescription: {
      marginLeft: -20,
    },
    sunDescription: {
      marginLeft: -20,
    },
    sunTitle: {
      marginLeft: 5,
    },
    waterIcon: {
      width: '7%',
      height: '100%',
      marginRight: 10,
      marginLeft: -15,
      resizeMode: 'contain',
    },
    sunIcon: {
      width: '18%',
      height: '100%',
      marginRight: -10,
      marginLeft: -32,
    },
    plantDetails: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginHorizontal: 20,
      marginTop: 20,
    },
    plantDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    backButton: {
      position: 'absolute',
      marginLeft: 10,
      marginTop: 10,
      width: 45,
      height: 45,
      resizeMode: 'contain',
      zIndex: 1,
    },
    buttonContainer: {
     flexDirection: 'row',
     justifyContent: 'center',
     paddingTop: 5,
     paddingBottom: 5,
   },
   editBtn: {
     backgroundColor: "black",
     paddingHorizontal: 20,
     paddingVertical: 10,
     borderRadius: 30,
     marginRight: 10,
   },
   editBtnText: {
     fontSize: 16,
     color: "#FFFFFF",
     fontWeight: "600",
     fontFamily: 'Kabel-Black',
   },
   deleteBtn: {
     backgroundColor: '#FF4F4F',
     paddingHorizontal: 20,
     paddingVertical: 10,
     borderRadius: 30,
     marginLeft: 10,
   },
   deleteBtnText: {
     fontSize: 16,
     color: "#FFFFFF",
     fontWeight: "600",
     fontFamily: 'Kabel-Black',
   },
   waterPlantButtonContainer: {
    // Other existing styles for this container...
    alignItems: 'center',
    justifyContent: 'center',
    },
   
   });