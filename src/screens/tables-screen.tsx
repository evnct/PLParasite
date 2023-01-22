import { Center, Spinner, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { ILeague } from '../models/League';
import { SectionList, Platform } from 'react-native';

export default function TablesScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);

    useEffect(() => {
        // Fetch the league data
        async function fetchData() {
            const data = await fetchLeagueData();
            setLeagueData(data);
        }
        fetchData();
    }, []);

    if (!leagueData) {
        return <Center flex={1}>
            <Spinner size="lg" color="#A065AB" />
        </Center>
    }

    const scrollBasedOnPlatform = () => {
        switch (Platform.OS) {
            case 'ios':
                return false;
            case 'android':
                return true;
            default:
                return true;
        }
    }

    const listingTable = () => (
        <SectionList scrollEnabled={scrollBasedOnPlatform()}
            sections={[
                {
                    data: leagueData.data.standings.map((standing, index) => {
                        return { key: index, value: `${index + 1}. ${standing.team.displayName} ` };
                    })
                }
            ]}
            renderItem={({ item }) => <Text fontSize={24}>{item.value}</Text>}
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