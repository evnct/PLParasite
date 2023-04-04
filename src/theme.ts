import { extendTheme } from 'native-base'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

const colors = {
  // Redefining only one shade, rest of the color will remain same.
  white: { 1: '#FFF' },
  purple: {1: '#5849FF'},
  darkText: {1: '#222222'},
  greyText: {1: '#929292'}
}

export default extendTheme({ config, colors})