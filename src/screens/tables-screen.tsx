import { Center, HStack, Text, VStack, View, Divider, Box, Flex } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { ILeague } from '../models/League';
import { SectionList, Image } from 'react-native';
import Loader from '../components/loader';
import { Ionicons } from '@expo/vector-icons';

export default function TablesScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);

    // Fetch the league data
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

    const listingTable = () => (
        <SectionList scrollEnabled={true}
            sections={[
                {
                    data: leagueData.data.standings.map((standing, index) => {
                        let points = 0;

                        standing.stats.forEach((stat) => {
                            switch (stat.name) {
                                case "points":
                                    points = stat.value;
                                    break;
                                default:
                                    break;
                            }
                        });
                        return {
                            key: index, value: {
                                teamName: standing.team.shortDisplayName,
                                teamIcon: standing.team.logos[0].href,
                                points: points
                            }
                        };
                    })
                }
            ]}
            renderItem={({ item, index }) => (
                <VStack p='2'>
                    <Box bg={'30355E'} borderWidth={2} borderRadius={15} borderColor='white' p='1'>
                        <HStack space={2} alignItems={'center'} justifyItems={'center'}>
                            <Box bg='white' borderRadius={'full'} p='1'>
                                <Image source={{
                                    uri: item.value.teamIcon,
                                    cache: 'force-cache',
                                }} style={{ width: 50, height: 50 }} />
                            </Box>
                            <Text fontSize={28}>{`${index + 1} ${item.value.teamName}`}</Text>
                            <Text fontSize={24}> {item.value.points} pts </Text>
                        </HStack>
                    </Box>
                </VStack>
            )}
        />
    )

    return (
        <View _dark={{ bg: '#30355E' }} px={2} flex={1}>
            <Flex mt='10' mb='2' mx='1'>
                {listingTable()}
            </Flex>
        </View>
    );
}