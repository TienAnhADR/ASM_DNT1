import { StyleSheet, Text, View, Image, TextInput, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';



const Tab = createBottomTabNavigator();

const Home = (props) => {
    const {navigation} = props;
    const [isLoading, setisLoading] = useState(true);
    const [isLoading2, setisLoading2] = useState(true);
    const [listSP, setlistSP] = useState([]);
    const [listSP2, setlistSP2] = useState([]);
    // hàm load sản phẩm
    // const getListSp = async () => {
    let url_api = "http://10.24.25.15:3000/sanphams?loai=1"
    let url_api2 = "http://10.24.25.15:3000/sanphams?loai=2"
    useEffect(() => {
        fetch(url_api)
            .then(rep => rep.json())
            .then(data => {
                setlistSP(data);
                setisLoading(false);
            })
            .catch(err => console.log(err));
        fetch(url_api2)
            .then(rep => rep.json())
            .then(data => {
                setlistSP2(data);
                setisLoading2(false);
            })
            .catch(err => console.log(err));
    }, []);




    // React.useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', () => {
    //       // do something
    //       getListSp();
    //         console.log(isLoading);
    //     });

    //     return unsubscribe;
    //   }, [props.navigation]);

    const ItemFlastList = ({ item }) => {
        return (
            <TouchableOpacity  onPress={()=>{navigation.navigate('StackSpCT',{itemsp:item})}} style={{
                width: 150,
                height: 200,
            }}>
                <LinearGradient colors={['rgba(38, 43, 51, 1)', 'rgba(38, 43, 51, 0)']} style={{

                    flex:1,
                    marginEnd: 10,
                    borderRadius: 20,
                    padding: 10
                }}>
                    <View style={{
                        flex: 3,
                        width: '100%',

                    }} >
                        <Image style={{ flex: 1, borderRadius: 15, }} source={{ uri: item.hinhanh }} />
                        <View style={{
                            position: 'absolute',
                            top: 0, right: 0,
                            width: 40, height: 20,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            borderBottomLeftRadius: 15,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'row',
                            borderTopEndRadius: 15
                        }}>
                            <Ionicons
                                name={'star'}
                                size={10}
                                color="#D17842"
                            />
                            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#fff' }}>4.5</Text>
                        </View>
                    </View>

                    <View style={{
                        flex: 1,
                        marginTop: 10
                    }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>{item.tensanpham}</Text>
                        <Text style={{ color: '#fff', fontSize: 9 }}>{item.nguyenlieu}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#D17842', fontWeight: 'bold' }}>$ </Text>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.gia}</Text>
                        </View>

                        <TouchableOpacity style={{ width: 26, height: 26, borderRadius: 7, backgroundColor: '#D17842', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./../img/add.png')} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </TouchableOpacity>

        );
    }
    return (


        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>{navigation.navigate('StackSetting')}} style={styles.image}><Image source={require('./../img/icon1.png')} /></TouchableOpacity>
                <Text style={styles.text}>Home</Text>
                <Image source={require('./../img/Intersect.png')} />
            </View>

            <View style={styles.content_seach}>
                <Text style={{ fontSize: 28, color: '#fff', width: '50%', fontWeight: 'bold' }}>Find the best coffee for you</Text>
                <TextInput style={styles.input} placeholder='Find Your Coffee...' placeholderTextColor={'#fff'} />
            </View>
            <ScrollView style={styles.contents}>
                {
                    (isLoading) ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList horizontal data={listSP}
                            keyExtractor={(item_sp) => { return item_sp.id }}
                            renderItem={({ item }) => {
                                return <ItemFlastList item={item} />
                            }} />
                    )
                }
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Coffee beans</Text>
                {
                    (isLoading2) ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList horizontal data={listSP2}
                            keyExtractor={(item_sp) => { return item_sp.id }}
                            renderItem={({ item }) => {
                                return <ItemFlastList item={item} />
                            }} />
                    )
                }
            </ScrollView>



        </SafeAreaView>

    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C0F14',



    },
    header: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'gray'
    },
    content_seach: {
        width: '100%',
        padding: '5%'
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
    input: {
        width: '100%',
        backgroundColor: 'gray',
        borderRadius: 20,
        padding: 10,
        marginTop: 10
    },
    contents: {
        width: '100%',
        marginBottom: 5,
        marginStart: 15



    },


})