import {StyleSheet, Dimensions} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    registerPage: { 
        flex: 1,
        backgroundColor: "#FFF7E9",
        width: windowWidth,
        height: windowHeight,
    },
    registerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    registerBox:{
        zIndex: 90,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        borderRadius: 30,
        padding: 30,
        alignSelf: "center",
        backgroundColor: '#FFFFFF',
    },
    registerHeader: {
        marginBottom: 30,
        borderBottomWidth: 1,
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
    headerSubtext: {
        fontFamily: 'Josefin Sans',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 14,
        textAlign: 'center',
        color: '#000000',
        marginBottom: 10,
    },
    backgroundImage:{
        flex:1,
        resizeMode: "stretch",
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
        marginBottom: 20,
    },
    registerButton: {
        backgroundColor: '#385250',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
    },
    registerText: {
        alignSelf: "center",
        fontFamily: 'Kabel-Black',
        fontStyle: "normal",
        fontWeight: 900,
        fontSize: 24,
        color: 'white',
    },
    registerLink: {
        alignSelf: "center",
    },
    firstNameInput:{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
    },
    lastNameInput:{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
    },
    usernameInput:{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
    },
    registerButton:{
        backgroundColor: '#385250',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
    },
    registerText:{
        alignSelf: "center",
        fontFamily: 'Kabel-Black',
        fontStyle: "normal",
        fontWeight: 900,
        fontSize: 24,
        color: 'white',
    },
    registerLink:{
        alignSelf: "center",
    },
    passwordReqs:{
        marginBottom: 20,
    }
})  