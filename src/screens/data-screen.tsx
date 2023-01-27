import { Text, View, HStack, VStack, Center, Box, Select } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { fetchLeagueData } from '../api';
import { IStanding } from '../models/Standing';
import Rank from '../components/stats/rank';
import Overall from '../components/stats/overall';
import Points from '../components/stats/points';
import { ILeague } from '../models/League';
import Loader from '../components/loader';

export default function DataScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);
    const [selectedTeamData, setSelectedTeamData] = useState<IStanding | null>(null);
    const [team, setTeam] = useState('');

    const isFirstMount = useRef(true);

    /// Fetching all the teams in the standings list
    const allTeams = async () => {
        try {
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
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allTeams()
    }, [team]);

    if (!selectedTeamData || !leagueData) { return <Loader />; }

    return (
        <View
            _dark={{ bg: '#21202E' }}
            _light={{ bg: '#FFFFFF' }}
            flex={1}>
            <VStack mt='20' mx='4'>
                <Center>
                    <HStack reversed space={10}>
                        <VStack space={1} mt='5'>
                            <Text>Select a Team</Text>
                            <Box maxWidth={200} >
                                <Select
                                    borderColor={'#fff'} borderWidth={2} borderRadius={'lg'}
                                    selectedValue={team} minWidth="200" accessibilityLabel="Choose Team" placeholder="Choose Team" _selectedItem={{
                                        bg: "#A065AB",
                                    }} onValueChange={itemValue => setTeam(itemValue)}>
                                    {/* Listing selectable teams in alphabetical order */}
                                    {leagueData.data.standings.sort((a, b) => a.team.shortDisplayName.localeCompare(b.team.displayName)).map((standing, index) =>
                                        <Select.Item key={index} label={standing.team.shortDisplayName} value={standing.team.displayName} />
                                    )}
                                </Select>
                            </Box>
                        </VStack>
                        <Rank selectedTeamData={selectedTeamData} />
                    </HStack>
                </Center>
                <Overall selectedTeamData={selectedTeamData} />
                <Points selectedTeamData={selectedTeamData} />
            </VStack>
        </View >
    );
}