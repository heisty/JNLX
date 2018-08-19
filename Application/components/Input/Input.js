import React from 'react';
import {
	TouchableHighlight,
	TextInput
} from 'react-native';
import PropTypes from 'prop-types';

// components imported
import styles from './styles';

const Input = ({children,...props}) =>{
	return(

			<TouchableHighlight style={[styles.input,{...props}]}>
				<TextInput {...props} underlineColorAndroid="transparent"/>
			</TouchableHighlight>

		);
}

Input.propTypes = {
	children: PropTypes.any,
}

module.exports = Input;