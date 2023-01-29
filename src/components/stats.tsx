import React from 'react'
import { Image } from 'react-native';
import { IStanding } from '../models/Standing'
import { Box, Text, VStack, HStack, Center } from 'native-base';

export default function Stats({ selectedTeamData }: { selectedTeamData: IStanding }) {

    const pointsIcon = require('../../assets/data-screen-icons/pointsIcon.png');
    const gamesPlayedIcon = require('../../assets/data-screen-icons/matchesIcon.png');
    const winsIcon = require('../../assets/data-screen-icons/winsIcon.png');
    const lossesIcon = require('../../assets/data-screen-icons/lostIcon.png');
    const tiesIcon = require('../../assets/data-screen-icons/tiesIcon.png');

    const getIcon = (name: string) => {
        switch (name) {
            case "points":
                return pointsIcon;
            case "gamesPlayed":
                return gamesPlayedIcon;
            case "wins":
                return winsIcon;
            case "losses":
                return lossesIcon;
            case "ties":
                return tiesIcon;
            default:
                return null;
        }
    }

    // Switching the name of the gamesPlayed stat to matches
    // BECAUSE IT LOOKS BETTER
    const getName = (name: string) => {
        return name === "gamesPlayed" ? "matches" : name;
    }

    const order = ["points", "gamesPlayed", "wins", "losses", "ties"];

    // Filtering the stats to only show the ones we want 
    // and sorting them in the order we want
    const filteredStats = selectedTeamData.stats.filter(
        stat => order.includes(stat.name))
        .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

    return (
        <VStack>
            <Center>
                {filteredStats.map((stat) => (
                    <Box key={stat.description} bg='#30355E' p='2' borderRadius={15} mt='4' w={64}>
                        <HStack alignItems={'center'} justifyItems={'center'} space={2}>
                            <Image source={getIcon(stat.name)} style={{ width: 40, height: 40 }} />
                            <Text fontSize={24} >{stat.value} {getName(stat.name).charAt(0).toUpperCase() + getName(stat.name).slice(1)}</Text>
                        </HStack>
                    </Box>
                ))}
            </Center>
        </VStack>
    )

}