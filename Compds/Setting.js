import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
const Setting = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate('StackHome') }} style={styles.icon}>
                <Ionicons
                    name={'arrow-back-outline'}
                    size={25}
                    color="#fff"
                />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.text}>Setting</Text>
            </View>
            <SafeAreaView style={styles.contents}>
                <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('StackPersonalDetails')}} >
                    <View style={{width:40,height:40,backgroundColor:'rgba(209, 120, 66, 0.2)', justifyContent:'center',alignItems:'center',borderRadius:20}}>
                        <Ionicons name={'person'}
                            size={25}
                            color="#D17842" />
                    </View>
                    <Text style={styles.text2}>Personal Details</Text>
                    <Ionicons name={'chevron-forward-outline'}
                        size={25}
                        color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('StackLogin')}} >
                    <View style={{width:40,height:40,backgroundColor:'rgba(209, 120, 66, 0.2)', justifyContent:'center',alignItems:'center',borderRadius:20}}>
                        <Ionicons name={'log-out-outline'}
                            size={25}
                            color="#D17842" />
                    </View>
                    <Text style={styles.text2}>Log out</Text>
                    <Ionicons name={'chevron-forward-outline'}
                        size={25}
                        color="#fff" />
                </TouchableOpacity>

            </SafeAreaView>

        </SafeAreaView>
    )
}
//enter-outline == logout log-out-outline //person
export default Setting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingBottom: 10,

        alignItems: 'center'

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
        width: '90%',
        marginBottom: 60,
        padding: 20,
        margin: 10,

    },
    icon: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 40,
        height: 40,
        backgroundColor: '#21262E',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    btn:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom:10
    },
    text2:{
        color:'#fff',
        fontSize:16
    }

})