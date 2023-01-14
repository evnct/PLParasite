import { Text, View } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { IStanding, ITeam, Stats } from '../models/Standing';

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
    const tottenhamStats: Stats[] = tottenhamData.stats;

    return (
        <View>
            <Text>Tottenham Data</Text>
            <Text>Team Name: {tottenhamTeam.displayName}</Text>
            <Text>Team Location: {tottenhamTeam.location}</Text>
            {tottenhamStats.map(stat => (
                <Text key={stat.name}>{stat.displayName}: {stat.displayValue}</Text>
            ))}
        </View>
    );
}