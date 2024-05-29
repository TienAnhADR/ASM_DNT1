import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState} from 'react'
import LinearGradient from 'react-native-linear-gradient';

const GioHangCompd = (props) => {
    const {navigation} = props;
    const [tongTien, settongTien] = useState(0)
    const ItemFlastList = () => {
        return (


            <LinearGradient colors={['rgba(38, 43, 51, 1)', 'rgba(38, 43, 51, 0)']} style={{ padding: 10, flex: 1, margin: 10, borderRadius: 20 }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Image style={{ flex: 1, borderRadius: 10, width: 100, height: 100, marginEnd: 20 }} source={require('./../img/compuchino.png')} />
                    <View style={{ flex: 2 }}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>Camppuccino</Text>
                        <Text style={{ color: '#AEAEAE', fontSize: 15 }}>With Steamed Milk</Text>
                        <View style={{ backgroundColor: '#141921', width: "70%", height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 10 }}>
                            <Text style={{ color: '#AEAEAE', fontSize: 18 }}>Medium Roasted</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <ItemSizes />
                    <ItemSizes />
                    <ItemSizes />

                </View>
            </LinearGradient>
        )
    }
    const ItemSizes = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 5, flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ backgroundColor: '#0C0F14', width: "18%", height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Size</Text>
                </TouchableOpacity>
                <View style={{ width: "18%", height: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Text style={{ color: '#D17842', fontWeight: 'bold', textAlign: 'center' }}>$</Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}> 4.3</Text>

                </View>
                <TouchableOpacity style={{ width: "18%", height: 30, borderRadius: 10, backgroundColor: '#D17842', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20 }}>-</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#0C0F14', height: 30, width: "18%", borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#D17842', borderWidth: 1 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>1</Text>
                </View>
                <TouchableOpacity style={{ width: "18%", height: 30, borderRadius: 10, backgroundColor: '#D17842', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20 }}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const ItemFLSizes2 = () => {
        return (
            <LinearGradient colors={['rgba(38, 43, 51, 1)', 'rgba(38, 43, 51, 0)']} style={{ padding: 10, flex: 1, margin: 10, borderRadius: 20, flexDirection: 'row' }}>

                <Image style={{ flex: 2, borderRadius: 10, width: "100%", height: "100%", marginEnd: 20 }} source={require('./../img/compuchino.png')} />
                <View style={{ flex: 3 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>Camppuccino</Text>
                        <Text style={{ color: '#AEAEAE', fontSize: 15 }}>With Steamed Milk</Text>
                    </View>

                    <View style={{ backgroundColor: '#141921', flex: 1, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 10, marginTop: 10, flexDirection: 'row' }}>
                        <TouchableOpacity style={{ backgroundColor: '#0C0F14', width: "40%", height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Size</Text>
                        </TouchableOpacity>
                        <View style={{ width: "40%", height: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: '#D17842', fontWeight: 'bold', textAlign: 'center' }}>$</Text>
                            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}> 4.3</Text>

                        </View>
                    </View>
                    <View style={{ backgroundColor: '#141921', flex: 1, justifyContent: 'space-around', alignItems: 'center', borderRadius: 10, marginTop: 10, flexDirection: 'row' }}>
                        <TouchableOpacity style={{ width: "30%", height: 30, borderRadius: 10, backgroundColor: '#D17842', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20 }}>-</Text>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: '#0C0F14', height: 30, width: "30%", borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#D17842', borderWidth: 1 }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>1</Text>
                        </View>
                        <TouchableOpacity style={{ width: "30%", height: 30, borderRadius: 10, backgroundColor: '#D17842', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </LinearGradient>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.image}><Image source={require('./../img/icon1.png')} /></View>

                <Text style={styles.text}>Cart</Text>
                <Image source={require('./../img/Intersect.png')} />
            </View>

            <SafeAreaView style={styles.contents}>
                <ScrollView>
                    <ItemFlastList />
                    <ItemFlastList />
                    <ItemFLSizes2 />
                    <ItemFlastList />
                </ScrollView>


                {/* {
            (isLoading) ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={listSPY}
                    renderItem={({ item }) => <ItemFlastList item={item} />}
                    keyExtractor={item => item.id}
                />
            )
        } */}
            </SafeAreaView>
            <View style={styles.foodter}>
                <View style={{ width: "30%", alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#AEAEAE' }}>Total Pice</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#D17842', fontWeight: 'bold', fontSize: 20 }}>$</Text>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>{tongTien}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=> (navigation.navigate('StackPayment'))}
                style={{ width: "60%", backgroundColor: '#D17842', margin: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 20 }} >Pay</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default GioHangCompd

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C0F14',
        paddingBottom: 10

    },
    header: {
        flex: 0.5,
        marginEnd: 10,
        marginStart: 10,
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
        flex: 6,
        width: '100%',

    },
    foodter: {
        flex: 0.5,
        flexDirection: 'row'
    }
})