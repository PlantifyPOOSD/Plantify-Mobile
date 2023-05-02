import {StyleSheet, Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    loginPage: { 
        flex: 1,
        backgroundColor: "#FFF7E9",
        width: windowWidth,
        height: windowHeight,
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    loginBox:{
        zIndex: 90,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        borderRadius: 30,
        padding: 30,
        alignSelf: "center",
        backgroundColor: '#FFFFFF',
        width: windowWidth * 0.8, // Set a fixed width (e.g., 80% of the window width)
        minHeight: windowHeight * 0.5, // Set a minimum height (e.g., 50% of the window height)
      },
    plantifyHeader: {
        fontFamily: 'Kabel-Black',
        fontStyle: 'normal',
        fontWeight: '900',
        fontSize: 24,
        textAlign: 'center', 
        color: '#385250',
        marginBottom: 10,
    },
    loginHeader:{
        marginBottom: 30,
        borderBottomWidth: 1,
    },
    headerSubtext: {
        fontFamily: 'Josefin Sans',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 14,
        textAlign: 'center',
        color: '#000000',
        marginBottom: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
      },
    emailInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
    },
    passwordInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 5,
        marginBottom: 40,
    },
    loginButton: {
        backgroundColor: '#385250',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
    },
    loginText: {
        alignSelf: "center",
        fontFamily: 'Kabel-Black',
        fontStyle: "normal",
        fontWeight: 900,
        fontSize: 24,
        color: 'white',
    },
    loginLink: {
        alignSelf: "center",
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
      },
})  