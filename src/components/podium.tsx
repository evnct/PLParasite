import { Box, Center, HStack, VStack, Text } from 'native-base'
import React from 'react'
import { ImageBackground, Image } from 'react-native'
import { ILeague } from '../models/League'

export default function Podium({ leagueData }: { leagueData: ILeague }) {

    const blurst = require('../../assets/blurst.png');
    const blurnd = require('../../assets/blurnd.png');
    const blurd = require('../../assets/blurd.png');

    return (
        <Center mt='20'>
            <HStack space={5}>
                <Box py='5'>
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
    )
}
