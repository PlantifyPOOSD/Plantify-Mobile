import { StyleSheet, Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    verifyPage:{
        flex: 1,
        backgroundColor: "#FFF7E9",
        width: windowWidth,
        height: windowHeight,
    },
    backgroundImage:{
        flex: 1,
        resizeMode: 'stretch',
    },
    verifyContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifyBox:{
        zIndex: 90,
        borderWidth: 5,
        borderColor: "#FFFFFF",
        borderRadius: 30,
        padding: 30,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    words:{
        fontSize: 20,
        fontFamily: 'JosefinSans',
    },
    btnWords:{
        fontSize: 20,
        fontFamily: 'JosefinSans',
        color: 'green',
        borderBottomWidth: 1,
        marginTop: 20,
    }
})