import { Text, View, HStack, VStack, Center, Box, CheckIcon, Select, Spinner, useColorMode } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { fetchLeagueData } from '../api';
import { IStanding } from '../models/Standing';
import Rank from '../components/stats/rank';
import Overall from '../components/stats/overall';
import Points from '../components/stats/points';
import { ILeague } from '../models/League';

export default function DataScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);
    const [selectedTeamData, setSelectedTeamData] = useState<IStanding | null>(null);
    const [team, setTeam] = useState('');
    const isFirstMount = useRef(true);

    const allTeams = async () => {
        const data = await fetchLeagueData();
        setLeagueData(data);
        // Default team for Select component
        if (data) {
            const selectedTeamData = data.data.standings.filter(standing => standing.team.displayName === team)[0];
            setSelectedTeamData(selectedTeamData);
            // set the team state on the first mount of the component and not on the subsequent renders.
            if (isFirstMount.current) {
                setTeam(data.data.standings[0].team.displayName);
                isFirstMount.current = false;
            }
        }
    }

    useEffect(() => {
        allTeams();
    }, [team]);

    if (!selectedTeamData || !leagueData) {
        return <Center flex={1}>
            <Spinner size="lg" color="#A065AB" />
        </Center>;
    }

    return (
        <View>
            <VStack>
                <Center>
                    <HStack reversed space={10}>
                        <Center>
                            <Text>Select Team</Text>
                            <Box maxWidth={200} >
                                <Select selectedValue={team} minWidth="200" accessibilityLabel="Choose Team" placeholder="Choose Team" _selectedItem={{
                                    bg: "#A065AB",
                                }} mt={1} onValueChange={itemValue => setTeam(itemValue)}>
                                    {/* Listing selectable teams in alphabetical order */}
                                    {leagueData.data.standings.sort((a, b) => a.team.shortDisplayName.localeCompare(b.team.displayName)).map((standing, index) =>
                                        <Select.Item key={index} label={standing.team.shortDisplayName} value={standing.team.displayName} />
                                    )}
                                </Select>
                            </Box>
                        </Center>
                        <Rank selectedTeamData={selectedTeamData} />
                    </HStack>
                </Center>
                <Overall selectedTeamData={selectedTeamData} />
                <Points selectedTeamData={selectedTeamData} />
            </VStack>
        </View >
    );
}