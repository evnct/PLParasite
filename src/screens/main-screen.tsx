import { Text, View } from 'native-base'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ILeague } from '../models/League';
import { IStanding } from '../models/Standing';

export default function MainScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);
    const [standingsData, setStandingsData] = useState<IStanding[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get<ILeague>('https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=2022&sort=asc');
                setLeagueData(response.data);
                setStandingsData(response.data.data.standings);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    if (!leagueData) {
        return <Text>Loading...</Text>;
    }


    return (
        <View>
            <Text>{leagueData.data.name}</Text>
            <Text>Number of teams in league: {standingsData?.length || "Loading..."}</Text>
            {standingsData ?
                standingsData.map((standing, index) => {
                    // Using index + 1 due to api having issue with note.rank
                    // Im improvising :)
                    return <Text key={index}>{index + 1}. {standing.team.displayName}</Text>
                })
                : <Text>Loading...</Text>
            }
        </View>
    );
};