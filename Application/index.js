'use strict';

import React, { Component } from 'react';
import {
	Provider
} from 'react-redux';
import {
	YellowBox
} from 'react-native';

// imported components
import {configureStore} from './store';
import Router from './router';
console.disableYellowBox = !true;

class index extends Component {
  render() {
    return (
      	
    	<Provider store={configureStore()}>
    		<Router />
    	</Provider>

    );
  }
}

module.exports = index;