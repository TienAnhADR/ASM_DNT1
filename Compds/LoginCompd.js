import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Login = (props) => {
    const { navigation } = props;
    const [userName, setuserName] = useState('');
    const [passWord, setpassWord] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const doLogin = () => {
        if (userName == "") {
            alert("chưa nhập user name");
            return;
        }
        if (passWord == "") {
            alert("chưa nhập password");
            return;
        }
        let url_check = "http://10.24.25.15:3000/users?email=" + userName;
        fetch(url_check)
            .then((res) => {
                if(!res.ok){
                    throw new Error('Đăng nhập không thành công');
                }
                 return res.json(); })
            .then(async (res_login) => {
                if (res_login.lenght == 1) {
                    
                    alert("sai user name");
                    return;
                } else {
                    // số lượng lấy được 1 bản ghi  ===> kiểm tra password
                    let objU = res_login[0];

                    if (objU.password != passWord) {
                        alert("sai password"); return;
                    } else {
                        // đúng ==> lưu thông tin vào stogate
                        try {
                            await AsyncStorage.setItem('loginInfor', JSON.stringify(objU));
                            console.log('Dữ liệu đã được lưu thành công!');
                            navigation.navigate('StackHome')
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            })

        
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
        return (
            <View style={styles.container}>
                <View style={styles.box1}>
                    <Image source={require('./../img/welcome.png')}
                        style={{ width: 142, height: 142, }} />
                    <Text style={styles.text}>Welcome to Lungo!!</Text>
                    <Text style={{ fontSize: 12, color: '#828282', margin: 15 }}>Login to Continue</Text>
                </View>
                <View>
                    <View style={styles.from}>
                        <TextInput style={styles.input} placeholder='Email Address' placeholderTextColor="gray" onChangeText={(txt) => { setuserName(txt); }} />

                        <View style={styles.input}>
                            <TextInput style={{ flex: 1, color: '#fff', }} placeholder='Password' placeholderTextColor="gray" secureTextEntry={!passwordVisible} onChangeText={(txt) => { setpassWord(txt); }} />
                            <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
                                <Ionicons
                                    name={passwordVisible ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity style={styles.button} onPress={doLogin}>
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }} >Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button2}>
                            <Image source={require('./../img/gg.png')} />
                            <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }} >Sign in with Google</Text>
                            <Text>{ }</Text>
                        </TouchableOpacity>
                        <Text onPress={() => { navigation.navigate('StackDangKy') }} style={{ color: 'gray', margin: 20 }}>Don’t have account? Click <Text style={{ color: '#D17842' }}>Register</Text></Text>
                        <Text style={{ color: 'gray', margin: 20 }}>Forget Password? Click <Text style={{ color: '#D17842' }}>Reset </Text></Text>
                    </View>
                </View>
            </View>
        )
    }

    export default Login

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'black',
            alignItems: 'center'
        },
        box1: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            color: '#fff',
            fontSize: 26,
            fontWeight: 'bold'
        },

        input: {
            margin: 10,
            width: 350,
            height: 45,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center', 
            color: "#fff"
        },
        from: {
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center'
        },
        button: {
            height: 57,
            width: 350,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#D17842',
            borderRadius: 15,
            marginTop: 50,
            marginBottom: 10
        },
        button2: {
            flexDirection: 'row',
            backgroundColor: '#fff',
            height: 57,
            width: 350,
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: 15,
            margin: 10
        },
        icon: {
            marginEnd: 10
        }

    })