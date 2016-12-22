const state = {
  items: [],
  q: [],
  current: null
}

global.state = state

const mutations = {
  SUBTITLES_Q (state, files) {
    state.q = Array.from(files)
  },
  SHIFT_SUBTITLES_Q (state) {
    state.current = state.q.shift()
  },
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
