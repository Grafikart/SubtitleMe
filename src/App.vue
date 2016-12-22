<template>
  <div id="app">
    <topbar></topbar>
    <div class="view">
      <dropzone></dropzone>
      <div class="alert" :class="{'is-visible': error}">
        No match for <em>"{{ error }}"</em>
      </div>
      <loader></loader>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Topbar from './components/topbar/Topbar'
import Loader from './components/Loader'
import Dropzone from './components/dropzone/Dropzone.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Topbar,
    Loader,
    Dropzone
  },
  computed: {
    ...mapGetters(['error'])
  }
}
</script>

<style lang="scss" src="./css/app.scss"></style>
