import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import { Ionicons } from "@expo/vector-icons";
import { tintColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const Stack = createStackNavigator();

export default function LoggedInNav(){
    return (
        <Stack.Navigator screenOptions={{presentation:"modal"}}>
            <Stack.Screen 
                options={{headerShown:false}} 
                name="Tabs" 
                component={TabsNav} /
            >
            <Stack.Screen 
                options={{headerShown:false}} 
                name="Upload" 
                component={UploadNav} /
            >
            <Stack.Screen 
                options={{
                    headerBackTitleVisible:false,
                    headerBackImage: ({tintColor}) => <Ionicons color={tintColor} name="close" size={28} />,
                    title:"Upload",
                    headerTintColor:"white",
                    headerStyle:{backgroundColor:"black"}
                }} 
                name="UploadForm" 
                component={UploadForm}
            />
        </Stack.Navigator>
    )  
}