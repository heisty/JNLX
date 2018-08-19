import {
	createStore,
	compose,
	applyMiddleware
} from 'redux';
import reducer from '../reducers';

// adding persistence ? remember it...

import thunk from 'redux-thunk';

export var configureStore = () =>{
	return createStore(reducer,{},compose(applyMiddleware(thunk)));
}
