import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TakePhoto from "../screens/TakePhoto";
import SelectPhoto from "../screens/SelectPhoto";
import { createStackNavigator } from "@react-navigation/stack";
import {Ionicons} from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


export default function UploadNav(){
    return (
        <Tab.Navigator 
            tabBarPosition="bottom" 
            screenOptions={{
                tabBarStyle:{backgroundColor:"black"}, 
                tabBarIndicatorStyle:{backgroundColor:"white", top:0},
                tabBarActiveTintColor:"white",
            }} 
        >
            <Tab.Screen name="TabSelect">
                {()=> (
                    <Stack.Navigator
                        screenOptions={{
                            headerTintColor:"white",
                            headerBackTitleVisible:false,
                            headerBackImage: ({ tintColor }) => (
                                <Ionicons color={tintColor} name="close" size={28} />
                            ),
                            headerStyle:{
                                backgroundColor:"black",
                                shadowOpacity:0.3,
                            }
                        }}
                    >
                        <Stack.Screen 
                            name="StackSelect"
                            options={{title:"Choose a photo"}}
                            component={SelectPhoto} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="Take" component={TakePhoto} />
        </Tab.Navigator>
    )
}