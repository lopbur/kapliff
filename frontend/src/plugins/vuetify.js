import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import style from '../styles/variables.scss'

Vue.use(Vuetify)

let _thresholds = {}

for (const [key, value] of Object.entries(style)) {
  const unitRm = parseInt(value.replace('px', ''))
  _thresholds[key] = unitRm
}

export default new Vuetify({
  breakpoint: {
    thresholds: _thresholds
  },
  theme: {
    themes: {
      light: {
        primary: '#1a1a1d',
        secondary: '#c5d5cb',
        background: '#eeeeee',
        content: '#ffffff'
      },
      dark: {
        primary: '#0d0d0d',
        secondary: '#c5d5cb',
        background: '#111111',
        content: '#ffffff'
      }
    }
  }
})
