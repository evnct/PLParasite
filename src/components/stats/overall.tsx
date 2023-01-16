import { View, Text, Box, HStack, Center, Heading } from 'native-base';
import React from 'react'
import { IOverall, IStanding } from '../../models/Standing'

export default function Overall({ tottenhamData }: { tottenhamData: IStanding }) {

    // Get the rank from the stats array
    const overall: IOverall = { summary: tottenhamData.stats.filter(stat => stat.name === "overall")[0].summary };

    return (
        <View mt={4} mb={4}>
            <Heading>Overall</Heading>
            <Center>
                <HStack
                    borderRadius={'10px'}
                    borderColor={'#488CCA'}
                    borderWidth={4}
                    width={'full'}
                    height={12}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <Text fontSize={30} fontWeight={900}>
                        {overall.summary}
                    </Text>
                    <Text position="absolute" bottom={0} right={8}>W | L | D</Text>
                </HStack>
            </Center>
        </View>
    )
}
