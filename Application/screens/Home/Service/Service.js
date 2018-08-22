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
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import styles from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

// funcions

class Service extends Component {
  handleAvailPress = () =>{
    const {
      navigate
    } = this.props.navigation;
    navigate('Purchase');
  }
  componentWillMount(){
    
    
  }
  render() {
  	const {width,height} = Dimensions.get('window');
    const {types} = this.props;
    const {
      service
    } = this.props.navigation.state.params;
    console.warn("STYPE",this.props.types);
    return (
      <Container backgroundColor="white">
      <ScrollView>
      	<Card alignItems="center" justifyContent="center" width={width} height={60} backgroundColor="darkblue">
      		<Text style={{color: '#FFFFFF',fontWeight:'bold'}}>Massage Service Information</Text>
      	</Card>
        <Card alignItems="center" justifyContent="center">
        <Card alignItems="center" justifyContent="center">
      	<Card width={width-50} marginTop={10} alignItems="center" justifyContent="center" height={150} borderRadius={6} borderWidth={0.5}>
      		</Card>
      		</Card>

          <Card width={width-50} marginTop={10} alignItems="center" justifyContent="center" height={150} borderRadius={6}>
              <Card  marginTop={10}>
            <Text>{service.title}</Text>
        </Card>

        <Card marginTop={10} marginBottom={10} >
            <Text>{service.description}</Text>
        </Card>

        <Card borderRadius={6} width={70} height={40} backgroundColor="teal" alignItems="center" justifyContent="center" >
            <Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>PHP {service.price}</Text>
        </Card>
          </Card>
          </Card>

      	

      	<Card marginTop={10}>
      		<Card>		
      			<Text>Available {service.title} Types</Text>
      		</Card>

      		<FlatList
            data={types}
            renderItem={({item})=>{
              return(

                <Button backgroundColor="white" width={width/4} height={width/4} borderRadius={6} marginTop={10} marginLeft={3} marginRight={3} >
                 <Image resizeMode="contain" style={{width:width/4,height:width/6}} source={require('JNL/ICONS/USERPANEL/round.png')} />
                 <Text style={{textAlign: 'center'}}>{item.title}</Text>
                 </Button>

                );
            }}
            keyExtractor={(item)=>item._id}
          />
      	</Card>
        </ScrollView>
      	<Card flex={1} alignItems='flex-end' justifyContent='flex-end' />

      	<Button onPress={()=>this.handleAvailPress()} alignItems='center' justifyContent='center' width={width} height={50} backgroundColor="royalblue">
      	<Text style={{color: '#FFFFFF',fontWeight: 'bold'}}>Avail Service</Text>
      	</Button>

      	

      </Container>
    );
  }
}

let mapStateToProps = (state) =>{
	return {
    types: state.product.service.types,
	}
}

module.exports = connect(mapStateToProps)(Service);