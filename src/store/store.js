import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import dragdrop from './modules/dragdrop'
import subtitles from './modules/subtitles'
import loader from './modules/loader'
import settings from './modules/settings'

Vue.use(Vuex)

const state = {
  langs: {eng: 'English', fre: 'Français'}
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  modules: {
    dragdrop,
    loader,
    subtitles,
    settings
  },
  strict: true
})

