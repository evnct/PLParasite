import { Center, Spinner } from 'native-base'
import React from 'react'
import theme from '../theme'

export default function Loader() {
    return (
        <Center flex={1} backgroundColor={theme.colors.white[1]}>
            <Spinner size="lg" color={theme.colors.purple[1]} />
        </Center>
    )
}
