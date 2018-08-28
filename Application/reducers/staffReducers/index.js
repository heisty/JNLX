import {combineReducers} from 'redux';
import login from './login';
import data from './data';
module.exports = combineReducers({
	login,
	data
})