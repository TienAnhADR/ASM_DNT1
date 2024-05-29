import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = (props) => {
    const [listSPY, setlistSPY] = useState([]);
    const [id, setid] = useState('');
    const [isLoading, setisLoading] = useState(true);
    const ItemFlastList = ({ item }) => {
        const xoaSP = () => {
            // link xóa
            console.log(item);
            let url_api_del = 'http://10.24.25.15:3000/yeuthichs?userId=' + id + '&sanphamId=' + item.id;
            fetch(url_api_del, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {

                        alert("Đã xóa");
                        getItems(id);
                    }

                })
                .catch((ex) => {
                    console.log(ex);
                });

        }
        return (
            <View style={{
                width: '100%',

                height: 500,
                borderRadius: 20,
                backgroundColor: 'gray',
                marginBottom: 10,
                justifyContent: 'flex-end',

            }}>
                <Image source={{ uri: item.hinhanh }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                <TouchableOpacity style={styles.icon} onPress={xoaSP}>
                    <Ionicons
                        name={'heart-dislike'}
                        size={25}
                        color="red"
                    />
                </TouchableOpacity>
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '60%',
                }}>
                    <View style={{
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        flex: 1,
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
                        flex: 1,
                        backgroundColor: '#21262E',
                        padding: 10,
                        borderBottomEndRadius: 15,
                        borderBottomStartRadius: 15
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
                </View>
            </View>
        )
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

    // Sử dụng hàm getSpecificProperty để lấy thuộc tính cần thiết từ dữ liệu trong AsyncStorage
    getId()
        .then(id => {
            setid(id)

        })
        .catch(error => {
            console.log('Đã xảy ra lỗi:', error);
        });


    const getItems = async (userId) => {
        try {
            // Lấy thông tin yêu thích của người dùng từ JSON Server
            const response = await fetch(`http://10.24.25.15:3000/yeuthichs?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Không thể lấy thông tin yêu thích');
            }
            const cartItems = await response.json();
            // Lặp qua các sản phẩm trong yêu thích và lấy thông tin chi tiết của từng sản phẩm
            const products = await Promise.all(
                cartItems.map(async (item) => {
                    const productId = item.sanphamId;
                    const productResponse = await fetch(`http://10.24.25.15:3000/sanphams/${productId}`);
                    if (!productResponse.ok) {
                        throw new Error(`Không thể lấy thông tin sản phẩm với ID ${productId}`);
                    }
                    const productData = await productResponse.json();
                    return productData;
                })
            );

            setlistSPY(products)
            return products;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin yêu thích:', error.message);
        }
    };


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // cập nhật giao diện ở đây
            getItems(id);
            setisLoading(false);

        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.image}><Image source={require('./../img/icon1.png')} /></View>

                <Text style={styles.text}>Favorites</Text>
                <Image source={require('./../img/Intersect.png')} />
            </View>

            <SafeAreaView style={styles.contents}>

                {
                    (isLoading) ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList

                            data={listSPY}
                            renderItem={({ item }) => <ItemFlastList item={item} />}
                            keyExtractor={item => item.id}
                        />
                    )
                }
            </SafeAreaView>

        </SafeAreaView>
    )
}

export default Favorites

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10

    },
    header: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'gray'
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        width: 30,
        height: 30,
        backgroundColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8
    },
    contents: {
        width: '100%',
        marginBottom: 60

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
    }


})