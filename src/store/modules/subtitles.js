const state = {
  items: []
}

const mutations = {
  ADD_SUBTITLE (state, subtitle) {
    state.items.push(subtitle)
  },
  RESET_SUBTITLES (state, subtitle) {
    state.items = []
  }
}

export default {
  state,
  mutations
}
