import { Text, View, Box, Center } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { IStanding, ITeam, IStats, IRank } from '../models/Standing';

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

    const rank: IRank = { value: tottenhamData.stats.filter(stat => stat.name === "rank")[0].value };

    const DisplayRank = () => {
        if (rank.value > 3) {
            return (
                <Text>{rank.value}th</Text>
            )
        } else if (rank.value === 1) {
            return (
                <Text>{rank.value}st</Text>
            )
        } else if (rank.value === 2) {
            return (
                <Text>{rank.value}nd</Text>
            )
        }
        else if (rank.value === 3) {
            return (
                <Text>{rank.value}rd</Text>
            )
        }
        else
            return <Text>Invalid rank</Text>
    }

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
                    <DisplayRank />
                </Text>
            </Box>
            <Text> Team Name: {tottenhamTeam.displayName}</Text>
        </View >
    );
}