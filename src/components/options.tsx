import { Box, Center, CheckIcon, Select, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { ILeague } from '../models/League';

export default function Options() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);
    const [team, setTeam] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await fetchLeagueData();
            setLeagueData(data);
        }
        fetchData();
    }, []);

    if (!leagueData) {
        return <Text>Loading...</Text>;
    }

    return (
        <Center>
            <Box maxW="300">
                <Select selectedValue={team} minWidth="200" accessibilityLabel="Choose Team" placeholder="Choose Team" _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setTeam(itemValue)}>
                    {leagueData.data.standings.map((standing, index) =>
                        <Select.Item key={index} label={standing.team.displayName} value={standing.team.displayName} />
                    )}
                </Select>
            </Box>
        </Center>
    );
}