import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider, Box } from 'native-base';
import theme from '../theme'

type Props = {
    children: React.ReactNode
}

export default function AppContainer(props: Props) {
    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                <Box
                    _dark={{ bg: '#3C3B3B' }}
                    _light={{ bg: '#FFFFFF' }}
                    px={4}
                    flex={1}>
                    {props.children}
                </Box>
            </NativeBaseProvider>
        </NavigationContainer>
    )
}