import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, BackHandler, ImageBackground, TouchableHighlight } from 'react-native';
import { red } from '../assets/colors';
import Input from '../components/Input';
import Button from '../components/Button';
import { height, width } from '../assets/dimensions';
import { connect } from 'react-redux';
import { newlogin } from '../action/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import { Entypo } from '@expo/vector-icons';

const Login = ({ navigation, newlogin }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [ form, setForm ] = useState({
        username: '', password: ''
    });
    const [loading, isLoading] = useState(false);
    const changeInput = (e, name) => {
        setForm({
            ...form, [name]: e
        })
    }
    
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          backHandler.remove();
        };
      }, []);

      function handleBackButtonClick() {
        setModalVisible(true);
        return true;
    }

    const loginUser = async () => {
      isLoading(true);
        const response = await newlogin(form);
        if(response.success) {
          console.log("success")
            AsyncStorage.setItem('user', JSON.stringify(response))
            setForm({
                username: '', password: ''
            });
            navigation.navigate('Home')
        }
        isLoading(false);
    }

    const { username, password } = form;
    return (
      <>
      {loading && <Loader />}
        {!loading && <View style={{
            flex: 1
        }}>
        <View style={{...styles.mainContainer}}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/pngs/Logo02.png')} style={{height: 40}} resizeMode='contain' />
            </View>
                <View style={styles.formContainer}>
                  <View style={{marginVertical: 5}}>
                    <Input changeInput={changeInput} value={username} name='username' placeholder="Username" icon="user" library="FontAwesome" />
                  </View>
                    
                <View style={{marginVertical: 5}}>
                    <Input changeInput={changeInput} value={password} name='password' secureTextEntry={true} placeholder="Password" icon="key" library="Entypo"  >
                    </Input>
                </View>
                <View style={{marginVertical: 5}}>
                <Button label="Login" bgColor={red} textColor="white" clickEvent={()=>loginUser()}  />
                </View>
                
                <View style={{ justifyContent:'flex-end', alignItems:'flex-end', alignContent:'center',marginBottom:10}}>
                    <Text style={{fontSize:14}} onPress={() => navigation.navigate('ForgotPassword')}>
                        Forgot Password ?
                    </Text>
                </View>
            </View>

            <View style={{ paddingHorizontal: width * 0.07,paddingBottom:20 }}>
                <View style={{marginTop:20, justifyContent:'center', alignItems:'center', alignContent:'flex-end',marginBottom:10}}>
                    <Text style={{fontSize:16}}>
                        {` `}
                    </Text>
                    <Text style={{fontSize:16, fontWeight: "bold"}} onPress={()=>navigation.navigate('Register')}>
                        {` `}
                    </Text>
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', alignContent:'center', height: height * 0.35, backgroundColor: "#f0f0f0"}}>
                <Image source={require('../assets/pngs/Image01.png')} style={{width: width * 0.7}} resizeMode='contain' />
            </View>
            <View style={{ paddingHorizontal: width * 0.07,paddingBottom:20 }}>
                <View style={{marginTop:20, justifyContent:'center', alignItems:'center', alignContent:'flex-end',marginBottom:10}}>
                    <Text style={{fontSize:16}}>
                        The App Managed By
                    </Text>
                    <Text style={{fontSize:16, fontWeight: "bold"}} >
                        Digital Cafeteria Solutions Pvt. Ltd.
                    </Text>
                </View>
            </View>
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to close this application?</Text>

            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center', display:'flex',flexDirection:'row'}}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#4caf50" }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>No</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#f44336" }}
              onPress={() => {
                BackHandler.exitApp();
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
         </View>}
         </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height:height,
        backgroundColor: '#f0f0f0'
    },
    logoContainer: {
        height: height * 0.15,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10
    },
    formContainer: {
        height: height * 0.25,
        paddingHorizontal: width * 0.07,
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 16,
        color: 'white',
        marginBottom: 8
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        flex:1,
        margin:10
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})


const mapStateToProps = state => ({

})


export default connect(
    mapStateToProps, {
        newlogin
    }
) (Login)