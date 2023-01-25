import { Text, View, HStack, VStack, Center, Box, CheckIcon, Select, Spinner, useColorMode, Button } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { fetchLeagueData } from '../api';
import { IStanding } from '../models/Standing';
import Rank from '../components/stats/rank';
import Overall from '../components/stats/overall';
import Points from '../components/stats/points';
import { ILeague } from '../models/League';
import Loader from '../components/loader';
import { color } from 'native-base/lib/typescript/theme/styled-system';

export default function DataScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);
    const [selectedTeamData, setSelectedTeamData] = useState<IStanding | null>(null);
    const [seasons, setSeasons] = useState<string[]>([]);
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

    /// Fetching all the seasons in the standings list
    {/* ISSUED  */ }
    const allSeasons = () => {
        const currentYear = new Date().getFullYear();
        let seasonsList: string[] = [];
        for (let i = 2001; i <= currentYear - 1; i++) {
            seasonsList.push(`${i} - ${i + 1}`);
        }
        setSeasons(seasonsList);
    }

    useEffect(() => {
        allTeams()
        allSeasons()
    }, [team]);

    if (!selectedTeamData || !leagueData) { return <Loader />; }

    return (
        <View
            _dark={{ bg: '#21202E' }}
            _light={{ bg: '#FFFFFF' }}
            flex={1}>
            <VStack mt='32' mx='4'>
                <Center>
                    <HStack reversed space={10}>
                        <VStack space={1}>
                            <Text>Select Season</Text>
                            <Box maxWidth={200}>
                                <Select
                                    borderColor={'#fff'} borderWidth={2} borderRadius={'lg'}
                                    selectedValue={seasons[seasons.length - 1]} minWidth="200"
                                    accessibilityLabel="Choose Season" placeholder="Choose Season" _selectedItem={{
                                        bg: "#A065AB",
                                    }} onValueChange={itemValue => setTeam(itemValue)}>
                                    {/* Listing selectable seasons in reverse chronological order */}
                                    {seasons.map((season, index) =>
                                        <Select.Item collapsable background={'amber.200'} key={index} label={season} value={season} />
                                    )}
                                </Select>
                            </Box>
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