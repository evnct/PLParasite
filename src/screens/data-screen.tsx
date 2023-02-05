import { Text, View, VStack, Center, Box, Select } from 'native-base';
import { Image, ImageBackground } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { fetchLeagueData } from '../api';
import { IStanding } from '../models/Standing';
import { ILeague } from '../models/League';
import Loader from '../components/loader';
import Stats from '../components/stats';
import theme from '../theme';

export default function DataScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);
    const [selectedTeamData, setSelectedTeamData] = useState<IStanding | null>(null);
    const [team, setTeam] = useState('');

    const isFirstMount = useRef(true);

    const blur = require('../../assets/data-screen-icons/logoBlur.png');

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

    const teamLogo = () => (
        <Box alignItems={'center'} justifyContent={'center'}>
            <ImageBackground source={blur} style={{ width: 225, height: 225, position: 'absolute', zIndex: 0 }} />
            <Box width={100} height={100} borderWidth={4} borderRadius={'full'} bg={theme.colors.iconbg[400]} borderColor={'#5849FF'} alignItems={'center'} justifyContent={'center'} shadow='5'>
                <Image source={{
                    uri: selectedTeamData?.team.logos[0].href,
                    cache: 'force-cache',
                }} style={{
                    width: 80, height: 80,
                    resizeMode: 'contain',
                    zIndex: 1,
                }} />
            </Box>
        </Box>
    )

    return (
        <View _dark={{ bg: theme.colors.fullbg[400] }} flex={1} zIndex={1}>
            <VStack mt='20' mx='4'>
                <Center>
                    <VStack space={4} alignItems={'center'} justifyContent='center'>
                        {teamLogo()}
                        <Select
                            borderWidth={0}
                            shadow={'1'}
                            borderRadius={'lg'}
                            fontSize={'xl'}
                            dropdownIcon={
                                <Text fontSize={'xl'} px={'2'} color={'#A065AB'}>▼</Text>
                            }
                            selectedValue={team} minWidth="200" accessibilityLabel="Choose Team" placeholder="Choose Team" bg={'#383D71'} _selectedItem={{
                                bg: "#A065AB",
                                endIcon: <Text fontSize={'xl'} color={'#fff'}>▼</Text>,
                            }} onValueChange={itemValue => setTeam(itemValue)}>
                            {/* Listing selectable teams in alphabetical order */}
                            {leagueData.data.standings.sort((a, b) => a.team.shortDisplayName.localeCompare(b.team.displayName)).map((standing, index) =>
                                <Select.Item key={index} label={standing.team.shortDisplayName} value={standing.team.displayName} fontWeight={'black'} />
                            )}
                        </Select>
                        <Box borderRadius={20} h='auto' w='xs' p='4' bg={theme.colors.supportbg[400]} shadow={'2'}>
                            <Stats selectedTeamData={selectedTeamData} />
                        </Box>
                    </VStack>
                </Center>
            </VStack>
        </View >
    );
}