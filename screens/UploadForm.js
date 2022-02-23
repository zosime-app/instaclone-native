import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { colors } from "../colors";
import { FEED_PHOTO } from "../fragments";
import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";

const UPLOAD_PHOTO_MUTATION = gql`
    mutation uploadPhoto($file: Upload!, $caption: String){
        uploadPhoto(
            file:$file
            caption:$caption
        ){
            ...FeedPhoto
        }
    }
    ${FEED_PHOTO}
`;

const Container = styled.View`
    flex:1;
    background-color: black;
    padding: 0px 50px;
`;

const Photo = styled.Image`
    height: 380px;
`;

const CaptionContainer = styled.View`
    margin-top: 30px;
`;

const Caption = styled.TextInput`
    background-color: white;
    color:black;
    padding: 10px 20px;
    border-radius: 100px;
`;

const HeaderRightText = styled.Text`
    color: ${colors.blue};
    font-size: 16px;
    font-weight: 600;
    margin-right: 7px;
`;

export default function UploadForm({route, navigation}){
    const updateUploadPhoto = (cache, result) => {
        const {data:{uploadPhoto}} = result;
        if(uploadPhoto.id){
            cache.modify({
                id:"ROOT_QUERY",
                fields:{
                    seeFeed(prev){
                        return [uploadPhoto, ...prev]
                    }
                }
            });
            navigation.navigate("Tabs");
        }
    };

    const [uploadPhotoMutation, {loading}] = useMutation(UPLOAD_PHOTO_MUTATION, {
        update:updateUploadPhoto
    })
    const HeaderRight = () => (
        <TouchableOpacity onPress={handleSubmit(onVaild)}>
            <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
    );
    const HeaderRightLoading = () => (
      <ActivityIndicator size="small" color="white" style={{marginRight: 10}} />
    );

    const {register, handleSubmit, setValue} = useForm();
    
    useEffect(()=>{
        register("caption")
    }, [register]);

    useEffect(()=>{
        navigation.setOptions({
            headerRight: loading ? HeaderRightLoading : HeaderRight,
            ...(loading && {headerLeft : () => null}),
        })
    },[loading]);

    const onVaild = ({caption}) => {
        const file = new ReactNativeFile({
            uri:route.params.file,
            name:`1.jpg`,
            type: "image/jpeg",
        })
        uploadPhotoMutation({
            variables:{
                caption,
                file,
            }
        })
    }
    return (
        <DismissKeyboard>
            <Container>
                <Photo
                    resizeMode="contain"
                    source={{uri:route.params.file?route.params.file : null}}
                />
                <CaptionContainer>
                    <Caption 
                        placeholder="Write a caption..." 
                        placeholderTextColor="rgba(0,0,0,0.5)"
                        onChangeText={(text)=> setValue("caption", text)}
                        onSubmitEditing={handleSubmit(onVaild)}
                        returnKeyType="done"
                    />
                </CaptionContainer>
            </Container>
        </DismissKeyboard>
    )
}