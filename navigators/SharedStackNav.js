import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import Profile from "../screens/Profile";
import Photo from "../screens/Photo";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";

const Stack = createStackNavigator();

export default function SharedStackNav({screenName}){
    return(
        <Stack.Navigator
            screenOptions={{
                headerMode: "screen",
                headerBackTitleVisible:false,
                headerTintColor:"white",
                headerStyle:{
                    shadowColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor:"black",
                }
            }}
        >
            {screenName === "Feed" ? (
                <Stack.Screen
                    name={"Feed"}
                    component={Feed}
                    options={{
                        headerTitle: () => (
                            <View style={{alignItems:'center', justifyContent:'center', maxHeight:40}}>
                                <Image
                                    style={{
                                        maxHeight: 40,
                                    }}
                                    resizeMode='contain'
                                    source={require("../assets/w_logo.png")}
                                />
                            </View>
                            
                        )
                    }}
                />
            ) : null}
            {screenName === "Search" ? (
                <Stack.Screen
                    name={"Search"}
                    component={Search} 
                />
            ) : null}
            {screenName === "Notifications" ? (
                <Stack.Screen
                    name={"Notifications"}
                    component={Notifications} 
                />
            ) : null}
            {screenName === "Me" ? (
                <Stack.Screen
                    name={"Me"}
                    component={Me} 
                />
            ) : null}
            <Stack.Screen
                name="Profile"
                component={Profile} 
            />
            <Stack.Screen
                name="Photo"
                component={Photo} 
            />
            <Stack.Screen
                name="Likes"
                component={Likes} 
            />
            <Stack.Screen
                name="Comments"
                component={Comments} 
            />
        </Stack.Navigator>
    );
}