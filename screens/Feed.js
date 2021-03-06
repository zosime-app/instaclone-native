import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {FlatList, Text, View} from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import {PHOTO_FRAGMENT, COMMENT_FRAGMENT} from "../fragments";

const FEED_QUERY = gql`
    query seeFeed($offset: Int!) {
        seeFeed(offset: $offset) {
            ...PhotoFragment
            user{
                id
                username
                avatar
            }
            caption
            comments{
                ...CommentFragment
            }
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

export default function Feed(){
    const {data, loading, refetch, fetchMore} = useQuery(FEED_QUERY, {
        variables:{
            offset : 0,
        }
    });
    const renderPhoto = ({item:photo}) => {
        return (
            <Photo {...photo} />
        );
    };
    const [refreshing, setRefreshing] = useState(false);
    const refresh = async() => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }
    return (
        <ScreenLayout loading={loading}>
            <FlatList
                onEndReachedThreshold={0.05}
                onEndReached={() => 
                    fetchMore({
                        variables: {
                            offset: data?.seeFeed?.length,
                        },
                    })
                }
                refreshing={refreshing}
                onRefresh={refresh}
                style={{width:"100%"}}
                showsVerticalScrollIndicator={false}
                data={data?.seeFeed}
                keyExtractor={(photo) => "" + photo.id}
                renderItem={renderPhoto}
            />
        </ScreenLayout>
    )
}

