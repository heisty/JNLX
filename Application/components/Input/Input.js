import React from 'react';
import {
	TouchableHighlight,
	TextInput,
	Image,
	View
} from 'react-native';
import PropTypes from 'prop-types';

// components imported
import styles from './styles';

const Input = ({children,...props}) =>{
	return(

			
				<TextInput style={{...props}} {...props} underlineColorAndroid="transparent"/>
			
		);
}

Input.propTypes = {
	children: PropTypes.any,
}

module.exports = Input;