import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SanPhamCTCompd = (props) => {
    const { navigation } = props;
    const item = props.route.params.itemsp
    const [id, setid] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);
    const itemID = item.id;
    const [checkSP, setcheckSP] = useState(true)
    const handlePress = (buttonName) => {
        setSelectedButton(buttonName);
    };
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

    // Sử dụng hàm getSpecificProperty để lấy thuộc tính cần thiết từ dữ liệu trong AsyncStorage
    getId().then(id => {
        setid(id)

    })
        .catch(error => {
            console.log('Đã xảy ra lỗi:', error);
        });

    const addSPHeart = () => {
        fetch(`http://10.24.25.15:3000/yeuthichs?userId=${id}&sanphamId=${itemID}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('lấy thông tin yêu thích không thành  công');
                }
                return res.json();
            })
            .then(async (res_login) => {
                if (res_login[0] != null) {
                    alert("Sản phẩm này bạn đã yêu thích từ trước");
                    return;
                } else {
                    // số lượng lấy được 0 bản ghi  ===> kiểm tra password
                    let objSP = { userId: id, sanphamId: itemID };
                    let url_api = 'http://10.24.25.15:3000/yeuthichs';
                    fetch(url_api, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(objSP)
                    })
                        .then((res) => {
                            if (res.status == 201)
                                alert("Thêm sản phẩm vào yêu thích thành công")
                        })
                        .catch((ex) => {
                            console.log(ex);
                        });

                }
            })
    }
    return (
        <View style={{
            flex: 1,

            justifyContent: 'flex-end',
        }}>

            <Image source={{ uri: item.hinhanh }} style={{ width: '100%', height: '100%' }} />
            <TouchableOpacity style={styles.icon} onPress={addSPHeart}>
                <Ionicons
                    name={'heart'}
                    size={25}
                    color="red"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('StackHome') }} style={styles.icon2} >
                <Ionicons
                    name={'arrow-back-outline'}
                    size={25}
                    color="#fff"
                />
            </TouchableOpacity>
            <View style={{
                position: 'absolute',
                width: '100%',
                height: '70%',
            }}>
                <View style={{
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    flex: 1.5,
                    backgroundColor: 'rgba(20, 25, 33, 0.5)',
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{item.tensanpham}</Text>
                        <Text style={{ color: 'rgba(174, 174, 174, 1)', fontSize: 12 }} >{item.nguyenlieu}</Text>
                        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                            <Image source={require('./../img/Group.png')} />
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>4.5</Text>
                            <Text style={{ color: 'rgba(174, 174, 174, 1)', fontSize: 12 }}>(6,879)</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'baseline' }}>
                            <View style={{
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                                backgroundColor: '#141921',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 10
                            }}>
                                <Image source={require('./../img/iconCoffee.png')} />
                                <Text style={{ color: 'rgba(174, 174, 174, 1)', fontSize: 10 }}>Coffee</Text>
                            </View>
                            <View style={{
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                                backgroundColor: '#141921',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 10
                            }}>
                                <Image source={require('./../img/drop.png')} />
                                <Text style={{ color: 'rgba(174, 174, 174, 1)', fontSize: 10 }}>Milk</Text>
                            </View>
                        </View>
                        <View style={{ width: 118, height: 40, borderRadius: 10, backgroundColor: '#141921', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                            <Text style={{ color: 'rgba(174, 174, 174, 1)', fontSize: 10, }}>Medium Roasted</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 1.5,
                    backgroundColor: '#21262E',
                    padding: 10,
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: '#AEAEAE',
                        fontSize: 20
                    }}>Description</Text>
                    <Text style={{
                        fontSize: 16,
                        color: '#fff'
                    }}>{item.noidung}</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
                    <Text style={{ color: '#fff' }}>Size</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.button, selectedButton === 'button1' && styles.selectedButton]} onPress={() => handlePress('button1')}>
                            <Text style={[styles.buttonText, selectedButton === 'button1' && styles.selectedButtonText]}>L</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, selectedButton === 'button2' && styles.selectedButton]} onPress={() => handlePress('button2')}>
                            <Text style={[styles.buttonText, selectedButton === 'button2' && styles.selectedButtonText]}>M</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, selectedButton === 'button3' && styles.selectedButton]} onPress={() => handlePress('button3')}>
                            <Text style={[styles.buttonText, selectedButton === 'button3' && styles.selectedButtonText]}>S</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.5, backgroundColor: 'black', padding: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#fff' }}>Price</Text>
                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>{item.gia}</Text>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: '#e28743', flex: 3, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                        <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold' }}>Add to Cart</Text>
                    </TouchableOpacity>


                </View>

            </View>
        </View>
    )
}

export default SanPhamCTCompd;
const styles = StyleSheet.create({
    button: {
        width: "30%",
        backgroundColor: '#21262E',
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,
        height: 30,

    },

    selectedButton: {
        borderBlockColor: '#e28743',
        borderWidth: 1,
        borderRightWidth: 1
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    selectedButtonText: {
        color: '#e28743',
    },
    icon: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 40,
        height: 40,
        backgroundColor: '#21262E',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    icon2: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 40,
        height: 40,
        backgroundColor: '#21262E',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }

})

