import React from 'react';
import {
	Image,
} from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator
} from 'react-navigation';
import {
	createMaterialTopTabNavigator
} from 'react-navigation-tabs';

// imported components / screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Csignup from '../screens/Signup/CompleteSignup';
import Home from '../screens/Home';
import UserDashboard from '../screens/UserDashboard';
import UserProfile from '../screens/UserDashboard/Profile';
import Edit from '../screens/UserDashboard/Profile/Edit';
import ChangePass from '../screens/UserDashboard/Profile/ChangePass';
import Orders from '../screens/UserDashboard/Orders';
import Pending from '../screens/UserDashboard/Orders/Pending';
import Recent from '../screens/UserDashboard/Recent';
import Rejected from '../screens/UserDashboard/Recent/Rejected';

const userPanel = createBottomTabNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			tabBarLabel: 'HOME',
			tabBarIcon: ({ tintColor, focused }) => <Image resizeMode="contain" style={{width: 24,height: 24,}} source={require('JNL/ICONS/USERPANEL/home.png')}/>
		}
	},
	UserDashboard: {
		screen: UserDashboard,
		navigationOptions: {
			tabBarLabel: 'MY ACCOUNT',
			tabBarIcon: ({ tintColor, focused }) => <Image resizeMode="contain" style={{width: 24,height: 24,}} source={require('JNL/ICONS/USERPANEL/round.png')}/>

		}

	}
},{
	
  initialRouteName: 'Home',
  tabBarOptions:{
		
		showIcon:true,
		indicatorStyle: {backgroundColor: '#FFFFFF'},
		labelStyle: {fontSize: 9,fontWeight: 'bold',fontFamily: 'Oswald-Light'}

	}

})

const loginNavigation = createMaterialTopTabNavigator({
	Signup: {
		screen: Signup,
		navigationOptions: {
			tabBarLabel: 'Sign Up'
		}
	},
	Login: {
		screen: Login,
		navigationOptions: {
			tabBarLabel: 'Sign In'
		}
	}
},{
	initialRouteName: 'Signup',
	tabBarOptions: {
		style: {
			backgroundColor: '#FFFFFF',

		},
		indicatorStyle: {
				backgroundColor: 'green',
			},
		labelStyle: {
				color: 'green',
				fontSize: 11,
				
			}
	}
});

const SignStack = createStackNavigator({
	LogSign: {
		screen: loginNavigation,
		navigationOptions: {
			header: ()=> null
		}
	},
	Csignup: {
		screen: Csignup,
		navigationOptions: {
			title: 'Complete Signup'
		}
	},
},{
	initialRouteName: 'LogSign',
});

const Order = createMaterialTopTabNavigator({
	ActiveOrder: {
		screen: Orders,
		navigationOptions: {
			tabBarLabel: 'Active',
		}
	},
	PendingOrder: {
		screen: Pending,
		navigationOptions: {
			tabBarLabel: 'Pending',
		}
	}
},{
	initialRouteName:'ActiveOrder',
	tabBarOptions: {
		style: {
			backgroundColor: '#FFFFFF',

		},
		indicatorStyle: {
				backgroundColor: 'green',
			},
		labelStyle: {
				color: 'green',
				fontSize: 11,
				
			}
	}
});
const RecentNav = createMaterialTopTabNavigator({
	AcceptedComplete: {
		screen: Recent,
		navigationOptions: {
			tabBarLabel: 'Accepted and Completed',
		}
	},
	Rejected: {
		screen: Rejected,
		navigationOptions: {
			tabBarLabel: 'Rejected/Aborted',
		}
	}
},{
	tabBarOptions: {
		style: {
			backgroundColor: '#FFFFFF',

		},
		indicatorStyle: {
				backgroundColor: 'green',
			},
		labelStyle: {
				color: 'green',
				fontSize: 11,
				
			}
	}
});

const userNavigation = createStackNavigator({
	USERPANEL: {
		screen: userPanel,
		navigationOptions: {
			header: ()=> null
		}
	},

	USERPROFILE: {
		screen: UserProfile,
		navigationOptions: {
			title: 'My Profile',
		}
	},
	EDITPROFILE: {
		screen: Edit,
		navigationOptions: {
			title: 'Edit Profile',
		}
	},
	CHANGEPASS: {
		screen: ChangePass,
		navigationOptions: {
			title: 'Edit Profile',
		}
	},
	ORDER: {
		screen: Order,
		navigationOptions: {
			title: 'My Orders',
		}
	},
	RECENT: {
		screen: RecentNav,
		navigationOptions: {
			title: 'Recent Appointments',
		}
	}
},{
	initialRouteName: 'USERPANEL',
	navigationOptions: {
		headerTitleStyle: {
			color: 'green',
		}
	}
})

const MainNavigation = createStackNavigator({
	AUTH: {
		screen: SignStack,
		navigationOptions: {
			header: ()=> null
		}
	},
	USERPANEL: {
		screen: userNavigation,
		navigationOptions: {
			header: ()=> null
		}
	}
},{
	initialRouteName: 'USERPANEL',
})

module.exports =  MainNavigation;