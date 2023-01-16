import React from 'react'
import { Box, Text, Heading, VStack, Center } from 'native-base';
import { IRank, IStanding } from '../../models/Standing';

export default function Rank({ tottenhamData }: { tottenhamData: IStanding }) {

    // Get the rank from the stats array
    const rank: IRank = { value: tottenhamData.stats.filter(stat => stat.name === "rank")[0].value };

    /// This function will display the rank in the correct format
    /// Premier League has 20 teams, so no need to worry abput 21st, 22nd, etc.
    const DisplayRank = () => {
        switch (rank.value) {
            case 1:
                return <Text>{rank.value}st/</Text>;
            case 2:
                return <Text>{rank.value}nd</Text>;
            case 3:
                return <Text>{rank.value}rd</Text>;
            default:
                if (rank.value > 3) {
                    return <Text>{rank.value}th</Text>;
                } else {
                    return <Text>Invalid rank</Text>;
                }
        }
    }

    return (
        <>
            <VStack>
                <Center>
                    <Heading>Rank</Heading>
                    <Box borderRadius={'full'}
                        borderColor={'#488CCA'}
                        borderWidth={4}
                        width={20}
                        height={20}
                        alignItems={'center'}
                        justifyContent={'center'}>
                        <Heading size="xl">
                            <DisplayRank />
                        </Heading>
                    </Box>
                </Center>
            </VStack>
        </>
    )
}
