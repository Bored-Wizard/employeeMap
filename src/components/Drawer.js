import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableHighlight, Image } from 'react-native';
import {height, width } from '../assets/dimensions';
import { DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userData from '../../App';

const Drawer = ({navigation}) => {
    const grey = "#cfd8dc";
    const userInfo = useContext(userData);
    const [userName, setUserName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const logoutUser = async () => {
        setModalVisible(false);
        AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('loggedIn');
        navigation.navigate('Login');
    }


    const user = async () => {
        const okk = await AsyncStorage.getItem("user");
        const userj = JSON.parse(okk);
        setUserName(userj.name.toUpperCase())
        console.log(userName)
    }

    useEffect(() => {
        user();
    }, [])
    
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerIcon}>
                <TouchableOpacity onPress={() => {console.log(userInfo);navigation.closeDrawer()}}>
                    <Ionicons name="ios-close-circle-outline" size={40} color={grey} />
                </TouchableOpacity>
            </View>
            <DrawerContentScrollView>
                
                <View style={styles.userArea}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: 'grey'}} >{userName}</Text>
                </View>
                <View style={styles.drawerListSection}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style={styles.list} onPress={() => navigation.navigate("Health")}>
                        <Text style={styles.listText}>Health Tracker</Text>
                        <Ionicons name="ios-arrow-forward" size={30} color={grey} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.list} onPress={() => {}}>
                        <Text style={styles.listText}>Wallet</Text>
                        <Ionicons name="ios-arrow-forward" size={30} color={grey} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.list} onPress={() => navigation.navigate("Report")}>
                        <Text style={styles.listText}>Reports</Text>
                        <Ionicons name="ios-arrow-forward" size={30} color={grey} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.list} onPress={() => {setModalVisible(true)}}>
                        <Text style={styles.listText}>Logout</Text>
                        <Ionicons name="ios-arrow-forward" size={30} color={grey} />
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerContentScrollView>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Image source={require('../assets/pngs/Logo02.png')} resizeMode="contain" style={{width: width * 0.5}} />
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
                    <Text style={styles.modalText}>Are you sure you want to logout?</Text>

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
                        logoutUser();
                    }}
                    >
                    <Text style={styles.textStyle}>Yes</Text>
                    </TouchableHighlight>
                    </View>
                </View>
                </View>
            </Modal>
        </View>
    )
}

export default Drawer;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10
    },
    headerIcon: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    userArea: {
        height: height * 0.15,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    drawerListSection: {
        flex: 1,
    },
    list:{
        width: width * 0.7 ,
        height: 50,
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 5
    },
    listText: {
        fontSize: 20,
        color: '#455a64'
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