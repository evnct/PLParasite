import React from 'react'
import { StyleSheet } from 'react-native';
import { IPoints, IStanding } from '../../models/Standing'
import { Box, Text, Row, VStack, HStack, Container, Center, Heading } from 'native-base';

export default function Points({ selectedTeamData }: { selectedTeamData: IStanding }) {

    // Get the rank from the stats array
    const points: IPoints = { value: selectedTeamData.stats.filter(stat => stat.name === "points")[0].value, };
    const pointsFor: IPoints = { value: selectedTeamData.stats.filter(stat => stat.name === "pointsFor")[0].value, };
    const pointsAgainst: IPoints = { value: selectedTeamData.stats.filter(stat => stat.name === "pointsAgainst")[0].value, };
    const pointDifferential: IPoints = { value: selectedTeamData.stats.filter(stat => stat.name === "pointDifferential")[0].value, };

    const boxStyle = StyleSheet.create({
        Box: {
            borderRadius: 20,
            borderColor: '#488CCA',
            borderWidth: 4,
            minWidth: 100,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
        },
        Container: {
            alignItems: 'center',
            justifyContent: 'center',
        }
    });

    // Using VStack and HStack to create a 2x2 grid
    return (
        <VStack>
            <HStack space={20} justifyContent="center">
                <Container style={boxStyle.Container}>
                    <Heading>Points</Heading>
                    <Box style={boxStyle.Box}>
                        <Text fontSize={30} fontWeight={900}>{points.value}</Text>
                    </Box>
                </Container>
                <Container style={boxStyle.Container}>
                    <Heading>GF</Heading>
                    <Box style={boxStyle.Box}>
                        <Text fontSize={30} fontWeight={900}>{pointsFor.value}</Text>
                    </Box>
                </Container>
            </HStack>
            <HStack justifyContent="center" mt={4} space={20}>
                <Container style={boxStyle.Container}>
                    <Heading>GA</Heading>
                    <Box style={boxStyle.Box}>
                        <Text fontSize={30} fontWeight={900}>{pointsAgainst.value}</Text>
                    </Box>
                </Container>
                <Container style={boxStyle.Container}>
                    <Heading>GD</Heading>
                    <Box style={boxStyle.Box}>
                        <Text fontSize={30} fontWeight={900}>{pointDifferential.value}</Text>
                    </Box>
                </Container>
            </HStack>
        </VStack>
    )
}
