import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';


const DangKy = (props) => {
  const { navigation } = props;
  const [nameUser, setnameUser] = useState('');
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('');
  const [pass2, setpass2] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
//json-server --host 192.168.0.100 --watch data.json -p 90
  const dky = () => {
    // validate dữ liệu
    if (nameUser == '') {
      alert('không để trống user name');
      return;
    }
    const emailvali = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailvali.test(email)) {
      alert('email không đúng');
      return;
    }

    if (pass == '') {
      alert('không để trống pass');
      return;
    }
    if (pass != pass2) {
      alert('passwork không giống nhau');
      return;
    }
    // tạo đối tượng dữ liệu
    let objUser = { name: nameUser, password: pass, email: email };
    let url_api = 'http://10.24.25.15:3000/users';


    fetch(url_api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objUser)
    })
      .then((res) => {
        if (res.status == 201)
          alert("Đăng ký thành công")
        navigation.navigate('StackLogin')
      })
      .catch((ex) => {
        console.log(ex);
      });

  }
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Image source={require('./../img/welcome.png')}
          style={{ width: 142, height: 142 }} />
        <Text style={styles.text}>Welcome to Lungo!!</Text>
        <Text style={{ fontSize: 12, color: '#828282', margin: 15 }}>Register to Continue</Text>
      </View>
      <View style={styles.from}>
        <TextInput style={styles.input} placeholder='Name' onChangeText={txt => setnameUser(txt)} placeholderTextColor="gray" />
        <TextInput style={styles.input} placeholder='Email' onChangeText={txt => setemail(txt)} placeholderTextColor="gray" keyboardType='email-address' />
        <View style={styles.input}>
          <TextInput style={{ color: '#fff', flex: 1 }} secureTextEntry={!passwordVisible} placeholder='Password' onChangeText={txt => setpass(txt)} placeholderTextColor="gray" />
          <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
            <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
        <TextInput style={{ color: '#fff', flex: 1 }} placeholder='Re-type password' onChangeText={txt => setpass2(txt)} placeholderTextColor="gray" secureTextEntry={!passwordVisible} />
          <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
            <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

               <TouchableOpacity style={styles.button} onPress={dky}>
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }} >Register</Text>
        </TouchableOpacity>
        <Text onPress={() => { navigation.navigate('StackLogin') }} style={{ color: 'gray', margin: 20 }}>You have an account? Click <Text style={{ color: '#D17842' }}>Sign in</Text></Text>

      </View>
    </View>
  )
}

export default DangKy

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
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
    alignItems:'center',
    color: '#fff',
    flexDirection: 'row'
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
    marginTop: 20
  },
  button2: {
    backgroundColor: '#fff',
    height: 57,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    margin: 10
  },
  icon: {
    marginEnd: 10
}
})