import { Image, StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'

const Wellcome = (props) => {
  const {navigation} = props;

  useEffect(() => {
    const timeout = setTimeout(() => {
    navigation.replace('StackLogin');
    }, 3000);
    return () => clearTimeout(timeout);
    }, []);
  return (
    <View style = {styles.container}>
      <Image source={require('./../img/welcome.png')}
      style={{width: 189 , height: 189 }} />
    </View>
  )
}

export default Wellcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
})