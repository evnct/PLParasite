import { Text, View, VStack, Center, Box, SimpleGrid } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { IStanding, ITeam } from '../models/Standing';
import Rank from '../components/stats/rank';
import Overall from '../components/stats/overall';
import Points from '../components/stats/points';

export default function MainScreen() {
    const [tottenhamData, setTottenhamData] = useState<IStanding | null>(null);

    useEffect(() => {
        async function fetchData() {
            const leagueData = await fetchLeagueData();
            if (leagueData) {
                const tottenhamData = leagueData.data.standings.filter(standing => standing.team.id === '367')[0];
                setTottenhamData(tottenhamData);
            }
        }
        fetchData();
    }, []);

    if (!tottenhamData) {
        return <Text>Loading...</Text>;
    }

    const tottenhamTeam: ITeam = tottenhamData.team;

    return (
        <View>
            <Rank tottenhamData={tottenhamData} />
            <Overall tottenhamData={tottenhamData} />
            <Points tottenhamData={tottenhamData} />
        </View >
    );
}