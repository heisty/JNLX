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
import Modal from 'react-native-modalbox';
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
      activeCat: null,
      as_price : null,
      as_title: null,
      as_desc: null,
      as_item: null,
      timerqueue:3,
    };
  }
  componentWillMount(){
    this.props.dispatch(getCat());
    this.handleCatPress("All");
  }

  componentDidMount(){
      this.timerQueue = setInterval(()=>{
          this.setState({
            timerqueue:this.state.timerqueue-1,

          })

          if(this.state.timerqueue===0){
        clearInterval(this.timerQueue);
        this.timerQueue=null;
      }
      },1000);

      
  }
  
  
  handleCatPress=(cat)=>{
    this.setState({
      activeCat: cat,
    });

    this.props.dispatch(getService(cat));


    
    
  }

  handleCat = () =>{
    this.refs.category.open();
  }

  serviceClick = (item) =>{
    this.setState({
      as_price:item.price,
      as_title:item.title,
      as_desc: item.description,
      as_item: item
    })
    this.refs.info.open();
  }

  handleAvailService=(item)=>{
    this.props.navigation.navigate('Purchase',{service:item});
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
    let date = new Date();
    let inMinutes = date.getHours();
    if(inMinutes>12) inMinutes-=12;
    inMinutes*=60;
    let schedTime = inMinutes+date.getMinutes();
    return (
      <Container backgroundColor="#FFFFFF">
      <Card width={width} height={50} backgroundColor="#AD1457" alignItems="center" flexDirection="row">
            <Button onPress={()=>this.props.navigation.openDrawer()}>
            <Image resizeMde="contain" style={{width:32,height:32}} source={require('JNL/ICONS/app/menu.png')}/>
            </Button>
            <Text style={{color: '#FFFFFF',fontSize:14,marginLeft:10}}>LadyLyn Salon</Text>
          </Card>

            <Card width={width} height={150} backgroundColor="#E91E63" alignItems="center" justifyContent="center">

              <Text style={{color:'#FFFFFF',fontSize:25}}>Customer Queue</Text>
              <Text style={{color:'#FFFFFF',fontSize:30}}>5th/20 Customers</Text>
              <Text style={{color:'#FFFFFF',fontSize:20}}>Waiting Time Estimate: {this.state.timerqueue} seconds</Text>

            </Card>

          

        <Card marginTop={5} alignItems="center" justifyContent="center" flexDirection="row">
          <Text>
          Sort by Category
        </Text>
        <Button onPress={()=>this.handleCat()} alignItems="center" justifyContent="center" marginLeft={5} width={120} height={30} borderRadius={5} backgroundColor="#C2185B">
          <Text style={{color: '#FFFFFF',fontWeight:'bold',fontSize:14}}>{this.state.activeCat}</Text>
        </Button>
        </Card>
      <ScrollView>
      	<Card flex={1} margin={0} top={0} >

        </Card>
        <Card marginTop={10} flex={1} justifyContent="space-around" backgroundColor="#FFFFFF">
        <FlatList
        data={service}
        horizontal={false}
        numColumns={2}
        renderItem={({item})=>{
          return(

            <Button borderWidth={0.6} borderColor="#D81B60" borderRadius={5} padding={10} marginTop={10} marginLeft={5} justifyContent="center" onPress={()=>this.serviceClick(item)} width={width/2.1} height={width/2}  backgroundColor="#FFFFFF"  alignItems="center" >
            
            <Image resizeMode="contain" style={{width:width/2,height:width/4}} source={require('JNL/ICONS/app/base1.png')} />
            <Text style={{color: '#00000',fontSize:12,fontWeight:'bold'}}>{item.title}</Text>
            <Text style={{color: '#00000',fontSize:12,fontWeight:'bold'}}>PHP{item.price}</Text>

            </Button>

            );
            
            
        }
      }


        keyExtractor={(item)=>item._id}

        />
        </Card>

        

        </ScrollView>

        <Modal style={{width:width,height:200}} position="bottom" ref="info">

          <Card alignItems="center" justifyContent="center">
            <Text style={{color:'#E53935',fontSize:25,fontWeight:'bold'}}>{this.state.as_title}</Text>
            <Text style={{color:'#AD1457',fontSize:18,fontWeight:'100'}}>{this.state.as_desc}</Text>
             <Text style={{color:'#EF5350',fontSize:18,fontWeight:'100',borderBottomWidth:0.5}}>For only {this.state.as_price} pesos</Text>
          </Card>

          <Card flex={1} alignItems='flex-end' justifyContent='flex-end' />

            <Button marginTop={10} onPress={()=>this.handleAvailService(this.state.as_item)} alignItems='center' justifyContent='center' borderBottomWidth={1} borderBottomColor="#CCCCCC" width={width} height={50} backgroundColor="#EC407A">
            <Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>Avail Service</Text>
            </Button>

        </Modal>

          <Modal style={{width:width-60,height:200,borderRadius:5}} position="center" ref="category">
            
          <Text style={{fontSize:15,fontWeight:'bold',marginLeft:10}}>Categories</Text>
          <Text style={{fontSize:10,fontWeight:'bold',marginLeft:10}}>Scroll to hover to all categories</Text>

          <ScrollView>

          <Card flex={1} alignItems='flex-end' justifyContent='flex-end' />
            
          <Card flex={1}>

            <FlatList
              data={cat}
              renderItem={({item})=>{
                let catname = item.catname;
                return(

                    <Card alignItems="center" justifyContent="center" padding={10}>
                    <Button onPress={()=>this.handleCatPress(catname)} alignItems='center' justifyContent='center' borderBottomWidth={1} borderBottomColor="#CCCCCC" width={width-120} height={50} backgroundColor="#EC407A">
                    <Text style={{color: '#FFFFFF',fontWeight: 'bold',textAlign:'center'}}>{item.catname}</Text>
                    </Button>
                    </Card>

                  );
              }}

              keyExtractor={(item)=>item._id}
            />

          </Card>  
          
          </ScrollView>

        </Modal>


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