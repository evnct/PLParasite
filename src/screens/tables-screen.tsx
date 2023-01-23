import { Center, HStack, Text, VStack, View, Divider } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { ILeague } from '../models/League';
import { SectionList } from 'react-native';
import Loader from '../components/loader';
import { Ionicons } from '@expo/vector-icons';

export default function TablesScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);

    // Fetch the league data
    async function fetchData() {
        try {
            const data = await fetchLeagueData();
            setLeagueData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchData() }, []);

    if (!leagueData) { return <Loader /> }

    const listingTable = () => (
        <SectionList scrollEnabled={true}
            sections={[
                {
                    data: leagueData.data.standings.map((standing, index) => {
                        let gamesPlayed = 0;
                        let points = 0;

                        standing.stats.forEach((stat) => {
                            switch (stat.name) {
                                case "gamesPlayed":
                                    gamesPlayed = stat.value;
                                    break;
                                case "points":
                                    points = stat.value;
                                    break;
                                default:
                                    break;
                            }
                        });
                        return {
                            key: index, value: {
                                teamName: standing.team.displayName,
                                gamesPlayed: gamesPlayed,
                                points: points
                            }
                        };
                    })
                }
            ]}
            renderItem={({ item, index }) => (
                <VStack p='2'>
                    <Text fontSize={32}>{`${index + 1} ${item.value.teamName}`}</Text>
                    <HStack p='2'>
                        <Text fontSize={24}>Matches: {item.value.gamesPlayed} </Text>
                        <Ionicons name="checkmark-done" size={24} color="pink" />
                        <Text fontSize={24}> {item.value.points} Points </Text>
                        <Ionicons name="star" size={24} color="yellow" />
                    </HStack>
                    <Divider />
                </VStack>
            )}
        />
    )

    return (
        <View
            _dark={{ bg: '#21202E' }}
            _light={{ bg: '#FFFFFF' }}
            px={4}
            flex={1}>
            <Center mt='20' mb='2'>
                {listingTable()}
            </Center>
        </View>
    );
}