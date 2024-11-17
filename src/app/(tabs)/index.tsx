import { View, Text,Pressable,StyleSheet,SafeAreaView} from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';

const index = () => {
  const categories:String[]=["All","Important"]
  return (
    <>
    <SafeAreaView>
        <View style={styles.category}>
            {categories.map((cat,i)=>(
              <Pressable style={styles.categoryButton} key={i}>
                <Text>
                  {cat}
                </Text>
              </Pressable>
            ))}
            <Pressable style={{marginLeft:'auto'}}>
              <Feather name="plus-circle" size={24} color="black" />
            </Pressable>
        </View>
    </SafeAreaView>
    </>
  )
}

const styles=StyleSheet.create({
  category:{
    marginHorizontal:10,
    marginVertical:10,
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },
  categoryButton:{
    padding:10,
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    marginBottom: 5,

  }
})

export default index