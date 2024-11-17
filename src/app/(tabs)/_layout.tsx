import { Tabs } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function RootLayout() {
  return(
    <Tabs screenOptions={{headerShown:false}}>
      <Tabs.Screen name="index" options={{tabBarLabel:"Home",tabBarLabelStyle:{color:"#7cb9E8"},tabBarIcon:({focused})=>focused?(<FontAwesome5 name="tasks" size={24} color="#7cb9E8" />):(<FontAwesome5 name="tasks" size={24} color="black" />)}}/>
      <Tabs.Screen name="profile" options={{tabBarLabel:"Profile",tabBarLabelStyle:{color:"#7cb9E8"},tabBarIcon:({focused})=>focused?(<FontAwesome5 name="user-circle" size={24} color="#7CB9E8" />):(<FontAwesome5 name="user-circle" size={24} color="black" />)}}/>
    </Tabs>
  );
}