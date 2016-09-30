import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [{
    path: '/',
    component: require('./components/Subtitles.vue')
  }]
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(require('./App.vue'))
})

// On bloque le drag / drop natif
document.ondragover = document.ondrop = function (e) {
  e.preventDefault()
  return false
}

let lastEnter

document.body.addEventListener('dragenter', function (e) {
  store.commit('DRAG_ENTER')
  lastEnter = e.target
})

document.body.addEventListener('dragleave', function (e) {
  if (lastEnter === e.target) {
    store.commit('DRAG_LEAVE')
  }
})

document.body.addEventListener('drop', function (e) {
  store.dispatch('handleFile', e.dataTransfer.files[0])
  store.commit('DRAG_LEAVE')
})