import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {View, Image}  from "react-native";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav(){
    const { data } = useMe();
    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarActiveTintColor:"white",
                headerShown:false,
                tabBarStyle:{
                    borderTopColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor:"black"
                }
            }}
        >
            <Tabs.Screen 
                name="FeedScreen"
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"home"} color={color} focused={focused} />
                    )
                }}
            >
                {()=> <SharedStackNav screenName="Feed" />}
            </Tabs.Screen>
            <Tabs.Screen 
                name="SearchScreen"
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"search"} color={color} focused={focused} />
                    )
                }} 
            >
                {()=> <SharedStackNav screenName="Search" />}
            </Tabs.Screen>
            <Tabs.Screen 
                name="CameraScreen" 
                component={View}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"camera"} color={color} focused={focused} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="NotificationsScreen" 
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <TabIcon iconName={"heart"} color={color} focused={focused} />
                    )
                }} 
            >
                {()=> <SharedStackNav screenName="Notifications" />}
            </Tabs.Screen>
            <Tabs.Screen 
                name="Me" 
                options={{
                    tabBarIcon: ({focused, color, size}) => 
                    data?.me?.avatar ? (
                        <Image 
                            source={{uri: data.me.avatar}}
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius:10,
                                ...(focused && {borderColor: "white", borderWidth:1 })
                            }}
                        />
                    ): (
                        <TabIcon iconName={"person"} color={color} focused={focused} />
                    ),
                }} 
            >
                {()=> <SharedStackNav screenName="Me" />}
            </Tabs.Screen>
        </Tabs.Navigator>
    )
}