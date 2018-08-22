'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
	Text,
	Dimensions,
	ScrollView,
  Image,
  FlatList
} from 'react-native';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import TextInputMask from 'react-native-text-input-mask';
import {connect} from 'react-redux';
// imported components
import Container from '../../components/Container';
import Card from '../../components/Card';
import styles from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

// FUNCs
import {
  getCat,
} from '../../actions/Product';

import {
  getService 
} from '../../actions/Service';

import {
  StackActions,NavigationActions
} from 'react-navigation';

import {
  getServiceType
} from '../../actions/Service';


class Home extends Component {
  

  handleServicePress = (item) =>{

    this.props.dispatch(getServiceType(item.title));


    const {
      navigate
    } = this.props.navigation;
    navigate('Service',{"service":item});
  }
  constructor(props) {
    super(props);
  
    this.state = {
      activeTitle: null
    };
  }
  componentWillMount(){
    this.props.dispatch(getCat());
    this.handleCatPress("All");
  }
  
  
  handleCatPress=(category)=>{
    this.setState({
      activeTitle: category,
    })
    this.props.dispatch(getService(category));
  }
  render() {
    const {
      width,
      height
    } = Dimensions.get('window');

    const {
      cat,
      service
    } = this.props;
    return (
      <Container>
      <ScrollView>
      	<Card flex={1} backgroundColor="#FFFFFF">
          <Card shadowOffset={{width:0,height:2}} shadowColor="#000" shadowOpacity={0.8} shadowRadius={2} width={width} height={150}>
            <Card>
            </Card>
          </Card>
          <Card alignItems="center" justifyContent="center">
          <FlatList 
          data={cat}
          horizontal={true}
          renderItem={({item})=>{
            let actTTL = item.catname;
            return(
              <Button onPress={()=> this.handleCatPress(actTTL)} alignItems="center" justifyContent="center">
              <Image resizeMode="contain" style={{width: 48,height:48,borderRadius:360,margin:10}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
              <Text style={{margin:0}}>{item.catname}</Text>
              </Button>

              );
          }}
          keyExtractor={(item)=> item._id}

          />
          </Card>
          <Card marginTop={10}>
           <Text style={{fontWeight: 'bold'}}>{this.state.activeTitle} Services</Text>
          </Card>
          
      	</Card>
        <Card width={width}>
        <FlatList

        data={service}
        horizontal={false}
        numColumns={2}
        renderItem={({item})=>{
          return(

            <Button onPress={()=>this.handleServicePress(item)} alignItems="center" justifyContent="center" margin={5} width={width/2.15} height={200} borderRadius={6} backgroundColor="#FFFFFF">
            <Image resizeMode="contain" style={{width: '80%',height:'80%'}} source={require('JNL/ICONS/USERPANEL/round.png')}/>
            <Text>{item.title}</Text>
            <Text style={{fontWeight: 'bold'}}>PHP {item.price}</Text>
            </Button>

            );
        }}

        keyExtractor={(item)=>item._id}

        />
        </Card>
        </ScrollView>
      </Container>
    );
  }
}


let mapStateToProps = (state)=>{
	return {
		cat: state.product.cat.cat,
    service: state.product.service.service,
	}
}

module.exports = connect(mapStateToProps)(Home);