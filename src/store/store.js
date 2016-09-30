import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import dragdrop from './modules/dragdrop'
import subtitles from './modules/subtitles'
import loader from './modules/loader'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    dragdrop,
    loader,
    subtitles
  },
  strict: true
})

