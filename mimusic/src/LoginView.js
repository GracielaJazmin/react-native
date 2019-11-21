import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View, 
    Text,
    Image, 
    TextInput, 
    TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getToken} from './api-client';


export default class LoginView extends Component{
    constructor(props){
        super(props);
            this.state = {
                username : null,
                password : null,
            };
    }

    ingresar = () => {
        getToken(this.state.username, this.state.password).then(data => {
            console.warn(`data.token: ${data.token}`)
            global.token = data.token
            Actions.home()
        }).catch((error) => {
            console.warn(error)
        })
    }

        render(){
            return(
            <View style={styles.container}>
                <Image source = {require('./assets/flores.png')} style = {styles.logo} resizeMode = "contain"/>
                <TextInput 
                style={styles.textInput}
                onChangeText={(username ) => this.setState({username})}
                value={this.state.username}
                placeholder={'Correo electronico'}
                placeholderTextColor={'#000035'}
                onSubmitEditing= {() => {this.passwordTextInput.focus();}}
                returnKeyType={'next'}
                autoCapitalize= {'none'}
                />

                <TextInput
                style = {styles.textInput}
                onChangeText = {(password) => this.setState({password})}
                value = {this.state.password}
                secureTextEntry = {true}
                placeholder = {'contraseña'}
                placeholderTextColo = {'#000035'}
                ref = {(input) => {this.passwordTextInput = input;}}
                returnKeyType = {'done'}
                onSubmitEditing = {this.ingresar}
                />

                <TouchableOpacity onPress={this.ingresar} style = {styles.boton}>
                <Text style = {styles.textBoton}>
                Entrar
                </Text>
                </TouchableOpacity>
        </View>
            );
        }}

    const styles = StyleSheet.create(
    {
        container:{
            marginBottom:10,
            flex:1,
            width:null,
            height:null,
            backgroundColor:"white",
            alignItems:"center",
        },
        logo:{
            width:250,
            height:200,
            flexDirection:"row",
            flexWrap:"wrap",
            marginTop:Platform.select({
                ios:150,
                android:150
            }),
            marginBottom:-20
        },
        textInput:{
            height:40,
            backgroundColor:"#f2f2f2",
            width:230,
            color:"#000025",
            marginBottom:40,
            borderRadius:5,
            padding:5,
        },
        boton:{
            justifyContent:"center",
            alignItems:"center",
            width:230,
            height:40,
            backgroundColor:"#00cc00",
            borderRadius:5,
            borderWidth:1,
            borderColor:"#fff",
        },
        textBoton:{
            color:"#fff",
            fontSize:22,
        },
    });

