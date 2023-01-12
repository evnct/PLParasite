import { Text, View } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { ITeam } from '../models/Standing';

export default function MainScreen() {
    const [tottenhamData, setTottenhamData] = useState<ITeam | null>(null);

    useEffect(() => {
        // Fetch the league data
        async function fetchData() {
            const leagueData = await fetchLeagueData();
            if (leagueData) {
                // Filter the data to only get Tottenham's data
                const tottenhamData = leagueData.data.standings.filter(standing => standing.team.id === '367')[0].team;
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
            <Text>Tottenham Data</Text>
            <Text>Team Name: {tottenhamData.displayName}</Text>
            <Text>Team Location: {tottenhamData.location}</Text>
        </View>
    );
}