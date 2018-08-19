import React from 'react';
import {
	View
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

// View Container Parent...

const Container = ({children}) =>{
	return(
		<View style={styles.container}>
		{children}
		</View>
		);
}

Container.propTypes = {
	children: PropTypes.any,
}

module.exports = Container;