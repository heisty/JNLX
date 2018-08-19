Info needed

Firstname,
Lastname,
email address
cellphone number,
address
	Primary
	Secondary

Format
	Street , brgy , muncipality , city

Gender


'use strict';
import React, { PropTypes, Component } from 'react';
import {View} from 'react-native';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

export default class login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      var _this = this;
        return (
          <FBLogin 
            ref={(fbLogin) => { this.fbLogin = fbLogin }}
            permissions={["email","public_profile","user_location","user_hometown","user_birthday","user_about_me","user_friends","user_likes","pages_show_list","user_education_history","user_work_history"]}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            onLogin={function(data){          
                _this.props.onLogin(data.credentials.token, _this.props.navigator);
            }}
            onLogout={function(){
                _this.props.onLogout(_this.props.navigator);
            }}
            onError={function(data){                  
            }}
          />
        );
  }
};