import React from 'react';
import {
	View
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

// View Container Parent...

const Container = ({children,...props}) =>{
	return(
		<View style={[styles.container,{...props}]}>
		{children}
		</View>
		);
}

Container.propTypes = {
	children: PropTypes.any,
}

module.exports = Container;