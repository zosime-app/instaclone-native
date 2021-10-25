import React, { useEffect } from "react";
import {View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, useWindowDimensions, FlatList} from "react-native";
import styled from "styled-components/native";
import { useForm, useWatch } from "react-hook-form";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql, useLazyQuery } from "@apollo/client";


const SEARCH_PHOTOS = gql`
    query searchPhotos($keyword:String!){
        searchPhotos(keyword:$keyword){
            id
            file
        }
    }
`;

const SearchingContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex:1;
`;
const SearchingText = styled.Text`
    margin-top: 15px;
    color: white;
    font-weight: 600;
`;

const Input = styled.TextInput`
    background-color: rgba(255, 255, 255, 0.7);
    color:black;
    width: ${(props) => props.width / 1.5}px;
    padding: 5px 10px;
    border-radius: 7px;
`;

export default function Search({navigation}){
    const numColumns = 4;
    const {width} = useWindowDimensions();
    const {setValue, register, watch, handleSubmit} = useForm();
    const [startQueryFn, {loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);
    const onValid = ({ keyword }) => {
        startQueryFn({
            variables: {
              keyword,
            },
        });
    };
    
    const SearchBox = () => (
        <Input 
            width={width}
            placeholderTextColor="rgba(0, 0, 0, 0.8)"
            placeholder="Search photos"
            autoCapitalize="none"
            returnKeyLabel="Search"
            returnKeyType="search"
            autoCorrect={false}
            onChangeText={(text) => setValue("keyword", text)}
            onSubmitEditing={handleSubmit(onValid)}
        />
    );

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: SearchBox,
        });
        register("keyword", {
            required: true,
            minLength: 3,
        });
    }, []);
    const renderItem = ({item:photo}) => (
        <TouchableOpacity
            onPress={()=>
                navigation.navigate("Photo", {
                    photoId:photo.id
                })
            }
        >
            <Image source={{uri: photo.file}} style={{width:width/numColumns, height:100}} />
        </TouchableOpacity>
    );
    return (
        <DismissKeyboard>
            <View style={{flex:1, backgroundColor:"black"}}>
                {loading ? (
                    <SearchingContainer>
                        <ActivityIndicator size="large" />
                        <SearchingText>Searching...</SearchingText>
                    </SearchingContainer>
                ):null}
                {!called ? (
                    <SearchingContainer>
                        <SearchingText>Search by keyword</SearchingText>
                    </SearchingContainer>
                ):null}
                {data?.searchPhotos !== undefined ? (
                    data?.searchPhotos?.length === 0 ? (
                        <SearchingContainer>
                            <SearchingText>Could not find anything</SearchingText>
                        </SearchingContainer>
                    ):(
                        <FlatList
                            numColumns={numColumns}
                            data={data?.searchPhotos}
                            keyExtractor={(photo) => "" + photo.id}
                            renderItem={renderItem}
                        />
                    )
                ) : null }
            </View>
        </DismissKeyboard>
    )
}

