import { sample } from '../../modules/sample.js'

export default {
  actions: { },
  mutations: {
    updateHtml (state, html) {
      state.html = html
    }
  },
  state: {
    html: sample,
  },
  getters: {
    html: state => {
      return state.html
    }
  }
}
