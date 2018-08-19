import React from 'react';
import {
	TouchableOpacity
} from 'react-native';
import styles from './styles';
const Button = ({children,...props}) =>{
	return(

		<TouchableOpacity {...props} style={[styles.btn,{...props}]}>
			{children}
		</TouchableOpacity>

		);
}

module.exports = Button;