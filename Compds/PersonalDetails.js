import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalDetails = (props) => {
    const [nameUser, setnameUser] = useState('');
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('');
    const [pass2, setpass2] = useState('');
    const [user, setuser] = useState([]);
    const [isLoading, setisLoading] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const emailvali = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const updateUser = () => {
        if (nameUser === '') {
            Alert.alert('Không để trống tên');
            return;
        }
        if (!emailvali.test(email)) {
            Alert.alert('Định dạng email không đúng');
            return;
        }
        if (pass === '') {
            Alert.alert('Không để trống pass');
            return;
        }
        if (pass !== pass2) {
            Alert.alert('Mật khẩu không giống nhau');
            return;
        }
        let objSP = { name: nameUser, email: email, password: pass }
        let url = 'http://10.24.25.15:3000/users/' + user.id;
        fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objSP)
        })
            .then(async (res) => {
                if (res.status == 200)
                    Alert.alert("Sửa thành công")
                try {
                    await AsyncStorage.setItem('loginInfor', JSON.stringify(objU));
                    console.log('Dữ liệu đã được lưu thành công!');
                    navigation.navigate('StackHome')
                } catch (error) {
                    console.log(error);
                }
                props.navigation.navigate('StackHome')
            })
            .catch((ex) => {
                console.log(ex);
            });
    }
    // lấy thông tin đã lưu trong storgare
    const getId = async () => {
        try {
            // Lấy dữ liệu từ AsyncStorage
            const jsonString = await AsyncStorage.getItem('loginInfor');

            if (jsonString !== null) {
                // Giải mã JSON
                const data = JSON.parse(jsonString);

                // Truy cập thuộc tính cần thiết (ví dụ: 'propertyName')
                const id_user = data.id;

                // Trả về giá trị của thuộc tính cần thiết
                return id_user;
            }
        } catch (error) {
            console.log(error);
            // Xử lý lỗi nếu cần
        }
    }


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getId()
                .then(id => {
                    let url_api = 'http://10.24.25.15:3000/users/' + id;
                    fetch(url_api)
                        .then(rep => rep.json())
                        .then(data => {
                            setuser(data);
                            setisLoading(false);
                            console.log(data);
                        })
                        .catch(err => console.log(err));


                })
                .catch(error => {
                    console.log('Đã xảy ra lỗi:', error);
                });
           

        });
        setemail(user.email);
        setnameUser(user.name);
        console.log(user.name);
        return unsubscribe;
    }, [props.navigation]);



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Setting</Text>
            <TouchableOpacity style={styles.icon} onPress={() => { props.navigation.navigate('StackSetting') }} >
                <Ionicons
                    name={'arrow-back-outline'}
                    size={25}
                    color="#fff" />
            </TouchableOpacity>
            <Image style={styles.image} source={require('./../img/Intersect2.png')} />
            <View style={styles.from}>
                <TextInput style={styles.input} placeholder='Name' value={nameUser} onChangeText={txt => setnameUser(txt)} placeholderTextColor="gray" />
                <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={txt => setemail(txt)} placeholderTextColor="gray" keyboardType='email-address' />
                <View style={styles.input}>
                    <TextInput style={{ color: '#fff', flex: 1 }} secureTextEntry={!passwordVisible} placeholder='Password' onChangeText={txt => setpass(txt)} placeholderTextColor="gray" />
                    <TouchableOpacity style={styles.icon2} onPress={togglePasswordVisibility}>
                        <Ionicons
                            name={passwordVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.input}>
                    <TextInput style={{ color: '#fff', flex: 1 }} placeholder='Re-type password' onChangeText={txt => setpass2(txt)} placeholderTextColor="gray" secureTextEntry={!passwordVisible} />
                    <TouchableOpacity style={styles.icon2} onPress={togglePasswordVisibility}>
                        <Ionicons
                            name={passwordVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={updateUser} style={styles.btn}>
                <Text style={{ fontSize: 25, color: '#fff', margin: 10, fontWeight: 'bold' }}>SAVE</Text>

            </TouchableOpacity>
        </View>
    )
}

export default PersonalDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0C0F14',
        flex: 1,
        alignItems: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 25,
        marginTop: 20

    },
    icon: {
        position: 'absolute',
        top: 25,
        left: 25
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 30
    },
    from: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    input: {
        margin: 10,
        width: 350,
        height: 45,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        alignItems: 'center',
        color: '#fff',
        flexDirection: 'row'
    },
    icon2: {
        marginEnd: 10
    },
    btn: {
        backgroundColor: '#D17842',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
})