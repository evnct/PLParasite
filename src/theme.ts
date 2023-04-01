import { extendTheme } from 'native-base'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

const colors = {
  // Redefining only one shade, rest of the color will remain same.
  fullbg: { 400: '#FFF' },
  supportbg: { 400: '#383D71'},
  first: { 400: '#FFB649' },
  second: { 400: '#7B61FF' },
  third: { 400: '#E649FF' },
  iconbg: { 400: '#FFF' },
}

export default extendTheme({ config, colors})