import React from 'react'
import { IStanding } from '../models/Standing'
import { Box, Text, VStack, HStack, Center } from 'native-base';

export default function Stats({ selectedTeamData }: { selectedTeamData: IStanding }) {

    // Switching the name of the gamesPlayed stat to matches
    // BECAUSE IT LOOKS BETTER
    const getName = (name: string) => {
        return name === "gamesPlayed" ? "matches" : name;
    }

    // Filtering the stats to only show the ones we want 
    // and sorting them in the order we want
    const order = ["points", "gamesPlayed", "wins", "losses", "ties"];
    const filteredStats = selectedTeamData.stats.filter(
        stat => order.includes(stat.name))
        .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

    return (
        <VStack alignItems={'center'} justifyContent={'center'}>
            <Center>
                {filteredStats.map((stat) => (
                    <Box key={stat.description} bg='#30355E' p='4' borderRadius={15} w={64} mt='2'>
                        <HStack alignItems={'center'} justifyItems={'center'} space={'lg'}>
                            <Box
                                borderColor={'#5849FF'}
                                borderWidth={3}
                                borderRadius={'md'}
                                w={16}
                                p='1'
                                alignItems={'center'}
                                justifyContent={'center'}>
                                <Text
                                    fontSize={28}
                                    fontWeight={'extrabold'}
                                    fontStyle={'italic'}>
                                    {getName(stat.value.toString())}
                                </Text>
                            </Box>
                            <Text fontSize={28} fontWeight={'medium'}>{getName(stat.name).charAt(0).toUpperCase() + getName(stat.name).slice(1)}</Text>
                        </HStack>
                    </Box>
                ))}
            </Center>
        </VStack>
    )
}