import { Box, HStack, Heading } from 'native-base'
import React from 'react'
import ToggleSwitch from './toggleSwitch'

export default function navbar() {
    return (
        <Box mt={20} mx={5}>
            <HStack space={20}>
                <Heading>Tottenham Go</Heading>
                <ToggleSwitch />
            </HStack>
        </Box>
    )
}
