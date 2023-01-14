import { Text, View, Box, Center } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { IStanding, ITeam } from '../models/Standing';
import Rank from '../components/stats/rank';

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
            <Box borderRadius={'full'}
                borderColor={'#488CCA'}
                borderWidth={4}
                width={20}
                height={20}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text fontSize={32} fontWeight={900}>
                    <Rank tottenhamData={tottenhamData} />
                </Text>
            </Box>
            <Text> Team Name: {tottenhamTeam.displayName}</Text>
        </View >
    );
}