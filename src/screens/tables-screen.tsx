import { View } from 'native-base'
import { RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { ILeague } from '../models/League';
import Loader from '../components/loader';
import ListingTable from '../components/list-table';
import theme from '../theme';

export default function TablesScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);

    async function fetchData() {
        try {
            const data = await fetchLeagueData();
            setLeagueData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchData() }, []);

    if (!leagueData) { return <Loader /> }

    return (
        <View _dark={{ bg: theme.colors.fullbg[400] }} flex={1} py='16' pb='0'>
            <ListingTable leagueData={leagueData} />
        </View>
    );
}