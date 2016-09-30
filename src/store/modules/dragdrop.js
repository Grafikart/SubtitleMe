const state = {
  dragging: false
}

const mutations = {
  DRAG_ENTER (state) {
    state.dragging = true
  },
  DRAG_LEAVE (state) {
    state.dragging = false
  }
}

export default {
  state,
  mutations
}
