import { Center, HStack, Text, VStack, View, Box, Flex, Icon, Divider } from 'native-base'
import React, { useEffect, useState } from 'react';
import { fetchLeagueData } from '../api';
import { ILeague } from '../models/League';
import { SectionList, Image, ImageBackground } from 'react-native';
import Loader from '../components/loader';
import { FontAwesome } from '@expo/vector-icons';
import ListingTable from '../components/list-table';

export default function TablesScreen() {
    const [leagueData, setLeagueData] = useState<ILeague | null>(null);

    // const cloudIcon = (name: string) => <FontAwesome name={'cloud'} size={60} color='white' />

    const blurst = require('../../assets/blurst.png');
    const blurnd = require('../../assets/blurnd.png');
    const blurd = require('../../assets/blurd.png');

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
            <Center mt='20'>
                <HStack space={5}>
                    <Box py='5'>
                        <VStack >
                            <Center>
                                <Text fontSize={'24'}>
                                    {leagueData.data.standings[1].stats.map(
                                        (stat) => { if (stat.name === 'points') { return stat.value + ' pts' } })}
                                </Text>
                                <Box alignItems={'center'} justifyContent={'center'}>
                                    <ImageBackground source={blurnd} style={{ width: 200, height: 200, position: 'absolute', zIndex: 0 }} />
                                    <Box width={100} height={100} borderWidth={4} borderRadius={'full'} bg={'#fff'} borderColor={'#7B61FF'} alignItems={'center'} justifyContent={'center'} shadow='5'>
                                        <Image source={{
                                            uri: leagueData.data.standings[1].team.logos[0].href,
                                            cache: 'force-cache',
                                        }} style={{
                                            width: 70, height: 70,
                                            resizeMode: 'contain',
                                            zIndex: 1,
                                        }} />
                                    </Box>
                                </Box>
                                <Text fontSize={20}>{leagueData.data.standings[1].stats.map(
                                    (stat) => { if (stat.name === 'rank') { return stat.value + 'nd' } })}
                                </Text>
                            </Center>
                        </VStack>
                    </Box>
                    <VStack>
                        <Center>
                            <Text fontSize={'24'}>
                                {leagueData.data.standings[0].stats.map(
                                    (stat) => { if (stat.name === 'points') { return stat.value + ' pts' } })}
                            </Text>
                            <Box alignItems={'center'} justifyContent={'center'}>
                                <ImageBackground source={blurst} style={{ width: 200, height: 200, position: 'absolute', zIndex: 0 }} />
                                <Box width={100} height={100} borderWidth={4} borderRadius={'full'} bg={'#fff'} borderColor={'#FFB649'} alignItems={'center'} justifyContent={'center'} shadow='5'>
                                    <Image source={{
                                        uri: leagueData.data.standings[0].team.logos[0].href,
                                        cache: 'force-cache',
                                    }} style={{
                                        width: 70, height: 70,
                                        resizeMode: 'contain',
                                        zIndex: 1,
                                    }} />
                                </Box>
                            </Box>
                            <Text fontSize={20}>{leagueData.data.standings[0].stats.map(
                                (stat) => { if (stat.name === 'rank') { return stat.value + 'st' } })}
                            </Text>
                        </Center>
                    </VStack>
                    <Box mt='5'>
                        <Center>
                            <Text fontSize={'24'}>
                                {leagueData.data.standings[2].stats.map(
                                    (stat) => { if (stat.name === 'points') { return stat.value + ' pts' } })}
                            </Text>
                            <Box alignItems={'center'} justifyContent={'center'}>
                                <ImageBackground source={blurd} style={{ width: 200, height: 200, position: 'absolute', zIndex: 0 }} />
                                <Box width={100} height={100} borderWidth={4} borderRadius={'full'} bg={'#fff'} borderColor={'#E649FF'} alignItems={'center'} justifyContent={'center'} shadow='5'>
                                    <Image source={{
                                        uri: leagueData.data.standings[2].team.logos[0].href,
                                        cache: 'force-cache',
                                    }} style={{
                                        width: 70, height: 70,
                                        resizeMode: 'contain',
                                        zIndex: 1,
                                    }} />
                                </Box>
                            </Box>
                            <Text fontSize={20}>{leagueData.data.standings[2].stats.map(
                                (stat) => { if (stat.name === 'rank') { return stat.value + 'rd' } })}
                            </Text>
                        </Center>
                    </Box>
                </HStack>
            </Center>
            <Divider borderWidth={0.5} borderColor={'white'} w={'full'} mb='5' />
            <ListingTable leagueData={leagueData} />
        </View>
    );
}