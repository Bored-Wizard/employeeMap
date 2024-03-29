import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, BackHandler, ImageBackground, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import Header from '../components/Header';
import {getCalories} from '../action/auth';
import { height, width } from '../assets/dimensions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import { AntDesign } from '@expo/vector-icons'

const Report = ({ navigation, getCalories }) => {
    const [cal, setCal] = useState(null)
    const [loading, isLoading] = useState(true);
    useEffect(()=>{
        fetchCalories()
    },[])

    const fetchCalories = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const response = await getCalories({customerid: user.customerid});
        if(response.success) {
            const calarious = response.menulist[0];
            const indexofdot = calarious.calories.indexOf('.');
            setCal(calarious)
        }
        isLoading(false);
    }
    return (
        <>
        {loading && <Loader />}
        {!loading && <ScrollView style={{
            flex: 1, backgroundColor: "#f0f0f0"
        }}>
            <Header image={true} navigation={navigation} />
            <View style={{justifyContent:'flex-start', alignContent:'flex-start', alignItems:'flex-start'}}>
                <Text style={{fontSize:24, fontWeight:'300', marginLeft:30, marginTop: 15}}>
                    Reporting
                </Text>
            </View>
            <View style={{height: 210, justifyContent: "center", alignItems: "center", marginTop: 15}}>
            <Image source={require('../assets/report.png')} style={{width: width*0.8}} resizeMode='contain' />
            </View>
            <View style={{justifyContent:'center', alignContent:'center',alignItems:'center'}}>
                <View>
                    <TouchableOpacity style={{...styles.card}}>
                        <View style={{flexDirection: "row", alignContent: "space-around", flex: 1, width: width * 0.8, justifyContent: "space-between"}}>
                            <View style={{flex: 1, alignItems: "flex-start", flexDirection: "row"}}>
                                <AntDesign name="calendar" size={38} color="#a40032" />
                                <View style={{flexDirection: "column", marginLeft: 10}}>
                                    <Text style={{color: 'black', fontSize:16, fontWeight: "bold"}}>
                                        Food Comsumption
                                    </Text>
                                    <Text style={{color: 'black', fontSize:16, fontWeight: "bold"}}>
                                        History
                                    </Text>
                                </View>
                            </View>
                            
                            <View style={{height: 20, width: 80, backgroundColor: "#a40032", borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{fontSize: 14, fontWeight: "bold", color: "white", textAlign: "center"}}>Download</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: "flex-start"}}>
                            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} color="#a40032" progress={cal ? parseInt(cal.calories)/2500 : 0} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{justifyContent:'center', alignContent:'center',alignItems:'center'}}>
            <View>
                    <TouchableOpacity style={{...styles.card}}>
                        <View style={{flexDirection: "row", alignContent: "space-between", flex: 1, width: width * 0.8, justifyContent: "space-between"}}>
                            <View style={{flex: 1, alignItems: "flex-start", flexDirection: "row"}}>
                                <AntDesign name="calendar" size={38} color="#a40032" />
                                <Text style={{color: 'black', fontSize:16, fontWeight: "bold", marginLeft: 10}}>
                                    Wallet History
                                </Text>
                            </View>
                            <View style={{height: 20, width: 80, backgroundColor: "#a40032", borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{fontSize: 14, fontWeight: "bold", color: "white", textAlign: "center"}}>Download</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: "flex-start"}}>
                            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} color="#a40032" progress={cal ? parseInt(cal.carbs)/2500 : 0} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{justifyContent:'center', alignContent:'center',alignItems:'center'}}>
            <View>
                    <TouchableOpacity style={{...styles.card}}>
                        <View style={{flexDirection: "row", alignContent: "space-around", flex: 1, width: width * 0.8, justifyContent: "space-between"}}>
                            <View style={{flex: 1, alignItems: "flex-start", flexDirection: "row"}}>
                                <AntDesign name="calendar" size={38} color="#a40032" />
                                <View style={{flexDirection: "column", marginLeft: 10}}>
                                    <Text style={{color: 'black', fontSize:16, fontWeight: "bold"}}>
                                        Nutrition Value
                                    </Text>
                                    <Text style={{color: 'black', fontSize:16, fontWeight: "bold"}}>
                                        History
                                    </Text>
                                </View>
                            </View>
                            <View style={{height: 20, width: 80, backgroundColor: "#a40032", borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{fontSize: 14, fontWeight: "bold", color: "white", textAlign: "center"}}>Download</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: "flex-start"}}>
                            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} color="#a40032" progress={cal ? parseInt(cal.fats)/2500 : 0} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>}
        </>
       
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height:height
    },
    logoContainer: {
        flex: 0.8,
        // height: height * 0.1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: height*0.2
    },
    formContainer: {
        flex: 1.4,
        paddingHorizontal: width * 0.07,
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 16,
        color: 'white',
        marginBottom: 8
    },
    card: {
        display:'flex', 
        flexDirection:'column',
        justifyContent: "center",
        height: 90, 
        width: width * 0.9, 
        marginVertical: 2.5,
        borderRadius: 10 ,
        padding: 10,
        backgroundColor: '#f0f0f0',
        elevation: 2,
        paddingHorizontal: 15
    },
})


const mapStateToProps = state => ({

})


export default connect(
    mapStateToProps, {
        getCalories
    }
) (Report)