import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Button from '../components/Button';
import { height, width } from '../assets/dimensions';
import {createOrder} from '../action/auth';
import { connect } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";

const Cart = ({ navigation, createOrder }) => {
    const [item, setItem] = useState([]);
    const [deliveryAmount, setTotalPrice] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    // useEffect(() => {
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    //     return () => {
    //       backHandler.remove();
    //     };
    //   }, []);

    //   function handleBackButtonClick() {
    //     navigation.navigate('Home');
    //     return true;
    // }

    useEffect(()=>{
        showCart();
    }, [item])

    const showCart = async () => {
        const isExist = await AsyncStorage.getItem('cart');
        if(JSON.parse(isExist) && JSON.parse(isExist).length > 0) {
            setItem(JSON.parse(isExist));
            let v_amount = 0;
            JSON.parse(isExist).map(v => {
                v_amount = v_amount + (parseInt(v.dish_price) * v.quantity);
            });
            setSubTotal(v_amount)
        } else {
            setSubTotal(0)
            setItem([]);
        }
    }

    const addToCart = async (item) => {
        const isExist = await AsyncStorage.getItem('cart');
        if(JSON.parse(isExist) && JSON.parse(isExist).length > 0) {
            let itemExists = JSON.parse(isExist).find(v => (item.type == 'menu') ? v.item_id ==  item.menuid : v.item_id == item.thali_id );
            if(itemExists) {
                let items = JSON.parse(isExist).map(v => ((item.type == 'menu') ? v.item_id ==  item.menuid : v.item_id == item.thali_id) ? {...v, quantity: v.quantity + 1} : v );
                AsyncStorage.setItem('cart', JSON.stringify(items));
            } else {
                AsyncStorage.setItem('cart', JSON.stringify([...JSON.parse(isExist),{...item,quantity: 1, type:item.type, item_id: item.type == 'menu' ? item.menuid : item.thali_id }]));
            }
        }
        showCart()
    }

    const removeItem = async (item) => {
        const isExist = await AsyncStorage.getItem('cart');
        if(item.quantity > 1) {
            if(JSON.parse(isExist) && JSON.parse(isExist).length > 0) {
                let itemExists = JSON.parse(isExist).find(v => (item.type == 'menu') ? v.item_id ==  item.menuid : v.item_id == item.thali_id );
            if(itemExists) {
                let items = JSON.parse(isExist).map(v => ((item.type == 'menu') ? v.item_id ==  item.menuid : v.item_id == item.thali_id) ? {...v, quantity: v.quantity - 1} : v );
                AsyncStorage.setItem('cart', JSON.stringify(items));
                
            }
            }
        } else {
                let itemExists = JSON.parse(isExist).filter(v => (item.type == 'menu') ? v.item_id !=  item.menuid : v.item_id != item.thali_id );
                AsyncStorage.setItem('cart', JSON.stringify(itemExists));
            console.log(itemExists)
        }
        showCart();
    }

    const deleteItem = async (item) => {
        const isExist = await AsyncStorage.getItem('cart');
        if(item.quantity > 1) {
            if(JSON.parse(isExist) && JSON.parse(isExist).length > 0) {
                let itemExists = JSON.parse(isExist).find(v => (item.type == 'menu') ? v.item_id ==  item.menuid : v.item_id == item.thali_id );
            if(itemExists) {
                let items = JSON.parse(isExist).map(v => ((item.type == 'menu') ? v.item_id ==  item.menuid : v.item_id == item.thali_id) ? {...v, quantity: v.quantity - v.quantity} : v );
                AsyncStorage.setItem('cart', JSON.stringify(items));
                
            }
            }
        } else {
                let itemExists = JSON.parse(isExist).filter(v => (item.type == 'menu') ? v.item_id !=  item.menuid : v.item_id != item.thali_id );
                AsyncStorage.setItem('cart', JSON.stringify(itemExists));
            console.log(itemExists)
        }
        showCart();
    }
    
    const pay = async () => {
        let user = await AsyncStorage.getItem('user');
        if(item && item.length > 0) {
            let foodname = [];
            let dishcount = [];
            item.map((v,index) => {
                foodname.push( v.item_id);
                dishcount.push(v.quantity);
            });
            const userDishes = {foodname, dishcount, totalprice: deliveryAmount + subTotal, cust_id: JSON.parse(user).cust_id};
            console.log(userDishes)
            const response = await createOrder(userDishes);
            console.log('api response ==++++++++++>',response);
        if(response.success) {
            AsyncStorage.removeItem('cart');
            navigation.navigate('OrderSuccess')
        }
        }
        // navigation.navigate('OrderSuccess')
        
    }

    return (
        <>
        <ScrollView style={{
            flex: 1,
            backgroundColor:'white'
        }}>
            <Header navigation={navigation} />


            <View style={{...styles.deliveryAddress}}>
            
            {item && item.length > 0 && item.map((cart, index) => 
            <View key={index} style={{display:'flex', flexDirection:'row',flex:1,marginLeft:0,  marginRight:0, marginTop:5 }}>
                        <View style={{height: width * 0.3, width: width* 0.3}}>
                            <Image source={{ uri: 'http://food.breeur.in/'+cart.menu_img }} style={{height: width * 0.3, width: width* 0.3, borderRadius:5}} />
                        </View>
                        <View style={{flex:1, marginLeft:20,}}>
                            <Text style={{fontSize: 20, fontWeight: 'normal', marginBottom: 5 }}>
                                {cart.type=='menu'?cart.dish_name : cart.thali_name}
                            </Text>
                            <Text style={{color: 'grey', marginBottom: 5}}>
                                {cart.type=='menu'?cart.menu_category: cart.dish_include}
                            </Text>
                            
                            <View style={{display:'flex', flexDirection:'row', alignContent: 'flex-end', justifyContent: 'space-between', marginTop: 25}}>
                                <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                    Rs. {parseInt(cart.dish_price) * cart.quantity}
                                </Text>
                                </View>
                                <View style={{flexDirection:'row', alignItems: 'center'}}>
                                    <TouchableOpacity style={{marginHorizontal: 5}} onPress={()=> deleteItem(cart)}>
                                        <Ionicons name="md-trash" size={25} color="#a00030" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginHorizontal: 5}} onPress={()=>removeItem(cart)}>
                                        <Ionicons name="ios-remove-circle-outline" size={25} color="#a00030" />
                                    </TouchableOpacity>
                                        <Text style={{marginHorizontal: 5}}>{cart.quantity}</Text>
                                    <TouchableOpacity style={{marginHorizontal: 5}} onPress={()=>addToCart(cart)}>
                                        <Ionicons name="ios-add-circle-outline" size={25} color="#a00030" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        </View>
            )}
                        
            </View>
        </ScrollView>
        <ScrollView style={{flex:1,position:'absolute', backgroundColor:'white',width:width, borderTopRightRadius:20, borderTopLeftRadius:20, top:'75%',elevation:2}}>
            <View style={{paddingVertical:20, marginBottom:50, padding: 10}}>
                <View style={{display:'flex', flexDirection:'row',}}>
                    <Text style={{fontSize:16, flex:1, marginBottom: 5, fontWeight: "bold"}}>
                        Items Selected
                    </Text>
                    <Text style={{fontWeight: "bold"}}>
                        {item.length > 0 ? item.length : 0}
                    </Text>
                </View>
                <View style={{display:'flex', flexDirection:'row',}}>
                    <Text style={{fontSize:16, flex:1, marginBottom: 5}}>
                        Sub Total
                    </Text>
                    <Text>
                        Rs. {subTotal}
                    </Text>
                </View>
                <View style={{display:'flex', flexDirection:'row', marginBottom: 5}}>
                    <Text style={{fontSize:16, flex:1}}>
                        Delivery Fee
                    </Text>
                    <Text>
                        Rs. {deliveryAmount}
                    </Text>
                </View>
                <View style={{display:'flex', flexDirection:'row', marginBottom: 5}}>
                    <Text style={{fontWeight:'bold', fontSize:16, flex:1}}>
                        Total
                    </Text>
                    <Text>
                        Rs. {subTotal + deliveryAmount}
                    </Text>
                </View>
                <View style={{width: width, justifyContent: "center", paddingEnd: 20 }}>
                    <Button label="Pay" bgColor="#04b215" textColor="white" clickEvent={()=>pay()}  />
                </View>
            </View>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height:height,
        backgroundColor: '#f0f0f0'
    },
    deliveryAddress: {
        backgroundColor:'white',
        paddingVertical:10,
        paddingHorizontal:20,
        margin:10,
        borderRadius:6,
        flex: 1
    },
    deliveryDurationContainer: {
        display:'flex',
        flexDirection:'row',
        paddingVertical:10,
        paddingHorizontal:20,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    }
})


const mapStateToProps = state => ({

})


export default connect(
    mapStateToProps, {
        createOrder
    }
) (Cart)