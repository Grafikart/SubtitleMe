const state = {
  notifications: false,
  filename: '{name}.{ext}.srt'
}

const mutations = {
  SET_SETTINGS (state, settings) {
    Object.assign(state, settings)
  }
}

export default {
  state,
  mutations
}
