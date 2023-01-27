import { Center, Spinner } from 'native-base'
import React from 'react'

export default function Loader() {
    return (
        <Center flex={1} bg={'#30355E'}>
            <Spinner size="lg" color="#A065AB" />
        </Center>
    )
}
