import { Text, View, HStack } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { IStanding } from '../models/Standing';
import Rank from '../components/stats/rank';
import Overall from '../components/stats/overall';
import Points from '../components/stats/points';
import Options from '../components/options';

export default function MainScreen() {
    const [tottenhamData, setTottenhamData] = useState<IStanding | null>(null);

    useEffect(() => {
        async function fetchData() {
            const leagueData = await fetchLeagueData();
            if (leagueData) {
                const tottenhamData = leagueData.data.standings.filter(standing => standing.team.displayName === 'Tottenham Hotspur')[0];
                setTottenhamData(tottenhamData);
            }
        }
        fetchData();
    }, []);

    if (!tottenhamData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <HStack space={10} mx={4}>
                <Rank tottenhamData={tottenhamData} />
                <Options />
            </HStack>
            <Overall tottenhamData={tottenhamData} />
            <Points tottenhamData={tottenhamData} />
        </View >
    );
}