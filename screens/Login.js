import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView, SafeAreaView, Image, View, TouchableOpacity, Text, TextInput} from 'react-native';


// TODO: get image resource
const img = require('../assets/logo.png'); 

export default class Login extends Component {

    state = {
        email: 'lucasfomaniero@gmail.com',
        password: ''
    }

    handleEmailChange = email => {
        console.log(email);
        this.setState({email});
    };

    handlePasswordInput = password => {

    };

   

    render(){

        return(
            <SafeAreaView style={{flex: 1}}>
                <KeyboardAvoidingView style={styles.container} behavior='padding'>    
                    <View style={styles.topView}>
                        <Image style={styles.img} source={img}></Image>
                    </View>
                    <View style={styles.bottomView}>
                        <TextInput 
                            style={styles.input} 
                            placeholder='E-mail'
                            keyboardType={'email-address'}
                            onChangeText={(text)=> this.handleEmailChange(text)}
                            autoCapitalize='none'>
                        </TextInput>
                        <TextInput 
                            style={styles.input} 
                            onChangeText={(text)=> this.handlePasswordInput(text)}
                            placeholder='Password' 
                            secureTextEntry={true}
                            >
                        </TextInput>
                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                        <View>
                            <Text text={this.state.email} >

                            </Text>
                            <Text>
                                
                            </Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
    },

    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    img: {
        width: 200,
        height: 200
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20,
    },
    input: {
        marginBottom: 20,
        fontSize: 14
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textRegister: {
        fontWeight: 'bold'
    },
    loginButton: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#48a7f2',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        padding: 16,
        width: '30%',
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFF'
    }
})