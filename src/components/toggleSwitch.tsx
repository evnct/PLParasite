import React from 'react'
import { Text, HStack, Switch, useColorMode, Center } from 'native-base'

export default function ToggleSwitch() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Center flex="1">
            <HStack space={2} alignItems="center">
                <Switch
                    isChecked={colorMode === 'light'}
                    onToggle={toggleColorMode}
                ></Switch>
            </HStack>
        </Center>
    )
}