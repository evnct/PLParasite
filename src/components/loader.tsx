import { Center, Spinner } from 'native-base'
import React from 'react'
import theme from '../theme'

export default function Loader() {
    return (
        <Center flex={1} bg={theme.colors.fullbg[400]}>
            <Spinner size="lg" color="#A065AB" />
        </Center>
    )
}
