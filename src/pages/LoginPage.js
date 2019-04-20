import React from 'react';
import {View, StyleSheet, Button, Text, ActivityIndicator, Alert} from  'react-native';
import FormRow from '../components/FormRow';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase';

export default class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            mail : '',
            pwd : '',
            isLoading : false,
            msg : ''
        }
    }

    componentDidMount(){
        const config = {
            apiKey: "AIzaSyD57HsBRmAcFZ-3nBrni7wgFiwWyQlu4fw",
            authDomain: "seriesapp-d8186.firebaseapp.com",
            databaseURL: "https://seriesapp-d8186.firebaseio.com",
            projectId: "seriesapp-d8186",
            storageBucket: "seriesapp-d8186.appspot.com",
            messagingSenderId: "760606984784"
        };
        firebase.initializeApp(config);

        
    }

    getMsgByErrorCode(errorCode){
        switch(errorCode){
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            case 'auth/user-disabled':
                return 'user-disabled';
            case 'auth/email-already-in-use':
                return 'Thrown if there already exists an account with the given email address.';
            case 'auth/invalid-email':
                return 'Thrown if the email address is not valid';
            case 'auth/operation-not-allowed':
                return 'Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.';
            case 'auth/weak-password':
                return 'Senha fraca. Defina mais forte.';
            default:
                return 'Erro desconhecido';
        }
    }

    onChangeHandler(field, value){
        this.setState({
            [field] : value 
        });
    }

    renderMsg(){
        const { msg } = this.state;
        if(!msg)
        return null;

        return (
            <View>
                <Text>{msg}</Text>
            </View>
        )
    }

    tryLogin(){
        console.log("Tentando autenticar...");
        this.setState({isLoading : true});
        const { mail, pwd } = this.state;

        const loginSucess = (user) => {
            this.setState({msg : 'Conta criada c sucesso'});
        };
        const loginError = (error) => {
            this.setState({msg : this.getMsgByErrorCode(error.code)});
        };
        
        firebase
        .auth()
        .signInWithEmailAndPassword(mail, pwd)
        .then((user) => {
            this.setState({msg : 'Sucesso!'});
        })
        .catch((error)=>{
            if(error.code == 'auth/user-not-found'){
                Alert.alert(
                        'Usuário não encontrado',
                        'Deseja criar uma conta?',
                        [
                            {
                                text: 'Não',
                                onPress : () => console.log("Usuário não quis criar conta"),
                                style: 'cancel' // IOS
                            }, 
                            {
                                text: 'Sim',
                                onPress : () => {
                                    firebase
                                            .auth()
                                            .createUserWithEmailAndPassword(mail, pwd).
                                            then(loginSucess)
                                            .catch(loginError)
                                }
                            }
                        ],
                        {
                            cancelable : false
                        }
                    ); 
                        //[]
            } else {
                loginError(error)
            }
        })
        .then(() => {
            this.setState({isLoading : false});
        });
    }

    renderButton(){
        if(this.state.isLoading){
            return <ActivityIndicator />
        }
        return <Button 
                    title="Entrar" onPress = {() => this.tryLogin()} />

    }

    render(){
        return (
            <View style={styles.container}>
                <FormRow first>
                    <TextInput
                            style={styles.input} 
                            placeholder="usuario@provedor.com"
                            value={this.state.mail}
                            onChangeText={newValue => this.onChangeHandler("mail", newValue)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput 
                            style={styles.input} 
                            placeholder="******"
                            secureTextEntry
                            value={this.state.pwd}
                            onChangeText={newValue => this.onChangeHandler("pwd", newValue)}
                    />
                </FormRow>
                { this.renderButton() }
                { this.renderMsg() }    
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container : {
        paddingLeft : 10,
        paddingRight : 10
    },
    input : {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5
    }
});


