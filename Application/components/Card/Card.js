import React from 'react';
import {
	View
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Card = ({children,...props}) => {
	return(

		<View style={[styles.card,{...props}]}>
			{children}
		</View>

		);
}

Card.propTypes = {
	children: PropTypes.any,
}

module.exports = Card;