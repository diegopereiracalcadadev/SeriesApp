import React from 'react';
import {View, TextInput, Text, Button} from 'react-native';

const FormRow = props => {
    const { children, first, last } = props;

    return (
        <View style={[
            styles.container,
            first ? styles.first : null,
            last ? styles.last : null
            ]}>
            {children}
        </View>
    )
};

const styles = {
    container : {
        padding : 10,
        backgroundColor: 'white',
        marginBottom : 10,
        elevation : 1
    },
    first : {
        marginTop: 10,
    },
    last : {
        marginBottom: 10,
    }
};

export default FormRow;