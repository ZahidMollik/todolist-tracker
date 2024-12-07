import { StyleSheet, Text, TextInput, View,Pressable,Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { router } from 'expo-router';
import {saveToken} from "./tokenStorage"
import apiClient from "../../api/apiClient";
import { AxiosError } from 'axios';

const Login:React.FC = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleLogin=async()=>{
    try {
      const response= await apiClient.post("/login",{email,password});
      Alert.alert(response.data.message);
      await saveToken(response.data.acesstoken);
      router.replace("/(tabs)");
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.log(error.response?.data.message);
        Alert.alert(error.response?.data.message)
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  }
  return (
    <SafeAreaView  style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{ marginTop: 150 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#6200EE" }}>TODO LIST TRACKER</Text>
      </View>
      <View>
        <Text style={{fontSize:18,fontWeight:"600",marginTop:20}}>Login to your account</Text>
      </View>
      <View>
        <View style={{
          flexDirection:"row",
          alignItems:"center",
          gap:4,
          backgroundColor: "#E0E0E0",
          paddingVertical: 5,
          borderRadius: 5,
          marginTop:30
        }}>
         <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
          <TextInput
           placeholder='enter your email'
           onChangeText={(text:string) => setEmail(text)} 
           style={{color:"gray",
            fontSize:17,
            marginVertical: 10,
            width: 300,
           }}
           
          />

        </View>
        <View style={{
          flexDirection:"row",
          alignItems:"center",
          gap:4,
          backgroundColor: "#E0E0E0",
          paddingVertical: 5,
          borderRadius: 5,
          marginTop:30
        }}>
         <AntDesign
              style={{ marginLeft: 8 }}
              name="lock1"
              size={24}
              color="gray"
            />
          <TextInput
          onChangeText={(text)=>setPassword(text)}
           placeholder='enter your password'
           style={{color:"gray",
            fontSize:17,
            marginVertical: 10,
            width: 300,
           }}
           
          />
        </View>
        <Pressable
          onPress={handleLogin}
         style={{
          marginTop:20,
          width:200,
          backgroundColor: "#6200EE",
          padding:15,
          borderRadius:5,
          marginHorizontal:'auto'
        }
        }>
          <Text style={{
            fontSize:16,
            fontWeight:600,
            textAlign:"center",
            color:"white"
          }}>Login</Text>
        </Pressable>
        <Pressable
            onPress={() => router.replace("/Register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
              Don't have an account? Sign up
            </Text>
          </Pressable>
      </View>  
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})