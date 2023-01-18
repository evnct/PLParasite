import { Center, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { ILeague } from '../models/League';
import { SectionList } from 'react-native';

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
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <Center mt='12'>
                <SectionList
                    sections={[
                        {
                            data: leagueData.data.standings.map((standing, index) => {
                                return { key: index, value: `${index + 1}. ${standing.team.displayName} ` };
                            })
                        }
                    ]}
                    renderItem={({ item }) => <Text fontSize={20}>{item.value}</Text>}
                />
            </Center>
        </View>
    );
}