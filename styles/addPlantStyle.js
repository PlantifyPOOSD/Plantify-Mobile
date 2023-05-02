import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7E9",
    alignItems: "center",
    justifyContent: "center",
  },
  pageBox: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    borderRadius: 40,
    elevation: 5,
    backgroundColor: "#FFF7E9",
    padding: 15,
  },
  imageContainer: {
    flex: 2,
    marginBottom: 10,
  },
  addPlantInfo:{
    flex: 2,
  },
  uploadArea: {
    width: '100%',
    height: '100%',
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius: 20,
    borderColor: '#B0A58F',
  },
  imageDottedBorder:{
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    borderColor: '#B0A58F',
    width: '95%',
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  uploadText: {
    alignItems: "center",
    fontSize: 36,
    fontFamily: "JosefinSans",
    color: '#385250',
  },
  plantName: {
    flex: 1,
    marginTop: 20,
  },
  plantSpecies: {
    flex: 1,
  },
  plantDescription: {
    flex: 2,
  },
  plantNameInput:{
    borderBottomWidth: 1,
    borderBottomColor:  "#D1C3A7",
  },
  plantSpeciesInput:{
    borderBottomWidth: 1,
    borderBottomColor: '#D1C3A7',
  },
  plantDescriptionInput:{
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
  },
  confirmArea: {
    flex: .5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  saveBtn:{
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#385250',
    borderRadius: 20,
  },
  pinSizeSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pinSizeText: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "JosefinSans",
    color: 'black',
  },
  pinSizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#B0A58F',
    backgroundColor: '#FFF7E9',
    overflow: 'hidden',
  },
  pinSizeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinSizeButtonSelected: {
    backgroundColor: '#385250',
  },
  pinSizeButtonText: {
    color: '#385250',
    fontWeight: '600',
    fontFamily: 'Kabel-Black',
    fontSize: 16,
    
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
  updateButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  updateButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  
});


export default styles;