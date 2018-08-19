import React from 'react';
import {
	TouchableHighlight,
} from 'react-native';
import {TextInputMask} from 'react-native-text-input-mask';
import PropTypes from 'prop-types';

// components imported
import styles from './styles';

const MaskInput = ({children,...props}) =>{
	return(

			<TouchableHighlight style={[styles.input,{...props}]}>
				<TextInputMask {...props} />
			</TouchableHighlight>

		);
}

Input.propTypes = {
	children: PropTypes.any,
}

module.exports = MaskInput;