import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import theme from '../theme'

type Props = {
    children: React.ReactNode
}

export default function AppContainer(props: Props) {
    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
            <StatusBar style="dark" />
                {props.children}
            </NativeBaseProvider>
        </NavigationContainer>
    )
}