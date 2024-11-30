import { StyleSheet, Text, TextInput, View,Pressable,Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { router } from 'expo-router';
import apiClient from "../../api/apiClient";
import axios, { AxiosError } from 'axios';

const Register = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleRegister=async()=>{
    try { 
      const response= await apiClient.post("/register",{email,password});
      Alert.alert(response.data.message);
      router.replace("/(authenticate)/Login");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
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
        <Text style={{fontSize:18,fontWeight:"600",marginTop:20}}>Register your account</Text>
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
          onChangeText={text=>setEmail(text)}
           placeholder='enter your email'
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
          onChangeText={text=>setPassword(text)}
           placeholder='enter your password'
           style={{color:"gray",
            fontSize:17,
            marginVertical: 10,
            width: 300,
           }}
           
          />
        </View>
        <Pressable
         onPress={handleRegister}
         style={{
          marginTop:20,
          width:200,
          backgroundColor: "#6200EE",
          padding:15,
          borderRadius:5,
          marginHorizontal:'auto'
        }}>
          <Text style={{
            fontSize:16,
            fontWeight:600,
            textAlign:"center",
            color:"white"
          }}>Register</Text>
        </Pressable>
        <Pressable
            onPress={() => router.replace("/Login")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
              Already have an account? Sign In
            </Text>
          </Pressable>
      </View>  
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({})