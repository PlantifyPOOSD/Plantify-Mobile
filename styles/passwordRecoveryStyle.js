import { StyleSheet, Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    passwordRecPage:{
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
    },
    words:{
        fontSize: 20,
        fontFamily: 'JosefinSans',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    passwordInput:{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 5,
        marginBottom: 15,
        textAlign: 'center',
    },
    submitBtn:{
        backgroundColor: '#385250',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
    },
    submitTxt:{
        alignSelf: "center",
        fontFamily: 'Kabel-Black',
        fontStyle: "normal",
        fontWeight: 900,
        fontSize: 24,
        color: 'white',
    },
    resetWords:{
        alignSelf: 'center',
        justifyContent: 'center',
    }
})