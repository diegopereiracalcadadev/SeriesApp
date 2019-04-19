import React from 'react';
import {View, StyleSheet, Button} from  'react-native';
import FormRow from '../components/FormRow';
import { TextInput } from 'react-native-gesture-handler';

export default class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            mail : '',
            pwd : ''
        }
    }

    onChangeHandler(field, value){
        this.setState({
            [field] : value 
        });
    }

    tryLogin(){
        console.log("Try login invoked");
        console.log(this.state);
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
                <Button title="Entrar" onPress = {() => this.tryLogin()} />
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


