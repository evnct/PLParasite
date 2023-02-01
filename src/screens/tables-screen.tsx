import { Divider, View } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { ILeague } from '../models/League';
import Loader from '../components/loader';
import ListingTable from '../components/list-table';
import Podium from '../components/podium';

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
        <View _dark={{ bg: '#30355E' }} px={2} flex={1}>
            <Podium leagueData={leagueData} />
            <Divider borderWidth={0.5} borderColor={'white'} w={'full'} mb='5' />
            <ListingTable leagueData={leagueData} />
        </View>
    );
}