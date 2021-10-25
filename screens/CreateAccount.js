import React, { useEffect, useRef } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from '../components/auth/AuthShared';
import { useForm } from 'react-hook-form';
import {gql, useMutation} from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName:String!
        $lastName:String
        $username:String!
        $email:String!
        $password:String!
    ){
        createAccount(
            firstName:$firstName
            lastName:$lastName
            username:$username
            email:$email
            password:$password
        ){
            ok
            error
        }
    }
`;

export default function CreateAccount({navigation}){
    const {register, handleSubmit, setValue, getValues} = useForm();
    const onCompleted = (data) => {
        const {createAccount : {ok}} = data;
        const {username, password} = getValues();
        if(ok){
            navigation.navigate("LogIn", {
                username, 
                password,
            });
        }
    }
    const [createAccountMutation, {loading}] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    const lastNameRef = useRef(); 
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    }
    const onValid= (data) => {
        if(!loading){
            createAccountMutation({
                variables:{
                    ...data,
                }
            })
        }
    }
    useEffect(()=>{
        register("firstName", {
            required:true,
        });
        register("lastName", {
            required:true,
        });
        register("username", {
            required:true,
        });
        register("email", {
            required:true,
        });
        register("password", {
            required:true,
        });
    }, [register]);
    return(
        <AuthLayout>
            <TextInput
                autoFocus
                placeholder="First Name" 
                returnKeyType="next"
                onSubmitEditing={()=> onNext(lastNameRef)}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text)=>setValue("firstName", text)}
            />
            <TextInput
                ref={lastNameRef}
                placeholder="Last Name" 
                returnKeyType="next"
                onSubmitEditing={()=> onNext(usernameRef)}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text)=>setValue("lastName", text)}
            />
            <TextInput
                ref={usernameRef}
                placeholder="Username" 
                returnKeyType="next"
                autoCapitalize="none"
                onSubmitEditing={()=> onNext(emailRef)}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text)=>setValue("username", text)}
            />
            <TextInput
                ref={emailRef}
                placeholder="Email" 
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={()=> onNext(passwordRef)}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text)=>setValue("email", text)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="Password" 
                secureTextEntry
                returnKeyType="done"
                lastOne={true}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text)=>setValue("password", text)}
            />
            <AuthButton text="Create Accout" disabled={false} onPress={handleSubmit(onValid)}/>
        </AuthLayout>
    );
}