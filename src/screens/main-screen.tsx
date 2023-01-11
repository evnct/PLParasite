import { Text, View } from 'react-native'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface ILeague {
    status: boolean;
    data: {
        name: string;
        abbreviation: string;
        seasonDisplay: string;
        season: number;
        standings: IStanding[];
    };
}

interface IStanding {
    team: {
        id: string;
        uid: string;
        location: string;
        name: string;
        abbreviation: string;
        displayName: string;
        shortDisplayName: string;
        isActive: boolean;
        logos: {
            href: string;
            width: number;
            height: number;
            alt: string;
            rel: string[];
            lastUpdated: string;
        }[];
        isNational: boolean;
    }[];
}


export default function MainScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);
    const [standingsData, setStandingsData] = useState<IStanding[] | undefined>();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get<ILeague>('https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=2022&sort=asc');
                setLeagueData(response.data);
                setStandingsData(leagueData?.data.standings);
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
            <Text>How many Teams this league has: {standingsData?.length}</Text>
        </View>
    );
};