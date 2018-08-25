import React from 'react';
import {
	Image,
	Dimensions
} from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator,
	createDrawerNavigator
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

// home screen
import Service from '../screens/Home/Service';
import Purchase from '../screens/Home/Service/Purchase';
import Review from '../screens/Home/Service/Review';
import Success from '../screens/Home/Service/Success';

//  staff

import StaffHome from '../screens/Staff/StaffHome';
import Profile from '../screens/Staff/StaffHome/Profile';

const staffNavigation = createDrawerNavigator({
	S_Home: {
		screen: StaffHome,
		navigationOptions: {
			
		}
	}
},{

  contentComponent: Profile,
  drawerWidth: 300

});


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
			tabBarLabel: 'Sign Up',
			tabBarColor: "red",
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
			backgroundColor: '#880E4F',

		},
		indicatorStyle: {
				height: null,
				top: 0,
				backgroundColor: '#E91E63',
			},
		labelStyle: {
				color: '#FFFFFF',
				fontSize: 15,
				
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
			header: ()=> null
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
	},
	Service: {
		screen: Service,
		navigationOptions: {
			title: 'Service',
		}
	},
	Purchase: {
		screen: Purchase,
		navigationOptions: {
			title: 'Purchase',
		}
	},
	Review: {
		screen: Review,
		navigationOptions: {
			title: 'Review',
		}
	},
	Success: {
		screen: Success,
		navigationOptions: {
			header: ()=>null
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
			header: ()=> <Image resizeMode="contain" style={{width:'100%'.width,height:'20%'}} source={require('JNL/ICONS/app/lyn.jpg')} />
		}
	},
	USERPANEL: {
		screen: userNavigation,
		navigationOptions: {
			header: ()=> null
		}
	},
	STAFFWITHHOME: {
		screen: staffNavigation,
		navigationOptions: {
			header: ()=>null
		}
	}
},{
	initialRouteName: 'STAFFWITHHOME',
})

module.exports =  MainNavigation;